"use client";

import { useEffect } from "react";
import { FRAMEABLE_HOSTS } from "@/lib/site";

export default function ConciergeFrame() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("ownly-concierge")) return;

    const shell = document.createElement("div");
    shell.id = "ownly-concierge";
    shell.innerHTML = `
      <div class="oc-bar">
        <div class="oc-brand"><span class="oc-dot"></span>Ownly Web Studio <span class="oc-title" id="oc-title"></span></div>
        <div class="oc-actions">
          <a class="oc-btn" id="oc-open-tab" target="_blank" rel="noopener">Open in new tab ↗</a>
          <button class="oc-btn oc-close" id="oc-close">← Back to Ownly</button>
        </div>
      </div>
      <div class="oc-frame-wrap"><iframe id="oc-frame" referrerpolicy="no-referrer-when-downgrade" allow="payment; microphone; camera; clipboard-read; clipboard-write" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>
    `;
    document.body.appendChild(shell);

    const toast = document.createElement("div");
    toast.className = "oc-toast";
    toast.id = "oc-toast";
    toast.innerHTML = `
      <h3>Opening in a new tab</h3>
      <p id="oc-toast-msg">This partner doesn't allow embedded preview. We'll open it in a new tab so their security stays intact — come right back when you're done.</p>
      <a class="oc-primary" id="oc-toast-go" target="_blank" rel="noopener">Continue →</a>
      <button class="oc-secondary" id="oc-toast-cancel">Stay here</button>
    `;
    document.body.appendChild(toast);

    const frame = document.getElementById("oc-frame") as HTMLIFrameElement;
    const titleEl = document.getElementById("oc-title")!;
    const openTabEl = document.getElementById("oc-open-tab") as HTMLAnchorElement;

    function openFrame(url: string, label: string) {
      titleEl.textContent = label ? "· " + label : "";
      openTabEl.href = url;
      frame.src = url;
      shell.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeFrame() {
      shell.classList.remove("open");
      frame.src = "about:blank";
      document.body.style.overflow = "";
    }
    function openToast(url: string, label: string) {
      const msg = document.getElementById("oc-toast-msg")!;
      msg.textContent = label
        ? `${label} opens outside Ownly — we'll launch it in a new tab so your spot here stays warm. Come right back when you're done.`
        : "This partner doesn't allow embedded preview. We'll open it in a new tab so their security stays intact — come right back when you're done.";
      const go = document.getElementById("oc-toast-go") as HTMLAnchorElement;
      go.href = url;
      go.onclick = () => setTimeout(closeToast, 600);
      toast.classList.add("show");
    }
    function closeToast() { toast.classList.remove("show"); }

    function isFrameable(url: string) {
      try {
        const u = new URL(url, window.location.href);
        return FRAMEABLE_HOSTS.includes(u.hostname);
      } catch { return false; }
    }

    const closeBtn = document.getElementById("oc-close");
    const cancelBtn = document.getElementById("oc-toast-cancel");
    closeBtn?.addEventListener("click", closeFrame);
    cancelBtn?.addEventListener("click", closeToast);

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const a = target.closest('a[data-frame="modal"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      e.preventDefault();
      const labelEl = a.querySelector("h3") || a.querySelector("[data-frame-label]");
      const label = labelEl ? (labelEl.textContent || "").trim() : (a.textContent || "").trim().slice(0, 40);
      if (isFrameable(href)) openFrame(href, label);
      else openToast(href, label);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { closeFrame(); closeToast(); }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      shell.remove();
      toast.remove();
    };
  }, []);

  return null;
}
