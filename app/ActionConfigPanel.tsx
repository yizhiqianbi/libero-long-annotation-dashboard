"use client";

import { useRef, useState } from "react";
import { actionConfigRecords } from "./action-config-data";
import { videoRecords } from "./video-data";

function formatTime(seconds: number) {
  return Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60).toString().padStart(2, "0");
}

function formatPreciseTime(seconds: number) {
  return seconds.toFixed(2) + "s";
}

export default function ActionConfigPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const originalRef = useRef<HTMLVideoElement>(null);
  const captionedRef = useRef<HTMLVideoElement>(null);
  const video = videoRecords[selectedIndex];
  const record = actionConfigRecords[video.id];
  const action = record.actions.find((item) => currentTime >= item.startSec && currentTime < item.endSec);
  const progress = Math.min(100, Math.max(0, currentTime / Math.max(record.duration, 0.1) * 100));
  const captionedSrc = video.src.replace(".mp4", "_action_config.mp4");
  const trackSrc = video.src.replace(".mp4", "_action_config.vtt");

  const syncTime = (source: "original" | "captioned", time: number) => {
    setCurrentTime(time);
    const target = source === "original" ? captionedRef.current : originalRef.current;
    if (target && Math.abs(target.currentTime - time) > 0.08) target.currentTime = time;
  };

  const syncPlayback = (source: "original" | "captioned", playing: boolean) => {
    const target = source === "original" ? captionedRef.current : originalRef.current;
    if (!target) return;
    if (playing) target.play().catch(() => undefined);
    else target.pause();
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (originalRef.current) originalRef.current.currentTime = time;
    if (captionedRef.current) captionedRef.current.currentTime = time;
  };

  const downloadJson = () => {
    const payload = {
      episode_id: record.episodeId,
      task_id: record.taskId,
      task_name: record.taskName,
      observed_summary: record.observedSummary,
      success: record.success,
      failure_reason: null,
      label_info: {
        action_config: record.actions.map((item) => ({
          start_frame: item.startFrame,
          end_frame: item.endFrame,
          action_text: item.actionText,
          skill: item.skill,
        })),
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = video.id + "_action_config.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section-block view-block action-config-view">
      <div className="section-heading">
        <div>
          <div className="eyebrow">QWEN ACTION_CONFIG / 10 RECORDS</div>
          <h2>动作级结果：看视频，也看每个控制原语</h2>
        </div>
        <span className="muted">20 FPS FRAME LABELS · 8 FPS VISUAL INPUT</span>
      </div>
      <div className="action-config-note">
        这是本次 Qwen3.8-27B-FP8 的真实 action_config 输出。每条记录把全局任务拆成
        pick、place、rotate、close 等可执行动作；帧号使用原始视频 20 FPS 坐标，
        不把 approach 或小修正误当成独立 caption。TimeLens2 和 TimeLens 的时间定位结果仍可在“视频 + 三模型”页逐条对照。
      </div>
      <div className="action-config-layout">
        <div className="video-list action-config-list" aria-label="action_config 视频列表">
          {videoRecords.map((item, index) => {
            const itemRecord = actionConfigRecords[item.id];
            return (
              <button
                key={item.id}
                className={selectedIndex === index ? "video-item selected" : "video-item"}
                onClick={() => { setSelectedIndex(index); setCurrentTime(0); }}
              >
                <span className="video-item-top">
                  <span className="sample-id">{item.id}</span>
                  <span className="video-status success">{itemRecord.actions.length} actions</span>
                </span>
                <span className="video-item-task">{item.task}</span>
                <span className="video-item-meta">{item.duration.toFixed(1)}s · {itemRecord.latencySec.toFixed(2)}s inference · GT success</span>
              </button>
            );
          })}
        </div>
        <article className="video-stage action-config-stage">
          <div className="video-compare">
            <div className="video-compare-panel">
              <div className="video-compare-label">ORIGINAL VIDEO · SOURCE</div>
              <video
                ref={originalRef}
                className="video-player"
                controls
                preload="metadata"
                src={video.src}
                aria-label={video.id + " original video"}
                onTimeUpdate={(event) => syncTime("original", event.currentTarget.currentTime)}
                onLoadedMetadata={() => setCurrentTime(0)}
                onPlay={() => syncPlayback("original", true)}
                onPause={() => syncPlayback("original", false)}
              >
                <track kind="captions" src={trackSrc} srcLang="en" label="Qwen action_config" />
              </video>
            </div>
            <div className="video-compare-panel">
              <div className="video-compare-label">ACTION-CONFIG VIDEO · EMBEDDED SUBTITLE</div>
              <video
                ref={captionedRef}
                className="video-player"
                controls
                preload="metadata"
                src={captionedSrc}
                aria-label={video.id + " action config captioned video"}
                onTimeUpdate={(event) => syncTime("captioned", event.currentTarget.currentTime)}
                onPlay={() => syncPlayback("captioned", true)}
                onPause={() => syncPlayback("captioned", false)}
              >
                <track kind="captions" src={trackSrc} srcLang="en" label="Embedded action_config" />
              </video>
            </div>
          </div>
          <div className="video-actions">
            <a className="export-button" href={captionedSrc} download={video.id + "_action_config.mp4"}>下载动作级字幕视频</a>
            <a className="export-button secondary" href={video.src} download={video.id + ".mp4"}>下载原始视频</a>
            <button className="export-button secondary" onClick={downloadJson}>下载 action_config JSON</button>
            <a className="export-button secondary" href={trackSrc} download={video.id + "_action_config.vtt"}>下载 VTT 字幕</a>
          </div>
          <div className="action-config-meta">
            <span>EPISODE <strong>{record.episodeId}</strong></span>
            <span>TASK ID <strong>{record.taskId}</strong></span>
            <span>FRAMES <strong>{record.frameCount}</strong></span>
            <span>QWEN LATENCY <strong>{record.latencySec.toFixed(2)}s</strong></span>
            <span>ACTIONS <strong>{record.actions.length}</strong></span>
          </div>
          <div className="action-config-summary">
            <span className="fine-now-label">OBSERVED SUMMARY</span>
            <p>{record.observedSummary}</p>
          </div>
          <div className="action-config-progress-meta">
            <span>{formatTime(currentTime) + " / " + formatTime(record.duration)}</span>
            <span>{action ? "ACTION " + (record.actions.indexOf(action) + 1) + "/" + record.actions.length : "NO ACTIVE ACTION"}</span>
          </div>
          <div className="action-config-track" role="progressbar" aria-valuemin={0} aria-valuemax={record.duration} aria-valuenow={currentTime}>
            <span className="action-config-fill" style={{ width: progress + "%" }} />
            {record.actions.map((item, index) => (
              <span
                className={action === item ? "action-config-marker active" : "action-config-marker"}
                key={video.id + "-marker-" + index}
                style={{ left: item.startSec / record.duration * 100 + "%", width: (item.endSec - item.startSec) / record.duration * 100 + "%" }}
              />
            ))}
          </div>
          <div className="action-config-now">
            <div>
              <span className="fine-now-label">ACTIVE ACTION</span>
              <strong>{action ? formatPreciseTime(action.startSec) + " – " + formatPreciseTime(action.endSec) : formatPreciseTime(currentTime)}</strong>
            </div>
            {action ? (
              <>
                <div className="action-config-skill">{action.skill.toUpperCase()}</div>
                <p>{action.actionText}</p>
                <small>frames {action.startFrame}–{action.endFrame} · source {record.sourceFps.toFixed(0)} FPS</small>
              </>
            ) : <p>拖动视频或点击下方动作，查看对应时间段。</p>}
          </div>
          <div className="action-config-rows">
            {record.actions.map((item, index) => (
              <button
                className={action === item ? "action-config-row active" : "action-config-row"}
                key={video.id + "-row-" + index}
                onClick={() => seek(item.startSec)}
              >
                <span className="action-config-row-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="action-config-row-time">{item.startSec.toFixed(2) + "–" + item.endSec.toFixed(2) + "s"}</span>
                <span className="action-config-row-skill">{item.skill}</span>
                <span className="action-config-row-text">{item.actionText}</span>
                <span className="action-config-row-frames">{item.startFrame}–{item.endFrame}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
