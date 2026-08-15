import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the LIBERO evaluation dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LIBERO \/ Eval Lab<\/title>/i);
  assert.match(html, /LIBERO-Long \/ libero_10/);
  assert.match(html, /Qwen3\.8-27B-FP8/);
  assert.match(html, /TimeLens2/);
  assert.match(html, /TimeLens/);
  assert.match(html, /视频 \+ 三模型/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the evaluated data and documentation in the repository", async () => {
  const [videoData, captionData, readme, report] = await Promise.all([
    readFile(new URL("../app/video-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/caption-compare-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../docs/model_efficiency_evaluation_zh.md", import.meta.url), "utf8"),
  ]);

  assert.match(videoData, /libero_long_000/);
  assert.match(videoData, /libero_long_009/);
  assert.match(captionData, /timelens2/);
  assert.match(captionData, /timelens/);
  assert.match(readme, /LIBERO-Long/);
  assert.match(readme, /model_efficiency_evaluation_zh\.md/);
  assert.match(report, /26\.939/);
  assert.match(report, /约 54 GB/);

  await access(new URL("../public/videos/libero_long_000_captioned.mp4", import.meta.url));
  await access(new URL("../public/videos/libero_long_000.vtt", import.meta.url));
});
