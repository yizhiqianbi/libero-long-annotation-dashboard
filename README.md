# LIBERO-Long Annotation Dashboard

Interactive, success-only LIBERO-Long (`libero_10`) review dashboard. It
compares Qwen3.8-27B-FP8 semantic/dense annotations with TimeLens2 and
TimeLens temporal grounding, shows dense micro-subgoals with playback
progress, and provides burned-in subtitle video downloads.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Project Layout

- `app/page.tsx`: dashboard UI and comparison views
- `app/video-data.ts`: 10 LIBERO-Long success records and model outputs
- `app/caption-compare-data.ts`: unified caption prompt comparison
- `public/videos/`: source videos, WebVTT captions, and burned-in MP4 exports
- `docs/`: efficiency evaluation and export notes
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings

The raw model checkpoints and LIBERO HDF5 files are intentionally not stored
in this repository. The static dashboard data is derived from the reproducible
evaluation outputs described in `docs/`.

## Workspace Auth Headers

Signed-in visitors receive both `oai-authenticated-user-id` and `oai-authenticated-user-email`. Private Sites require every visitor to sign in; public Sites may also have anonymous visitors, for whom neither header is present.

The user ID is stable for the same user on the same Site and different across Sites. Email and name are intended for display or contact purposes.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Development Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

Run the dashboard locally with `npm run dev`, then open the printed local URL.
Use the **视频 + 三模型** tab to select a record, inspect the active subtitle,
compare all three outputs, or download the corresponding `_captioned.mp4`.

## Evaluation Notes

The 10 records are successful human teleoperation demonstrations, so “10/10”
is success-label alignment rather than a full accuracy score. TimeLens outputs
query-conditioned temporal evidence and does not replace task success/failure
annotation. See [`docs/model_efficiency_evaluation_zh.md`](docs/model_efficiency_evaluation_zh.md)
for latency, throughput, GPU memory, and the recommended Qwen → TimeLens2
pipeline.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
