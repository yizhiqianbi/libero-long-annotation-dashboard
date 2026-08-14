"use client";

import { useState } from "react";
import { videoRecords } from "./video-data";

type ModelKey = "qwen" | "timelens2" | "timelens";

const models: Record<ModelKey, {
  name: string;
  short: string;
  role: string;
  color: string;
  samples: string;
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
    role: "语义标注与失败诊断",
    color: "#f0b45b",
    samples: "24 / 24",
    parse: "100%",
    quality: "16.67%",
    qualityLabel: "失败识别率",
    latency: "15.53 s",
    throughput: "232 条 / 小时",
    gpu: "1 × H200",
    memory: "约 54 GB BF16",
    note: "唯一能同时输出成功状态、失败原因和动作语义的模型。单卡 BF16 解量化运行。",
  },
  timelens2: {
    name: "TimeLens2-8B",
    short: "TimeLens2",
    role: "动作时间边界定位",
    color: "#7fc9a4",
    samples: "24 / 24",
    parse: "100%",
    quality: "100%",
    qualityLabel: "失败任务误报",
    latency: "0.683 s",
    throughput: "5,275 条 / 小时",
    gpu: "1 × H200",
    memory: "约 17 GB",
    note: "同尺寸中速度最快，适合对原子动作查询做边界精修。",
  },
  timelens: {
    name: "TimeLens-8B",
    short: "TimeLens",
    role: "动作时间边界定位",
    color: "#8da9e8",
    samples: "24 / 24",
    parse: "100%",
    quality: "100%",
    qualityLabel: "失败任务误报",
    latency: "1.247 s",
    throughput: "2,886 条 / 小时",
    gpu: "1 × H200",
    memory: "约 17 GB",
    note: "输出稳定，但不能把局部动作区间当作完整任务成功。",
  },
};

const examples = [
  {
    id: "libero_plus_003",
    task: "place the red can into the basket",
    verdict: "失败",
    verdictClass: "fail",
    model: "Qwen3.8-27B-FP8",
    reason: "抓住了罐子，但没有完成放入篮子的动作，物体一直悬停在空中。",
    segments: ["0.0–3.0  接近并定位红色罐子", "3.0–4.5  闭合夹爪抓取", "4.5–9.2  悬停，未完成放置"],
  },
  {
    id: "libero_plus_021",
    task: "put both cans into the basket",
    verdict: "失败",
    verdictClass: "fail",
    model: "Qwen3.8-27B-FP8",
    reason: "只把 alphabet soup 放进篮子，第二个 tomato sauce 仍留在桌上。",
    segments: ["0.0–4.0  抓取第一罐", "4.0–7.0  移动到篮子", "7.0–10.0  放入并释放", "10.0–17.0  回撤，遗漏第二罐"],
  },
  {
    id: "libero_plus_007",
    task: "open the middle drawer of the cabinet",
    verdict: "定位",
    verdictClass: "locate",
    model: "TimeLens2-8B",
    reason: "TimeLens2 找到抓取把手并拉开抽屉的可见片段；它不负责判断完整任务成败。",
    segments: ["0.0–2.5  移向抽屉把手", "2.5–6.0  抓取并拉开", "6.0–9.8  回撤"],
  },
  {
    id: "libero_plus_025",
    task: "put both moka pots on the stove",
    verdict: "失败",
    verdictClass: "fail",
    model: "Qwen3.8-27B-FP8",
    reason: "只把一个 moka pot 搬到炉子上，第二个仍在桌面，长任务未完成。",
    segments: ["0.0–5.0  抓取右侧 moka pot", "5.0–10.0  移到炉子", "10.0–17.0  释放并回撤"],
  },
];

const tabs = [
  ["overview", "总览"],
  ["quality", "质量对比"],
  ["videos", "视频 + caption"],
  ["samples", "样本拆解"],
  ["resources", "单卡资源"],
] as const;

