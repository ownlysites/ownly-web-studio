#!/usr/bin/env python3
"""
Batch Runway asset generation for Ownly Web Studio V3.
- 9 still illustrations (4 service cards, 5 process steps) -> /public/illustrations/
- 8 industry video loops (text -> image -> video) -> /public/loops/
Reads RUNWAY_API_KEY from /TakeOvery/.env.
"""
import os, sys, time, json, base64, pathlib, urllib.request, urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[2]
ENV_PATH = pathlib.Path("/Users/daveivery/Documents/Claude/Projects/TakeOvery/.env")
if ENV_PATH.exists():
    for line in ENV_PATH.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

API_KEY = os.environ["RUNWAY_API_KEY"]
BASE = "https://api.dev.runwayml.com/v1"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "X-Runway-Version": "2024-11-06",
    "Content-Type": "application/json",
}

ILL = ROOT / "public" / "illustrations"
LOOPS = ROOT / "public" / "loops"
ILL.mkdir(parents=True, exist_ok=True)
LOOPS.mkdir(parents=True, exist_ok=True)


def _req(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode(errors="replace")
        raise RuntimeError(f"HTTP {e.code} {e.reason}\n{body_text}")


def poll(task_id, label):
    print(f"[poll] {label} {task_id}", flush=True)
    while True:
        data = _req("GET", f"/tasks/{task_id}")
        status = data.get("status")
        if status == "SUCCEEDED":
            outs = data.get("output") or []
            if not outs:
                raise RuntimeError(f"{label} succeeded with no output")
            return outs[0]
        if status in ("FAILED", "CANCELLED"):
            raise RuntimeError(f"{label} {status}: {json.dumps(data)[:500]}")
        print(f"  ...{label} {status}", flush=True)
        time.sleep(6)


def download(url, out_path):
    urllib.request.urlretrieve(url, out_path)
    print(f"[save] {out_path}", flush=True)


def text_to_image(prompt, name, ratio="1024:1024", out_dir=ILL):
    out = out_dir / f"{name}.png"
    if out.exists():
        print(f"[skip] {out} exists", flush=True)
        return None
    try:
        res = _req("POST", "/text_to_image", {
            "model": "gen4_image",
            "promptText": prompt,
            "ratio": ratio,
        })
        url = poll(res["id"], f"img:{name}")
        download(url, out)
        return url
    except Exception as e:
        print(f"[err] image {name}: {e}", flush=True)
        return None


def image_to_video(image_url, prompt, name, ratio="1280:720"):
    out = LOOPS / f"{name}.mp4"
    if out.exists():
        print(f"[skip] {out} exists", flush=True)
        return None
    try:
        res = _req("POST", "/image_to_video", {
            "model": "gen4_turbo",
            "promptImage": image_url,
            "promptText": prompt,
            "ratio": ratio,
            "duration": 5,
        })
        url = poll(res["id"], f"vid:{name}")
        download(url, out)
        return url
    except Exception as e:
        print(f"[err] video {name}: {e}", flush=True)
        return None


SERVICES = [
    ("svc_lead",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A single glowing browser window centered, gold light spilling from the screen onto an open notebook below, small key icon hovering above the URL bar. Wall Street Journal Saturday Magazine style. No text. No people. Square composition."),
    ("svc_industry",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A constellation of six glowing rectangles connected by gold thread, arranged like a small star map on dark navy parchment. The Atlantic magazine style. No text. No people. Square composition."),
    ("svc_bespoke",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A folded architectural blueprint in cream, edges glowing antique gold, a small fountain pen lying diagonally across it. Compass-rose watermark behind. Editorial luxury magazine style. No text. No people. Square composition."),
    ("svc_agent",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. An antique brass speaking-tube curved gently across the frame, soft gold light emerging from one end, faint waveform sketched on parchment behind. No machines no robots. Editorial luxury magazine style. No text. No people. Square composition."),
]

PROCESS = [
    ("step_1_sitdown",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. Two empty leather chairs facing each other on warm wood floor, soft golden window light falling between them. No people. Wall Street Journal Saturday Magazine style. Square composition."),
    ("step_2_mockup",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A draftsman's pencil resting on a folded mockup sketch in cream paper, gold accent ruler beside it. Editorial luxury magazine style. No people. Square composition."),
    ("step_3_build",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A vintage typewriter midway through a cream paper page, gold typewriter ribbon visible. Editorial luxury magazine style. No people. Square composition."),
    ("step_4_launch",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A telegraph key on a wooden desk, single gold spark hovering above it, brass details. Editorial luxury magazine style. No people. Square composition."),
    ("step_5_engine",
     "Editorial spot illustration, antique gold deep navy warm cream palette, paper grain texture overlay. A grandfather clock pendulum with gold weights, soft paper grain background, cream and navy palette. Editorial luxury magazine style. No people. Square composition."),
]

INDUSTRIES = [
    ("hotel",
     "Slow horizontal dolly across a sunlit luxury hotel lobby, marble floor reflecting golden chandeliers, brass elevator doors closing in the distance, paper grain overlay subtle, antique gold and navy palette, cinematic dolly motion, slow ease-in, golden hour"),
    ("restaurant",
     "Macro slow zoom over a plated dish at golden hour, single gold rimmed glass beside it, candle flame flickering gently, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in, golden hour"),
    ("hvac",
     "Pickup truck pulling slowly into a residential driveway at dawn, golden light hitting the chrome grill, branded toolbox visible on the bed, paper grain overlay subtle, antique gold and navy palette, cinematic dolly motion, slow ease-in, golden hour"),
    ("medspa",
     "Slow ease over a marble bathroom counter with a single ceramic vase, sunlight filtering through linen curtains, soft golden warmth, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in, golden hour"),
    ("wealth",
     "Slow camera glide over an open leather bound ledger, gold fountain pen tracing across a line, antique brass desk lamp glowing softly, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in, golden hour"),
    ("realestate",
     "Aerial drone shot dropping over a modern estate at dusk, gold accent lights illuminating the entrance, swimming pool reflecting the sky, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in, golden hour"),
    ("saas",
     "Slow vertical scroll past a glass MacBook in soft darkness, gold ambient light from the keyboard, papers and coffee cup nearby, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in, golden hour"),
    ("ai-agent",
     "Floating antique brass speaking tube against a navy backdrop, gold particles slowly drifting upward, soft pulse of light through the tube, paper grain overlay subtle, antique gold and navy palette, cinematic motion, slow ease-in"),
]


def run_illustrations():
    print(f"\n=== ILLUSTRATIONS ({len(SERVICES) + len(PROCESS)}) ===", flush=True)
    for name, prompt in SERVICES + PROCESS:
        text_to_image(prompt, name)


def run_videos():
    print(f"\n=== VIDEO LOOPS ({len(INDUSTRIES)}) ===", flush=True)
    for name, prompt in INDUSTRIES:
        out = LOOPS / f"{name}.mp4"
        if out.exists():
            print(f"[skip] {out}", flush=True)
            continue
        seed_path = ILL / f"_seed_{name}.png"
        seed_url = None
        if not seed_path.exists():
            print(f"[seed] generating image for {name}", flush=True)
            try:
                res = _req("POST", "/text_to_image", {
                    "model": "gen4_image",
                    "promptText": prompt,
                    "ratio": "1280:720",
                })
                seed_url = poll(res["id"], f"seed:{name}")
                urllib.request.urlretrieve(seed_url, seed_path)
            except Exception as e:
                print(f"[err] seed {name}: {e}", flush=True)
                continue
        else:
            print(f"[seed] reuse {seed_path}", flush=True)
        # Upload seed as data URL for image-to-video
        img_bytes = seed_path.read_bytes()
        data_url = f"data:image/png;base64,{base64.b64encode(img_bytes).decode()}"
        image_to_video(data_url, prompt, name)


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"
    if mode in ("all", "illustrations"):
        run_illustrations()
    if mode in ("all", "videos"):
        run_videos()
    print("\n=== DONE ===", flush=True)
