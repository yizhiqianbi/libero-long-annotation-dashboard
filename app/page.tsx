"use client";

import { useEffect, useRef, useState } from "react";
import { videoRecords } from "./video-data";
import { captionCompare } from "./caption-compare-data";

type ModelKey = "qwen" | "timelens2" | "timelens";
type FineLabel = { start: number; end: number; phase: string; caption: string; visible: boolean; latency: number };
type FineRecord = { id: string; task: string; duration: number; src: string; fps: number; windowSec: number; strideSec: number; labels: FineLabel[] };
type SemanticSubtask = { action: string; qwenSpan: [number, number]; spans: [number, number][]; status: "localized" | "unlocalized"; hitCount: number; windowCount: number };
type SemanticRecord = { id: string; task: string; duration: number; src: string; fps: number; subtasks: SemanticSubtask[] };

const models: Record<ModelKey, {
  name: string;
  short: string;
  role: string;
  color: string;
  parse: string;
  quality: string;
  qualityLabel: string;
  latency: string;
  throughput: string;
  gpu: string;
  memory: string;
  note: string;
}> = {
  qwen: {
    name: "Qwen3.8-27B-FP8",
    short: "Qwen",
    role: "语义标注与成功判定",
    color: "#f0b45b",
    parse: "100%",
    quality: "10 / 10",
    qualityLabel: "成功标签对齐",
    latency: "26.939 s",
    throughput: "134 条 / 小时",
    gpu: "1 × H200",
    memory: "约 54 GB BF16",
    note: "唯一能同时输出成功状态、失败原因和动作语义的模型。Dense prompt 平均生成 7.4 个 micro-subgoal，并识别出本批 10 条成功演示。",
  },
  timelens2: {
    name: "TimeLens2-8B",
    short: "TimeLens2",
    role: "动作时间边界定位",
    color: "#7fc9a4",
    parse: "100%",
    quality: "10 / 10",
    qualityLabel: "合法时间区间",
    latency: "0.970 s",
    throughput: "3,710 条 / 小时",
    gpu: "1 × H200",
    memory: "约 17 GB",
    note: "对同一批成功演示返回合法时间区间；它定位局部事件，不负责判断整条长任务是否完成。",
  },
  timelens: {
    name: "TimeLens-8B",
    short: "TimeLens",
    role: "动作时间边界定位",
    color: "#8da9e8",
    parse: "100%",
    quality: "10 / 10",
    qualityLabel: "合法时间区间",
    latency: "1.025 s",
    throughput: "3,512 条 / 小时",
    gpu: "1 × H200",
    memory: "约 17 GB",
    note: "输出稳定的事件区间，适合和语义 caption 并排审阅；时间定位结果不应替代 success label。",
  },
};

const tabs = [
  ["overview", "总览"],
  ["quality", "质量对比"],
  ["videos", "视频 + 三模型"],
  ["grounding", "语义 Grounding"],
  ["fine", "高 FPS 滑窗"],
  ["samples", "样本拆解"],
  ["resources", "单卡资源"],
] as const;

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function formatPreciseTime(seconds: number) {
  return `${seconds.toFixed(2)}s`;
}

