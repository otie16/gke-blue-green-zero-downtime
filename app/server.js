import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

// Expose which color/version is running
const COLOR = process.env.COLOR || "blue";
const VERSION = process.env.VERSION || "v1.0.0";

const html = (color, version) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Blue-Green Zero Downtime</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
  <div class="max-w-3xl mx-auto px-6 py-16">
    <div class="mb-10">
      <h1 class="text-4xl font-bold tracking-tight">Zero Downtime Deployments</h1>
      <p class="text-slate-300 mt-2">Kubernetes • GKE • Blue-Green • GitHub Actions</p>
    </div>
    <div class="grid gap-6">
      <div class="rounded-2xl p-6 shadow-xl ring-1 ring-white/10 bg-slate-800/60">
        <p class="text-slate-300">Current environment</p>
        <div class="mt-3 flex items-center gap-3">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-white/10"
                style="background:${COLOR === "green" ? "#065f46" : "#1e3a8a"}">
            ${color.toUpperCase()}
          </span>
          <span class="text-slate-400">•</span>
          <span class="text-slate-200">Version: <strong>${version}</strong></span>
        </div>
      </div>
      <div class="rounded-2xl p-6 shadow-xl ring-1 ring-white/10 bg-slate-800/60">
        <h2 class="text-xl font-semibold mb-2">What’s happening?</h2>
        <p class="text-slate-300">
          You’re viewing a Blue-Green deployment on GKE. We deploy the new color in parallel,
          wait until it’s healthy, then flip the Service selector — <em>no downtime</em>.
        </p>
      </div>
      <div class="rounded-2xl p-6 shadow-xl ring-1 ring-white/10 bg-slate-800/60">
        <h2 class="text-xl font-semibold mb-2">Health</h2>
        <p class="text-slate-300">Try <code>/healthz</code> and <code>/readyz</code> endpoints.</p>
      </div>
    </div>
    <footer class="mt-10 text-sm text-slate-400">GKE • Artifact Registry • GitHub Actions</footer>
  </div>
</body>
</html>`;

app.get("/", (_req, res) => res.type("html").send(html(COLOR, VERSION)));
app.get("/healthz", (_req, res) => res.json({ status: "ok I am healthy", color: COLOR, version: VERSION }));
app.get("/readyz", (_req, res) => {
  // Add real checks in production (DB, cache, deps)
  res.json({ ready: true, status: "Hello I'm ready to go now, Thank You" });
});

app.listen(PORT, () => console.log(`App on :${PORT} (${COLOR} ${VERSION})`));

