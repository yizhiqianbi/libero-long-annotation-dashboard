# 具身任务的语义 Grounding 设计

## 标注单位

主标注单位不是“看到什么就 caption 什么”，而是全局任务中的可执行
semantic subtask。例如任务是“打开炉子并把 moka pot 放到炉子上”，subtask
应是“移动到旋钮”“抓住并旋转旋钮”“释放旋钮并回撤”“抓取 moka pot”“搬运并对齐”
和“放下并释放”。每个 subtask 都必须能解释全局任务中的一个必要步骤。

## 两阶段流水线

1. **Semantic planning（Qwen dense）**：输入全局任务和完整视频，输出有序、非重叠的
   subtask 序列及粗时间候选。Qwen 负责动作语义、对象关系和任务完成判断。
2. **Temporal grounding（TimeLens2）**：把每个 subtask 作为 query，在视频中寻找其
   视觉证据区间。TimeLens2 不生成独立 caption，也不判断 success；它只能修正
   subtask 的 start/end。
3. **Boundary review（高 FPS）**：20 FPS 的局部窗口只用于检查接触、抓取、释放等
   边界是否需要移动。窗口 caption 是证据，不得升级成新的 subtask。

## 前端语义

“语义 Grounding”页显示全局任务、当前 subtask、时间轴区间和有序 subtask 列表；
“高 FPS 滑窗”页保留为辅助证据。这样字幕和进度条回答的是“全局任务的哪一步正在
发生”，而不是“这一帧里模型看到了什么”。

## 当前限制

TimeLens2 对整段视频直接以 20 FPS grounding 仍可能返回过宽区间，因此未经人工复核
不会覆盖 Qwen dense span。完整评测应在 subtask 级别计算 temporal IoU、边界误差和
漏检率，而不是用 caption 相似度代替 grounding 质量。