export default function Home() {
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("overview");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("qwen");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const originalVideoRef = useRef<HTMLVideoElement>(null);
  const captionedVideoRef = useRef<HTMLVideoElement>(null);
  const [groundingIndex, setGroundingIndex] = useState(0);
  const [groundingTime, setGroundingTime] = useState(0);
  const [semanticRecords, setSemanticRecords] = useState<SemanticRecord[]>([]);
  const [semanticLoadError, setSemanticLoadError] = useState(false);
  const [fineRecords, setFineRecords] = useState<FineRecord[]>([]);
  const [fineIndex, setFineIndex] = useState(0);
  const [fineTime, setFineTime] = useState(0);
  const [fineLoadError, setFineLoadError] = useState(false);
  useEffect(() => {
    fetch("/high_fps_data.json")
      .then((response) => {
        if (!response.ok) throw new Error("high FPS data unavailable");
        return response.json() as Promise<FineRecord[]>;
      })
      .then(setFineRecords)
      .catch(() => setFineLoadError(true));
  }, []);
  useEffect(() => {
    fetch("/semantic_grounding_data.json")
      .then((response) => {
        if (!response.ok) throw new Error("semantic grounding data unavailable");
        return response.json() as Promise<SemanticRecord[]>;
      })
      .then(setSemanticRecords)
      .catch(() => setSemanticLoadError(true));
  }, []);
  const active = models[selectedModel];
  const video = videoRecords[videoIndex];
  const captions = captionCompare[video.id];
  const activeSegment = video.qwen.segments.find((segment) => videoTime >= segment.start_sec && videoTime <= segment.end_sec);
  const videoProgress = Math.min(100, Math.max(0, (videoTime / Math.max(video.duration, 0.1)) * 100));
  const sample = videoRecords[sampleIndex];
  const groundingVideo = semanticRecords[groundingIndex];
  const activeGrounding = groundingVideo?.subtasks.find((subtask) => subtask.spans.some(([start, end]) => groundingTime >= start && groundingTime < end));
  const activeGroundingSpan = activeGrounding?.spans.find(([start, end]) => groundingTime >= start && groundingTime < end);
  const candidateGrounding = groundingVideo?.subtasks.find((subtask) => subtask.status === "unlocalized" && groundingTime >= subtask.qwenSpan[0] && groundingTime < subtask.qwenSpan[1]);
  const groundingProgress = groundingVideo ? Math.min(100, Math.max(0, (groundingTime / Math.max(groundingVideo.duration, 0.1)) * 100)) : 0;
  const fineVideo = fineRecords[fineIndex];
  const fineActive = fineVideo?.labels.find((label) => fineTime >= label.start && fineTime < label.end);
  const fineProgress = fineVideo ? Math.min(100, Math.max(0, (fineTime / Math.max(fineVideo.duration, 0.1)) * 100)) : 0;
  const captionedSrc = video.src.replace(".mp4", "_captioned.mp4");
  const mirrorVideoTime = (source: "original" | "captioned", time: number) => {
    setVideoTime(time);
    const target = source === "original" ? captionedVideoRef.current : originalVideoRef.current;
    if (target && Math.abs(target.currentTime - time) > 0.08) target.currentTime = time;
  };
  const mirrorVideoPlayback = (source: "original" | "captioned", playing: boolean) => {
    const target = source === "original" ? captionedVideoRef.current : originalVideoRef.current;
    if (!target) return;
    if (playing) target.play().catch(() => undefined);
    else target.pause();
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">L</span><span>LIBERO / EVAL LAB</span></div>
        <div className="run-status"><span className="status-dot" /> RUN COMPLETE <span className="status-date">· 10 success demos · 3 model passes</span></div>
      </header>

      <section className="hero">
        <div className="eyebrow">ANNOTATION BENCHMARK <span>／</span> 2026.08.15</div>
        <h1>同一批任务，<em>三种视角。</em></h1>
        <p className="hero-copy">这里使用官方 LIBERO-Long（`libero_10`）的人类遥操作成功演示，不再混入 LIBERO-plus rollout 或 success=False 样本。Qwen 负责理解“有没有完成”，TimeLens 系列负责回答“动作发生在哪里”。</p>
        <div className="hero-meta"><span>DATASET <strong>LIBERO-Long / libero_10</strong></span><span>SUCCESS DEMOS <strong>10 / 10</strong></span><span>CAPTION <strong>Qwen summary + segments</strong></span></div>
      </section>

      <nav className="tabs" aria-label="评测视图">
        {tabs.map(([key, label]) => <button className={tab === key ? "tab active" : "tab"} key={key} onClick={() => setTab(key)}>{label}</button>)}
      </nav>

      {tab === "overview" && <>
        <section className="headline-grid">
          <article className="headline-card accent"><div className="card-kicker">DENSE SEMANTIC READ</div><div className="headline">10<span className="unit">/ 10</span></div><p>Qwen dense prompt 对数据集成功标签的对齐结果，并把每条视频拆成约 6–9 个 micro-subgoal。</p><div className="card-foot"><span>QWEN SUCCESS ALIGNMENT</span><strong>100%</strong></div></article>
          <article className="headline-card"><div className="card-kicker">SPEED LEAD</div><div className="headline">0.970<span className="unit">s</span></div><p>TimeLens2 单卡平均推理延迟，快于 TimeLens，适合批量动作定位。</p><div className="card-foot"><span>吞吐</span><strong>3,710 / h</strong></div></article>
          <article className="headline-card"><div className="card-kicker">RECOMMENDED STACK</div><div className="stack-line"><span className="stack-num">01</span><strong>Qwen</strong><span>语义判断</span></div><div className="stack-line"><span className="stack-num">02</span><strong>TimeLens2</strong><span>边界精修</span></div><div className="stack-line"><span className="stack-num">03</span><strong>Human</strong><span>冲突复核</span></div></article>
        </section>
        <section className="section-block">
          <div className="section-heading"><div><div className="eyebrow">01 / MODEL READOUT</div><h2>模型不是在回答同一个问题</h2></div><span className="muted">SELECT A MODEL TO INSPECT</span></div>
          <div className="model-selector">{(Object.keys(models) as ModelKey[]).map(key => <button key={key} className={selectedModel === key ? "model-pill selected" : "model-pill"} onClick={() => setSelectedModel(key)}><i style={{ background: models[key].color }} />{models[key].short}</button>)}</div>
          <div className="readout"><div className="readout-title"><span className="model-index">0{(Object.keys(models) as ModelKey[]).indexOf(selectedModel) + 1}</span><div><h3>{active.name}</h3><span>{active.role}</span></div><div className="readout-badge">{active.gpu}</div></div><p>{active.note}</p><div className="readout-stats"><div><span>格式成功率</span><strong>{active.parse}</strong></div><div><span>{active.qualityLabel}</span><strong>{active.quality}</strong></div><div><span>平均延迟</span><strong>{active.latency}</strong></div><div><span>部署占用</span><strong>{active.memory}</strong></div></div></div>
        </section>
        <section className="two-col section-block"><div><div className="eyebrow">02 / KEY FINDING</div><h2>密集 Subgoal 更适合审核</h2><p className="body-copy">新的 dense prompt 把 compound action 拆成接近、对齐、接触、抓取、抬升、搬运、放置、释放和回撤等 micro-subgoal。10 条演示平均 7.4 段，字幕与进度标记也随之变密。</p><div className="quote"><span>“</span><p>任务级 caption 说明做了什么，micro-subgoal 说明每一步是怎么完成的。</p></div></div><div className="bar-panel"><div className="panel-label">SUCCESS DEMOS · 10 TOTAL</div><div className="bar-row"><span>Qwen dense success</span><div className="bar-track"><i style={{ width: "100%", background: models.qwen.color }} /></div><strong>10</strong></div><div className="bar-row"><span>TimeLens2 valid span</span><div className="bar-track"><i style={{ width: "100%", background: models.timelens2.color }} /></div><strong>10</strong></div><div className="bar-row"><span>TimeLens valid span</span><div className="bar-track"><i style={{ width: "100%", background: models.timelens.color }} /></div><strong>10</strong></div><div className="panel-note">TimeLens 的 10 / 10 是输出格式与区间合法性，不代表它判断了任务成功。</div></div></section>
      </>}

      {tab === "quality" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">QUALITY / 10 LIBERO-LONG DEMOS</div><h2>能力拆分比单一排名更诚实</h2></div><span className="muted">DENSE SUBGOAL BATCH</span></div><div className="comparison-table"><div className="table-row table-head"><span>MODEL</span><span>ROLE</span><span>PARSE</span><span>READOUT</span><span>LATENCY</span></div>{(Object.keys(models) as ModelKey[]).map(key => <div className="table-row" key={key}><span className="table-model"><i style={{ background: models[key].color }} />{models[key].name}</span><span>{models[key].role}</span><span>{models[key].parse}</span><span className={key === "qwen" ? "good" : "warn"}>{key === "qwen" ? "10 / 10 success" : "10 / 10 valid spans"}</span><span className="mono">{models[key].latency}</span></div>)}</div><div className="quality-notes"><article><span className="note-num">A</span><h3>Qwen / dense semantic</h3><p>平均 7.4 个 micro-subgoal，接触和释放等边界被单独保留；这是更适合审核的粒度。</p></article><article><span className="note-num">B</span><h3>TimeLens / temporal</h3><p>三种模型结果在视频页逐条并排展示。TimeLens 仍只回答查询事件的时间范围，不输出任务成败。</p></article><article><span className="note-num">C</span><h3>Gold set / next</h3><p>当前成功演示适合检查密集标注；补充失败演示和人工动作边界后，才能计算完整 F1 与 temporal mIoU。</p></article></div></section>}

      {tab === "videos" && <section className="section-block view-block video-view"><div className="section-heading"><div><div className="eyebrow">VIDEO + THREE MODELS / 10 RECORDS</div><h2>逐条回放视频，并对照三个模型</h2></div><span className="muted">DENSE SUBGOALS · SUCCESS-ONLY</span></div><div className="video-layout"><div className="video-list" aria-label="视频列表">{videoRecords.map((item, index) => <button key={item.id} className={videoIndex === index ? "video-item selected" : "video-item"} onClick={() => { setVideoIndex(index); setVideoTime(0); }}><span className="video-item-top"><span className="sample-id">{item.id}</span><span className="video-status success">GT 成功</span></span><span className="video-item-task">{item.task}</span><span className="video-item-meta">{item.scenario} · {item.duration.toFixed(1)}s · {item.episodeId} · {item.qwen.segments.length} subgoals</span></button>)}</div><article className="video-stage"><div className="video-compare"><div className="video-compare-panel"><div className="video-compare-label">ORIGINAL VIDEO · SOURCE</div><video ref={originalVideoRef} className="video-player" controls preload="metadata" src={video.src} aria-label={`${video.id} original video`} onTimeUpdate={(event) => mirrorVideoTime("original", event.currentTarget.currentTime)} onLoadedMetadata={() => setVideoTime(0)} onPlay={() => mirrorVideoPlayback("original", true)} onPause={() => mirrorVideoPlayback("original", false)}><track kind="captions" src={video.src.replace(".mp4", ".vtt")} srcLang="en" label="Qwen dense subgoals" /></video></div><div className="video-compare-panel"><div className="video-compare-label">CAPTIONED VIDEO · EMBEDDED SUBTITLE</div><video ref={captionedVideoRef} className="video-player" controls preload="metadata" src={captionedSrc} aria-label={`${video.id} captioned video`} onTimeUpdate={(event) => mirrorVideoTime("captioned", event.currentTarget.currentTime)} onPlay={() => mirrorVideoPlayback("captioned", true)} onPause={() => mirrorVideoPlayback("captioned", false)}><track kind="captions" src={video.src.replace(".mp4", ".vtt")} srcLang="en" label="Embedded Qwen dense subgoals" /></video></div></div><div className="video-actions"><a className="export-button" href={video.src.replace(".mp4", "_captioned.mp4")} download={`${video.id}_captioned.mp4`}>下载带字幕视频</a><a className="export-button secondary" href={video.src} download={`${video.id}.mp4`}>下载原始视频</a><span className="export-note">左右两路已同步；字幕版底部黑色区域不遮挡原画面</span></div><div className="video-progress-wrap" aria-label="视频播放进度"><div className="video-progress-meta"><span>{formatTime(videoTime)} / {formatTime(video.duration)}</span><span>{activeSegment ? `Subgoal ${video.qwen.segments.indexOf(activeSegment) + 1}/${video.qwen.segments.length}` : "caption"}</span></div><div className="video-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={video.duration} aria-valuenow={videoTime}><span className="video-progress-fill" style={{ width: videoProgress + "%" }} />{video.qwen.segments.map((segment) => <span className="video-progress-marker" key={segment.start_sec} style={{ left: (segment.start_sec / video.duration * 100) + "%" }} />)}</div></div><div className="subtitle-bar" aria-live="polite"><span className="subtitle-time">{formatTime(videoTime)}</span><span className="subtitle-copy">{activeSegment?.action ?? video.qwen.caption}</span></div><div className="video-caption"><div className="detail-top"><span className="sample-id">{video.id} · {video.scenario}</span><span className="video-status success">DATASET GT 成功</span></div><h3>{video.task}</h3><div className="caption-label">OBSERVED CAPTION · QWEN DENSE</div><p className="caption-text">{video.qwen.caption}</p>{video.qwen.reason && <p className="caption-reason"><strong>Qwen 误判原因：</strong>{video.qwen.reason}</p>}<div className="caption-meta"><span>VIDEO DURATION <strong>{video.duration.toFixed(1)} s</strong></span><span>EPISODE <strong>{video.episodeId}</strong></span><span>QWEN LATENCY <strong>{video.qwen.latency.toFixed(3)} s</strong></span><span>SUBGOALS <strong>{video.qwen.segments.length}</strong></span></div><div className="caption-label">DENSE MICRO-SUBGOALS · QWEN</div><div className="caption-segments">{video.qwen.segments.map((segment, index) => <div className="caption-segment" key={`${video.id}-${index}`}><span className="segment-time">{segment.start_sec.toFixed(1)}–{segment.end_sec.toFixed(1)}s</span><span>{segment.action}</span></div>)}</div><div className="caption-label">MODEL RESULT COMPARISON</div><p className="comparison-note">下面两组不是同一次推理：第一组是任务级 dense/grounding，第二组用同一 caption prompt 重新跑一遍。TimeLens 的 grounding 区间只表示查询事件的视觉证据，不代表整条任务成功。</p><div className="model-result-grid"><article className="model-result-card"><div className="model-result-head"><i style={{ background: models.qwen.color }} /><strong>Qwen</strong><span>semantic</span></div><div className="model-result-label">SEMANTIC CAPTION</div><p className="model-result-caption">{video.qwen.caption}</p><div className="model-result-value">{video.qwen.success ? "模型判断完成" : "模型判断未完成"}</div><div className="model-result-meta">dense · {video.qwen.latency.toFixed(3)} s</div></article>{(["timelens2", "timelens"] as const).map((key) => <article className="model-result-card" key={key}><div className="model-result-head"><i style={{ background: models[key].color }} /><strong>{models[key].short}</strong><span>temporal</span></div><div className="model-result-label">RAW GROUNDING OUTPUT</div><p className="model-result-caption">{video[key].answer}</p><div className="model-result-value">区间：{video[key].spans.map((span) => `${span.start.toFixed(1)}–${span.end.toFixed(1)}s`).join(" · ")}</div>{video[key].spans.map((span, index) => <div className="interval-track" key={index}><i style={{ left: (span.start / video.duration * 100) + "%", width: ((span.end - span.start) / video.duration * 100) + "%", background: models[key].color }} /></div>)}<div className="model-result-meta">grounding · {video[key].latency.toFixed(3)} s</div></article>)}</div><div className="caption-label">UNIFIED CAPTION PROMPT · THREE MODELS</div><div className="caption-compare-grid">{(["qwen", "timelens2", "timelens"] as const).map((key) => { const item = captions[key]; return <article className="caption-compare-card" key={key}><div className="model-result-head"><i style={{ background: models[key].color }} /><strong>{models[key].short}</strong><span>{item.source === "unified_prompt" ? "parsed" : "fallback"}</span></div><div className="caption-compare-label">CAPTION OUTPUT</div><p className="caption-compare-text">{item.caption}</p><div className="caption-compare-label">ACTIONS</div><ul className="caption-compare-actions">{item.actions.map((action, index) => <li key={index}>{action}</li>)}</ul><div className="caption-compare-meta">{item.parsed ? "统一 prompt JSON" : "dense caption fallback"} · {item.latency.toFixed(3)} s</div>{item.uncertainty && <p className="caption-compare-warning">{item.uncertainty}</p>}</article>; })}</div></div></article></div></section>}

{tab === "grounding" && <section className="section-block view-block grounding-view"><div className="section-heading"><div><div className="eyebrow">GLOBAL TASK / SEMANTIC SUBTASK GROUNDING</div><h2>每个 subtask 都服务于全局任务</h2></div><span className="muted">QWEN DENSE · TIMELENS2 EVIDENCE</span></div><div className="grounding-note"><strong>标注原则：</strong>先用全局任务语义拆出服务于全局目标的可执行 subtask，再用 TimeLens2 在 20 FPS 证据窗口中定位它们。未定位的 subtask 保留为候选，不伪造时间区间；高 FPS caption 只用于边界复核。</div>{semanticLoadError ? <div className="fine-empty">语义 grounding 数据文件未加载，请确认 <code>public/semantic_grounding_data.json</code> 存在。</div> : !groundingVideo ? <div className="fine-empty">正在加载 74 个语义 subtask…</div> : <div className="grounding-layout"><div className="grounding-list" aria-label="语义 grounding 视频列表">{semanticRecords.map((item, index) => { const localizedCount = item.subtasks.filter((subtask) => subtask.status === "localized").length; return <button key={item.id} className={groundingIndex === index ? "grounding-item selected" : "grounding-item"} onClick={() => { setGroundingIndex(index); setGroundingTime(0); }}><span className="fine-item-top"><span className="sample-id">{item.id}</span><span>{localizedCount}/{item.subtasks.length} grounded</span></span><span className="fine-item-task">{item.task}</span><span className="fine-item-meta">{item.duration.toFixed(1)}s · success GT · {item.fps.toFixed(0)} FPS scan</span></button>; })}</div><article className="grounding-stage"><video className="video-player" controls preload="metadata" src={groundingVideo.src} aria-label={`${groundingVideo.id} semantic grounding video`} onTimeUpdate={(event) => setGroundingTime(event.currentTarget.currentTime)} onLoadedMetadata={() => setGroundingTime(0)}><track kind="captions" src={groundingVideo.src.replace(".mp4", ".vtt")} srcLang="en" label="Semantic subtask grounding" /></video><div className="grounding-task"><span className="fine-now-label">GLOBAL TASK</span><strong>{groundingVideo.task}</strong><span>GT success · {groundingVideo.subtasks.filter((subtask) => subtask.status === "localized").length}/{groundingVideo.subtasks.length} subtasks localized</span></div><div className="fine-progress-meta"><span>{formatPreciseTime(groundingTime)} / {formatPreciseTime(groundingVideo.duration)}</span><span>{activeGrounding ? `Subtask ${groundingVideo.subtasks.indexOf(activeGrounding) + 1}/${groundingVideo.subtasks.length}` : candidateGrounding ? `Candidate subtask ${groundingVideo.subtasks.indexOf(candidateGrounding) + 1}/${groundingVideo.subtasks.length}` : "No active grounded subtask"}</span></div><div className="grounding-track" role="progressbar" aria-valuemin={0} aria-valuemax={groundingVideo.duration} aria-valuenow={groundingTime}><span className="fine-fill" style={{ width: `${groundingProgress}%` }} />{groundingVideo.subtasks.flatMap((subtask, subtaskIndex) => subtask.status === "localized" ? subtask.spans.map((span, spanIndex) => <span className={activeGrounding === subtask && activeGroundingSpan === span ? "grounding-span active" : "grounding-span"} key={`${groundingVideo.id}-grounding-${subtaskIndex}-${spanIndex}`} style={{ left: `${(span[0] / groundingVideo.duration) * 100}%`, width: `${((span[1] - span[0]) / groundingVideo.duration) * 100}%` }} />) : [<span className="grounding-span candidate" key={`${groundingVideo.id}-candidate-${subtaskIndex}`} style={{ left: `${(subtask.qwenSpan[0] / groundingVideo.duration) * 100}%`, width: `${((subtask.qwenSpan[1] - subtask.qwenSpan[0]) / groundingVideo.duration) * 100}%` }} />])}</div><div className="grounding-active">{activeGrounding && activeGroundingSpan ? <><div><span className="fine-now-label">ACTIVE SEMANTIC SUBTASK</span><strong>{activeGroundingSpan[0].toFixed(2)}–{activeGroundingSpan[1].toFixed(2)}s</strong></div><p>{activeGrounding.action}</p><small>TimeLens2 binary grounding · evidence windows {activeGrounding.hitCount}/{activeGrounding.windowCount} · 可用于动作计划/奖励对齐/人工审核</small></> : candidateGrounding ? <><div><span className="fine-now-label">QWEN CANDIDATE · NOT LOCALIZED</span><strong>{candidateGrounding.qwenSpan[0].toFixed(2)}–{candidateGrounding.qwenSpan[1].toFixed(2)}s</strong></div><p>{candidateGrounding.action}</p><small>TimeLens2 在当前扫描中未形成可靠证据区间，保留候选供人工复核。</small></> : <p>拖动视频时间轴查看当前 subtask；灰色虚线段是尚未定位的候选。</p>}</div><div className="grounding-subtasks">{groundingVideo.subtasks.map((subtask, index) => <div className={activeGrounding === subtask ? "grounding-row active" : subtask.status === "localized" ? "grounding-row" : "grounding-row candidate"} key={`${groundingVideo.id}-row-${index}`}><span className="grounding-index">{String(index + 1).padStart(2, "0")}</span><span className="fine-label-time">{subtask.spans.length ? subtask.spans.map((span) => `${span[0].toFixed(2)}–${span[1].toFixed(2)}s`).join(" · ") : `${subtask.qwenSpan[0].toFixed(2)}–${subtask.qwenSpan[1].toFixed(2)}s candidate`}</span><span>{subtask.action}</span><span className="grounding-status">{subtask.status === "localized" ? `grounded · ${subtask.hitCount}/${subtask.windowCount}` : "unlocalized"}</span></div>)}</div></article></div>}</section>}

      {tab === "fine" && <section className="section-block view-block fine-view"><div className="section-heading"><div><div className="eyebrow">HIGH FPS / LOCAL SLIDING WINDOWS</div><h2>窗口证据，不是最终 subtask</h2></div><span className="muted">TIMELENS2 · SUPPORTING EVIDENCE</span></div>{fineLoadError ? <div className="fine-empty">高 FPS 数据文件未加载，请确认 `public/high_fps_data.json` 存在。</div> : !fineVideo ? <div className="fine-empty">正在加载 532 个短窗候选…</div> : <><div className="fine-summary"><div><span>WINDOWS</span><strong>{fineRecords.reduce((total, item) => total + item.labels.length, 0)}</strong><small>10 videos</small></div><div><span>SAMPLING</span><strong>{fineVideo.fps.toFixed(0)} FPS</strong><small>0.05s grid</small></div><div><span>CONTEXT</span><strong>{fineVideo.windowSec.toFixed(2)}s</strong><small>overlapping</small></div><div><span>STRIDE</span><strong>{fineVideo.strideSec.toFixed(2)}s</strong><small>evidence step</small></div></div><div className="fine-note">这些窗口用于检查 semantic grounding 的边界，不应直接当作新的任务 caption 或 subtask。</div><div className="fine-layout"><div className="fine-list" aria-label="高 FPS 视频列表">{fineRecords.map((item, index) => <button key={item.id} className={fineIndex === index ? "fine-item selected" : "fine-item"} onClick={() => { setFineIndex(index); setFineTime(0); }}><span className="fine-item-top"><span className="sample-id">{item.id}</span><span>{item.labels.length} windows</span></span><span className="fine-item-task">{item.task}</span><span className="fine-item-meta">{item.duration.toFixed(1)}s · {item.fps.toFixed(0)} FPS · {item.strideSec.toFixed(2)}s step</span></button>)}</div><article className="fine-stage"><video className="video-player" controls preload="metadata" src={fineVideo.src} aria-label={`${fineVideo.id} high FPS evidence video`} onTimeUpdate={(event) => setFineTime(event.currentTarget.currentTime)} onLoadedMetadata={() => setFineTime(0)}><track kind="captions" src={`/videos/${fineVideo.id}.vtt`} srcLang="en" label="Qwen dense reference" /></video><div className="fine-now"><div><span className="fine-now-label">ACTIVE EVIDENCE WINDOW</span><strong>{fineActive ? `${formatPreciseTime(fineActive.start)} – ${formatPreciseTime(fineActive.end)}` : formatPreciseTime(fineTime)}</strong></div><div className="fine-now-phase">{fineActive?.phase ?? "—"}</div><p>{fineActive?.caption ?? "拖动视频进度条查看窗口证据"}</p></div><div className="fine-progress-meta"><span>{formatPreciseTime(fineTime)} / {formatPreciseTime(fineVideo.duration)}</span><span>{fineVideo.labels.length} windows</span></div><div className="fine-track" role="progressbar" aria-valuemin={0} aria-valuemax={fineVideo.duration} aria-valuenow={fineTime}><span className="fine-fill" style={{ width: `${fineProgress}%` }} />{fineVideo.labels.map((label, index) => <span className={fineActive === label ? "fine-marker active" : "fine-marker"} key={`${fineVideo.id}-${index}`} style={{ left: `${(label.start / fineVideo.duration) * 100}%`, width: `${((label.end - label.start) / fineVideo.duration) * 100}%` }} />)}</div><div className="fine-label-list">{fineVideo.labels.map((label, index) => <div className={fineActive === label ? "fine-label active" : "fine-label"} key={`${fineVideo.id}-label-${index}`}><span className="fine-label-time">{formatPreciseTime(label.start)}–{formatPreciseTime(label.end)}</span><span className="fine-label-phase">{label.phase}</span><span>{label.caption}</span></div>)}</div></article></div></>}</section>}

      {tab === "samples" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">SAMPLE EXPLORER / SUCCESS-ONLY</div><h2>从原始视频到三模型标签</h2></div><span className="muted">SELECT A CASE</span></div><div className="sample-layout"><div className="sample-list">{videoRecords.slice(0, 4).map((item, index) => <button key={item.id} className={sampleIndex === index ? "sample-item selected" : "sample-item"} onClick={() => setSampleIndex(index)}><span className="sample-id">{item.id}</span><span>{item.task}</span><b className="locate">成功</b></button>)}</div><article className="sample-detail"><div className="detail-top"><span className="sample-id">{sample.id}</span><span className="locate">DATASET 成功</span></div><h3>{sample.task}</h3><div className="detail-meta"><span>QWEN</span><strong>{sample.qwen.success ? "判断成功" : "判断失败"}</strong><span>TL2</span><strong>{sample.timelens2.spans[0] ? `${sample.timelens2.spans[0].start.toFixed(1)}–${sample.timelens2.spans[0].end.toFixed(1)}s` : "—"}</strong><span>TL</span><strong>{sample.timelens.spans[0] ? `${sample.timelens.spans[0].start.toFixed(1)}–${sample.timelens.spans[0].end.toFixed(1)}s` : "—"}</strong></div><p className="reason">{sample.qwen.caption}</p><div className="timeline-label">DENSE MICRO-SUBGOALS</div><div className="segments">{sample.qwen.segments.map((segment, index) => <div className="segment" key={index}><span className="segment-dot" />{segment.start_sec.toFixed(1)}–{segment.end_sec.toFixed(1)}s - {segment.action}</div>)}</div></article></div></section>}

      {tab === "resources" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">DEPLOYMENT / SINGLE GPU</div><h2>速度来自任务边界，也来自运行方式</h2></div><span className="muted">H200 REFERENCE</span></div><div className="resource-grid">{(Object.keys(models) as ModelKey[]).map(key => <article className="resource-card" key={key}><div className="resource-head"><i style={{ background: models[key].color }} /><strong>{models[key].short}</strong><span>{models[key].gpu}</span></div><div className="resource-number">{models[key].latency}<small> / video</small></div><div className="resource-line"><span>权重目录</span><b>{models[key].memory}</b></div><div className="resource-line"><span>吞吐</span><b>{models[key].throughput}</b></div><div className="resource-line"><span>运行方式</span><b>{key === "qwen" ? "single-card BF16" : "single-card native"}</b></div></article>)}</div><div className="resource-callout"><span>⚠</span><p><strong>Qwen 单卡说明：</strong>原始 checkpoint 是 FP8；当前 Torch 2.5 / Triton 环境无法加载新版 FP8 kernel，因此本次单卡使用 Transformers 的 BF16 解量化路径。单张 H200（约 144 GB）可容纳约 54 GB 解量化权重；速度代表 BF16 fallback，不代表原生 FP8 kernel。</p></div></section>}

      <footer><span>LIBERO / EVAL LAB</span><span>10 success demos · three model passes · human review recommended</span><span>REPORT v2.0</span></footer>
    </main>
  );
}