export default function Home() {
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("overview");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("qwen");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const active = models[selectedModel];
  const sample = examples[sampleIndex];
  const video = videoRecords[videoIndex];
  const activeSegment = video.segments.find((segment) => videoTime >= segment.start_sec && videoTime <= segment.end_sec);
  const videoProgress = Math.min(100, Math.max(0, (videoTime / Math.max(video.duration, 0.1)) * 100));
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">L</span><span>LIBERO / EVAL LAB</span></div>
        <div className="run-status"><span className="status-dot" /> RUN COMPLETE <span className="status-date">· 28 videos · 1 GPU pass</span></div>
      </header>

      <section className="hero">
        <div className="eyebrow">ANNOTATION BENCHMARK <span>／</span> 2026.08.15</div>
        <h1>同一批任务，<em>三种视角。</em></h1>
        <p className="hero-copy">这里使用的是 LIBERO-plus case-study rollout，不是专家训练演示；本地 28 条回放均来自文件名标为 success=False 的失败样本。Qwen 负责理解“有没有完成”，TimeLens 系列负责回答“动作发生在哪里”。</p>
        <div className="hero-meta"><span>DATASET <strong>LIBERO-plus / case study</strong></span><span>VIDEOS <strong>28</strong></span><span>CAPTION <strong>Qwen observed_summary + segments</strong></span></div>
      </section>

      <nav className="tabs" aria-label="评测视图">
        {tabs.map(([key, label]) => <button className={tab === key ? "tab active" : "tab"} key={key} onClick={() => setTab(key)}>{label}</button>)}
      </nav>

      {tab === "overview" && <>
        <section className="headline-grid">
          <article className="headline-card accent"><div className="card-kicker">SEMANTIC LEAD</div><div className="headline">Qwen</div><p>唯一输出成功状态、失败原因和原子动作语义的模型。</p><div className="card-foot"><span>失败识别</span><strong>4 / 24</strong></div></article>
          <article className="headline-card"><div className="card-kicker">SPEED LEAD</div><div className="headline">0.683<span className="unit">s</span></div><p>TimeLens2 单卡平均推理延迟，约为 TimeLens 的 1.83× 速度。</p><div className="card-foot"><span>吞吐</span><strong>5,275 / h</strong></div></article>
          <article className="headline-card"><div className="card-kicker">RECOMMENDED STACK</div><div className="stack-line"><span className="stack-num">01</span><strong>Qwen</strong><span>语义判断</span></div><div className="stack-line"><span className="stack-num">02</span><strong>TimeLens2</strong><span>边界精修</span></div><div className="stack-line"><span className="stack-num">03</span><strong>Human</strong><span>冲突复核</span></div></article>
        </section>
        <section className="section-block">
          <div className="section-heading"><div><div className="eyebrow">01 / MODEL READOUT</div><h2>模型不是在回答同一个问题</h2></div><span className="muted">SELECT A MODEL TO INSPECT</span></div>
          <div className="model-selector">{(Object.keys(models) as ModelKey[]).map(key => <button key={key} className={selectedModel === key ? "model-pill selected" : "model-pill"} onClick={() => setSelectedModel(key)}><i style={{ background: models[key].color }} />{models[key].short}</button>)}</div>
          <div className="readout"><div className="readout-title"><span className="model-index">0{(Object.keys(models) as ModelKey[]).indexOf(selectedModel) + 1}</span><div><h3>{active.name}</h3><span>{active.role}</span></div><div className="readout-badge">{active.gpu}</div></div><p>{active.note}</p><div className="readout-stats"><div><span>格式成功率</span><strong>{active.parse}</strong></div><div><span>{active.qualityLabel}</span><strong>{active.quality}</strong></div><div><span>平均延迟</span><strong>{active.latency}</strong></div><div><span>部署占用</span><strong>{active.memory}</strong></div></div></div>
        </section>
        <section className="two-col section-block"><div><div className="eyebrow">02 / KEY FINDING</div><h2>局部动作 ≠ 任务完成</h2><p className="body-copy">两套 TimeLens 在 24 条失败回放上都返回了合法区间。它们定位到了“抓取”“移动”等局部行为，却不会判断长任务是否漏掉了第二个目标。</p><div className="quote"><span>“</span><p>先让模型理解任务，再让模型定位动作。不要让 grounding 输出替代 success label。</p></div></div><div className="bar-panel"><div className="panel-label">FAILED ROLLOUTS · 24 TOTAL</div><div className="bar-row"><span>Qwen detected</span><div className="bar-track"><i style={{ width: "16.67%", background: models.qwen.color }} /></div><strong>4</strong></div><div className="bar-row"><span>TimeLens2 detected</span><div className="bar-track"><i style={{ width: "0%", background: models.timelens2.color }} /></div><strong>0</strong></div><div className="bar-row"><span>TimeLens detected</span><div className="bar-track"><i style={{ width: "0%", background: models.timelens.color }} /></div><strong>0</strong></div><div className="panel-note">全量数据只有失败样本；这里衡量的是失败召回，不是总体准确率。</div></div></section>
      </>}

      {tab === "quality" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">QUALITY / 24 SHARED TASKS</div><h2>能力拆分比单一排名更诚实</h2></div><span className="muted">INFERENCE-ONLY METRICS</span></div><div className="comparison-table"><div className="table-row table-head"><span>MODEL</span><span>ROLE</span><span>PARSE</span><span>SUCCESS READ</span><span>LATENCY</span></div>{(Object.keys(models) as ModelKey[]).map(key => <div className="table-row" key={key}><span className="table-model"><i style={{ background: models[key].color }} />{models[key].name}</span><span>{models[key].role}</span><span>{models[key].parse}</span><span className={key === "qwen" ? "good" : "warn"}>{key === "qwen" ? "4 / 24 failures" : "not applicable"}</span><span className="mono">{models[key].latency}</span></div>)}</div><div className="quality-notes"><article><span className="note-num">A</span><h3>Qwen / semantic</h3><p>输出平均 3.58 个动作段。能解释“只做了一件”的长任务失败，但在视觉上接近完成的失败回放上偏乐观。</p></article><article><span className="note-num">B</span><h3>TimeLens2 / temporal</h3><p>速度更快、边界合法率稳定。它需要一个明确的动作查询，不应被要求从视频中自主推导 success。</p></article><article><span className="note-num">C</span><h3>Gold set / next</h3><p>下一轮需要补成功样本和人工动作边界，才能计算 F1、失败原因准确率与 temporal mIoU。</p></article></div></section>}

      {tab === "videos" && <section className="section-block view-block video-view"><div className="section-heading"><div><div className="eyebrow">VIDEO + CAPTION / 28 RECORDS</div><h2>逐条回放每个视频与对应 caption</h2></div><span className="muted">QWEN3.8-27B-FP8 · SINGLE CARD</span></div><div className="video-layout"><div className="video-list" aria-label="视频列表">{videoRecords.map((item, index) => <button key={item.id} className={videoIndex === index ? "video-item selected" : "video-item"} onClick={() => { setVideoIndex(index); setVideoTime(0); }}><span className="video-item-top"><span className="sample-id">{item.id}</span><span className={item.success ? "video-status success" : "video-status failure"}>{item.success ? "完成" : "失败"}</span></span><span className="video-item-task">{item.task}</span><span className="video-item-meta">{item.scenario} · {item.duration.toFixed(1)}s{item.eligible ? "" : " · language variant"}</span></button>)}</div><article className="video-stage"><video className="video-player" controls preload="metadata" src={video.src} aria-label={`${video.id} video`} onTimeUpdate={(event) => setVideoTime(event.currentTarget.currentTime)} onLoadedMetadata={() => setVideoTime(0)}><track kind="captions" src={video.src.replace(".mp4", ".vtt")} srcLang="en" label="Qwen caption" /></video><div className="video-progress-wrap" aria-label="视频播放进度"><div className="video-progress-meta"><span>{formatTime(videoTime)} / {formatTime(video.duration)}</span><span>{activeSegment ? `动作 ${video.segments.indexOf(activeSegment) + 1}/${video.segments.length}` : "caption"}</span></div><div className="video-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={video.duration} aria-valuenow={videoTime}><span className="video-progress-fill" style={{ width: videoProgress + "%" }} />{video.segments.map((segment) => <span className="video-progress-marker" key={segment.start_sec} style={{ left: (segment.start_sec / video.duration * 100) + "%" }} />)}</div></div><div className="subtitle-bar" aria-live="polite"><span className="subtitle-time">{formatTime(videoTime)}</span><span className="subtitle-copy">{activeSegment?.action ?? video.caption}</span></div><div className="video-caption"><div className="detail-top"><span className="sample-id">{video.id} · {video.scenario}</span><span className={video.success ? "video-status success" : "video-status failure"}>{video.success ? "Qwen 判断完成" : "Qwen 判断失败"}</span></div><h3>{video.task}</h3><div className="caption-label">OBSERVED CAPTION · QWEN</div><p className="caption-text">{video.caption}</p>{video.reason && <p className="caption-reason"><strong>失败原因：</strong>{video.reason}</p>}<div className="caption-meta"><span>VIDEO DURATION <strong>{video.duration.toFixed(1)} s</strong></span><span>{video.eligible ? "SHARED EVAL" : "LANGUAGE VARIANT · NOT IN TIMELENS METRICS"}</span></div><div className="caption-label">ATOMIC SEGMENTS</div><div className="caption-segments">{video.segments.map((segment, index) => <div className="caption-segment" key={`${video.id}-${index}`}><span className="segment-time">{segment.start_sec.toFixed(1)}–{segment.end_sec.toFixed(1)}s</span><span>{segment.action}</span></div>)}</div></div></article></div></section>}

      {tab === "samples" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">SAMPLE EXPLORER</div><h2>从原始视频到可审核标签</h2></div><span className="muted">SELECT A CASE</span></div><div className="sample-layout"><div className="sample-list">{examples.map((item, index) => <button key={item.id} className={sampleIndex === index ? "sample-item selected" : "sample-item"} onClick={() => setSampleIndex(index)}><span className="sample-id">{item.id}</span><span>{item.task}</span><b className={item.verdictClass}>{item.verdict}</b></button>)}</div><article className="sample-detail"><div className="detail-top"><span className="sample-id">{sample.id}</span><span className={sample.verdictClass}>{sample.verdict}</span></div><h3>{sample.task}</h3><div className="detail-meta"><span>OUTPUT BY</span><strong>{sample.model}</strong></div><p className="reason">{sample.reason}</p><div className="timeline-label">ATOMIC SEGMENTS</div><div className="segments">{sample.segments.map((segment) => <div className="segment" key={segment}><span className="segment-dot" />{segment}</div>)}</div></article></div></section>}

      {tab === "resources" && <section className="section-block view-block"><div className="section-heading"><div><div className="eyebrow">DEPLOYMENT / SINGLE GPU</div><h2>速度来自任务边界，也来自运行方式</h2></div><span className="muted">H200 REFERENCE</span></div><div className="resource-grid">{(Object.keys(models) as ModelKey[]).map(key => <article className="resource-card" key={key}><div className="resource-head"><i style={{ background: models[key].color }} /><strong>{models[key].short}</strong><span>{models[key].gpu}</span></div><div className="resource-number">{models[key].latency}<small> / video</small></div><div className="resource-line"><span>权重目录</span><b>{models[key].memory}</b></div><div className="resource-line"><span>吞吐</span><b>{models[key].throughput}</b></div><div className="resource-line"><span>运行方式</span><b>{key === "qwen" ? "single-card BF16" : "single-card native"}</b></div></article>)}</div><div className="resource-callout"><span>⚠</span><p><strong>Qwen 单卡说明：</strong>原始 checkpoint 是 FP8；当前 Torch 2.5 / Triton 环境无法加载新版 FP8 kernel，因此本次单卡使用 Transformers 的 BF16 解量化路径。单张 H200（约 144 GB）可容纳约 54 GB 解量化权重；速度代表 BF16 fallback，不代表原生 FP8 kernel。</p></div></section>}

      <footer><span>LIBERO / EVAL LAB</span><span>28 videos · three model passes · human review recommended</span><span>REPORT v1.0</span></footer>
    </main>
  );
}
