# 高帧率与细粒度实验记录

## 结论

提高输入 FPS 只能增加可观察帧数，不会自动改变 Qwen 的语义分段习惯。当前
dashboard 仍保留经过验证的 2 FPS dense 字幕，不把未经验证的高 FPS 结果混入
主视图。

## 实验结果

| 设置 | 样本数 | 平均 segment 数 | 平均生成延迟 | 最短 segment |
|---|---:|---:|---:|---:|
| Qwen dense / 2 FPS | 10 | 7.4 | 26.939 s | 0.7 s |
| Qwen ultra_dense / 8 FPS | 2 | 10.5 | 111.170 s | 0.5 s |

8 FPS 增加了输入信息，但模型仍会把持续运输、对齐等动作合并成 1–3 秒阶段。
尝试源视频原生 20 FPS，并加入“每段不得超过 0.4 秒”的硬约束后，单条视频在
当前共享 H200 环境中超过 5 分钟没有完成，显存接近满载，因此中止。

## Qwen dense → TimeLens2 / 8 FPS

对 10 条视频的 74 个 Qwen candidate action 使用 TimeLens2 短窗口精修：

- 成功定位：28/74（37.8%）
- 已定位区间平均时长：1.857 秒
- 不超过 0.5 秒的区间：2/28
- 平均 TimeLens2 调用延迟：1.905 秒

这个结果说明当前“一次短窗口 grounding”仍不能提供稳定的亚 0.5 秒边界，
因此没有替换 dashboard 中已有 dense 字幕。

## 推荐方案

如果必须获得 0.1–0.25 秒级标签，应采用局部时间扫描：Qwen 只产生动作语义，
然后在候选时间段内以 0.25–0.5 秒滑窗调用 grounding 模型，聚合相邻命中窗口，
最后量化到源视频 20 FPS 的 0.05 秒网格。这个方案会显著增加调用次数，需要
单独评估空命中率、边界误差和吞吐。

## 可复现的短窗扫描

若目标是实际得到小于 0.5 秒的字幕边界，应使用本地滑窗，而不是只给整段视频提高 FPS：

```bash
python /public/libero_long_annotation_eval/run_local_window_caption.py \
  --name timelens2 \
  --model /public/interns/hubin/world_models/models/TimeLens2-8B \
  --fps 20 --window-sec 0.50 --stride-sec 0.25 \
  --manifest /public/libero_long_annotation_eval/data/libero10_success_manifest.jsonl \
  --output /public/libero_long_annotation_eval/results/libero10_timelens2_local_windows.jsonl
```

输出保留重叠窗口和 20 FPS 网格（0.05 秒），便于人工审核或后续合并；
`--window-sec 0.25 --stride-sec 0.125` 会更细，但调用数约翻倍。该模式尚未在共享 GPU
空闲前批量运行，因此不把它计入上面的模型比较。
