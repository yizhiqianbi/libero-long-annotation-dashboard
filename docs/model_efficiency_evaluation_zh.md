# LIBERO-Long 三模型效率与职责评估

## 结论

TimeLens/TimeLens2 是 temporal grounding 模型：输入视频和文本查询，输出
该事件对应的一个或多个时间区间。它们可以作为 Qwen dense 或人工动作查询
之后的时间边界精修器，但不会独立判断整条 LIBERO-Long 任务是否成功，也不
会自动生成完整的 subgoal 序列。

官方资料：

- [TimeLens2](https://github.com/MCG-NJU/TimeLens2)
- [TimeLens](https://github.com/TencentARC/TimeLens)

## 本次测量口径

使用官方 LIBERO-Long `libero_10` 的 10 条成功人类遥操作视频，视频按 2 FPS
采样。平均延迟是模型已加载后的单条 `generate()` 时间，不含首次加载、进程
启动和视频预处理。

| 模型/模式 | 输出 | 平均延迟 | 估算吞吐 |
|---|---|---:|---:|
| Qwen dense | caption、success、failure reason、micro-subgoals | 26.939 s | 134 条/小时 |
| TimeLens2 grounding | 任务查询的时间区间 | 0.970 s | 3,710 条/小时 |
| TimeLens grounding | 任务查询的时间区间 | 1.025 s | 3,512 条/小时 |
| Qwen unified caption | caption/actions/objects，9/10 解析 | 10.353 s* | 348 条/小时* |
| TimeLens2 unified caption | 强制 caption JSON | 5.508 s | 654 条/小时 |
| TimeLens unified caption | 强制 caption JSON | 5.686 s | 633 条/小时 |

`*` Qwen caption 只按 9 条成功解析样本计算；包括空输出的所有尝试平均为
9.395 s。

## 单卡资源与流水线

本次单卡 GPU 为 H200（约 144 GB）：Qwen 使用约 54 GB，TimeLens2 和 TimeLens
各约 17 GB。Qwen checkpoint 在当前 Torch/Triton 环境走 BF16 dequantize
fallback，因此 26.939 秒不代表原生 FP8 kernel 速度。

Qwen dense 加一次任务级 TimeLens2 grounding，串行约为 27.910 s/视频，约
129 条/小时。若给 Qwen 平均 7.4 个 micro-subgoal 各调用一次 TimeLens2，按
当前延迟线性估算约 34.120 s/视频、106 条/小时；这是估算值，批处理与并发
会改变结果。

## 评估限制

当前集合全是成功样本，没有人工原子动作边界，因此不能报告完整 accuracy、
F1 或 temporal mIoU。正式评测需要成功/失败平衡集、人工边界 gold set，及
caption 的物体和动作事实性检查。
