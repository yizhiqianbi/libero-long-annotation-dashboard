# Prompt 设计与 Qwen → TimeLens2 组合方式

## 1. 历史 Qwen dense prompt（当前请使用 action_config）

代码位置：`/public/libero_long_annotation_eval/run_qwen38.py`。

```text
You are producing dense subgoal annotations for a LIBERO robot manipulation rollout.
The intended task is: {task}
Watch the complete video and return JSON only, using this schema:
{
  "observed_summary": "short factual description",
  "success": true or false,
  "failure_reason": "visible reason or null",
  "segments": [{"action": "one visible micro-subgoal", "start_sec": 0.0, "end_sec": 1.0}]
}
Split the video into dense, sequential micro-subgoals rather than broad task phases.
Explicitly separate, when visible: move/reach, align above the object, descend,
close or open the gripper, lift, transport, align over the destination, lower,
release, verify/hold, and retract. Split compound actions such as “grasp and move”
into separate segments. Aim for roughly one segment per 0.5–2.5 seconds and at least
6 segments for a 10-second video; use shorter segments at contact or release events.
Keep segments chronological, non-overlapping, and within the video duration. Include
pauses and corrective motions as their own subgoals. Describe only visible actions
and do not infer completion from the intended task. Use precise timestamps.
```

这段是历史版本，保留用于复现实验；当前面向具身任务的动作级输出见
docs/action_config_prompt_zh.md。当前代码中的 dense 模式也已切换为 action_config。

设计意图是让 Qwen 同时完成四件事：理解整条任务、判断可见的成功/失败、描述
动作语义、生成候选时间段。`{task}` 用于比较“观察到的动作”与“目标任务”，但
它也可能造成 task leakage；做严格 caption 评测时应再跑一版不带 `{task}` 的
prompt。

运行参数：视频 2 FPS，`max_new_tokens=768`，`do_sample=False`，Qwen 关闭
thinking，输出解析失败时不应静默当作成功。

## 2. 当前实际运行的 TimeLens grounding prompt

代码位置：`/public/libero_long_annotation_eval/run_model.py`。

TimeLens2：

```text
Given the query: "{query}", return ALL time spans (in seconds) where the query is relevant.
Output format MUST be a JSON array of [start, end] pairs.
```

TimeLens：

```text
Please find the visual event described by the sentence '{query}', determining its starting and ending times.
The format should be: 'The event happens in <start time> - <end time> seconds'.
```

当前评测把整条 LIBERO task 作为 `{query}`，因此会得到类似 `[2.0, 13.0]`
的宽区间。这个结果只能解释为“整条 query 的视觉证据范围”，不是成功判定，
也不是密集 subgoal 的边界。

## 3. 真正组合时的两阶段 prompt

第一阶段仍然使用 Qwen dense。解析出每个 segment 后，对每条 action 单独调用
TimeLens2，推荐使用下面的 query：

```text
Find every interval in this video where the following visible robot action occurs:
"{action}"

Return JSON only as an array of [start_sec, end_sec] pairs.
Return [] if the action is not visibly completed or cannot be localized.
Do not explain your answer. Use seconds, keep 0 <= start_sec < end_sec <= video_duration.
```

这里的 `{action}` 来自 Qwen，例如：

```text
Lower the moka pot onto the burner and open the gripper to release it.
```

而不是再次传入完整任务“turn on the stove and put the moka pot on it”。这样
TimeLens2 才是在精修第 7 个 subgoal，而不是重新定位整条任务。

## 4. 后处理规则

1. 保留 Qwen 的 `action`、对象和语义描述；只用 TimeLens2 更新 `start_sec`/
   `end_sec`。
2. 把区间裁剪到视频长度；删除 `end <= start` 或越界区间。
3. TimeLens2 返回多个区间时，保留所有可见重复动作，或选择与 Qwen 候选段
   IoU 最大的区间。
4. 返回 `[]` 时不要伪造时间段，标为 `unlocalized` 并进入人工复核。
5. Qwen 候选段与 TimeLens2 精修段 IoU 很低、跨度异常变大，或动作顺序冲突
   时，标为 `needs_review`。

最终数据结构可以是：

```json
{
  "action": "lower and release the moka pot",
  "qwen_span": [12.0, 13.5],
  "timelens2_spans": [[12.2, 13.4]],
  "final_span": [12.2, 13.4],
  "status": "refined"
}
```

## 5. Caption-only prompt（当前三模型统一对比）

```text
You are annotating a LIBERO robot manipulation video.
The intended task is: {task}
Describe only what is visibly happening in the video. Do not use outside knowledge and do not infer hidden state.
Return JSON only with this exact schema:
{
  "caption": "one concise, factual description of the visible manipulation",
  "actions": ["short visible action 1", "short visible action 2"],
  "objects": ["visible object 1", "visible object 2"],
  "success": true or false,
  "uncertainty": "brief note about ambiguity, or null"
}
Do not output timestamps, time intervals, or markdown. Keep the caption to 1–3 sentences and keep actions in chronological order.
```

这版 prompt 证明 TimeLens/TimeLens2 能生成文字，但 caption 不是它们的主要
监督目标；生产标注仍应使用 Qwen 负责语义，TimeLens2 负责时间边界。
