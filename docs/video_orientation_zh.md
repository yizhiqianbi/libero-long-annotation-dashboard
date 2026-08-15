# LIBERO-Long 视频方向说明

## 结论

我们下载的 LIBERO-Long `libero_10` HDF5 是官方 success-only 人类遥操作
演示，但其中的 `obs/agentview_rgb` 是 robosuite/OpenGL 原始像素布局。这个
布局的图像原点在左下角，直接写成 MP4 会看起来上下颠倒。

LIBERO 自带的视频工具在保存 `agentview_image` 时执行垂直翻转
`image[::-1]`。因此 dashboard 中可见的 MP4 也统一做了一次垂直翻转；这
不是时间倒放，也不是水平镜像，更不是 180° 旋转。

## 本地证据

- 官方 LIBERO clone：`libero/libero/utils/video_utils.py` 的 `append_obs`
  使用 `obs[camera_name][::-1]`。
- 当前导出脚本：`/public/libero_long_annotation_eval/prepare_libero10_success.py`
  在写视频前执行 `frames[:, ::-1]`。
- 原始 OpenGL 视频备份保存在
  `/public/libero_long_annotation_eval/raw_opengl_videos/`，用于追溯。

## 对模型结果的影响

此前 Qwen、TimeLens 和 TimeLens2 的部分推理使用了未翻转 MP4。时间戳本身
不会因垂直翻转改变，但 caption 中的空间描述可能会受影响。因此严格的
最终评测应在方向修正后的 MP4 上重新跑模型；当前页面先展示已校正的原始
视频和带字幕视频，并保留旧结果作为待复核版本。
