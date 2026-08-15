# LIBERO 动作级 action_config Prompt

当前实现位于 /public/libero_long_annotation_eval/run_qwen38.py 的
ACTION_CONFIG_PROMPT。它把 Qwen 的输出单位定义为服务全局任务的控制原语，
而不是每帧 caption，也不是把整条任务压成一个时间段。

## 输出结构

    {
      "episode_id": "demo_49",
      "task_id": 0,
      "task_name": "arrange the orange juice and green tea neatly",
      "observed_summary": "one short factual summary",
      "success": true,
      "failure_reason": null,
      "label_info": {
        "action_config": [
          {
            "start_frame": 0,
            "end_frame": 322,
            "action_text": "Pick up the orange juice using the right hand",
            "skill": "pick"
          }
        ]
      }
    }

## 粒度规则

- 一个条目对应一个控制相关的动作原语：pick、transfer、place、open、
  close、push、pull、press、rotate 等。
- 对象交互和换手要拆开；例如右手交给左手是 transfer，放到架子上是
  独立的 place。
- approach、对齐、下降和小幅修正只有在它们构成独立语义目标时才拆分；
  不输出“手臂继续移动”这类无任务意义的帧 caption。
- action_text 必须尽可能包含对象、手和目标位置；skill 使用小写短动词。
- 帧号是原始视频坐标：从 0 开始，start_frame 包含、end_frame 不包含，
  片段按时间排序且不能重叠。当前 LIBERO 导出视频原生帧率是 20 FPS。
- 只根据可见证据判断 success；不能因为 task 文本写了“完成”就推断成功。

## 运行方式

    cd /public/libero_long_annotation_eval
    qwen38_env/bin/python run_qwen38.py --model /public/models/Qwen3.8-27B-FP8 --manifest data/libero10_success_manifest.jsonl --granularity action_config --fps 8 --source-fps 20 --output results/libero10_qwen38_action_config.jsonl

fps 是送入视觉处理器的采样率；source-fps 只用于把模型输出的帧号映射回
原始视频。后处理会额外生成 annotation.segments，保留 start_sec/end_sec，
因此可以直接兼容现有 TimeLens/TimeLens2 grounding 精修脚本；原始动作级
结果仍以 annotation.label_info.action_config 为准。
