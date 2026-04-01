"use client";

import * as React from "react";
import { toBlob } from "html-to-image";
import IosShareIcon from "@mui/icons-material/IosShare";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, CircularProgress, Stack, Typography, Alert } from "@mui/material";

/** Single demo asset — 9:16 friendly crop; CORS-enabled for canvas export */
const STORY_IMAGE =
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1080&h=1920&auto=format&fit=crop";

const CAPTURE_W = 1080;
const CAPTURE_H = 1920;
const PREVIEW_SCALE = 0.28;

function canShareFiles(blob) {
  try {
    if (typeof navigator === "undefined" || !navigator.share || !navigator.canShare) return false;
    const file = new File([blob], "furniflow-story.png", { type: "image/png" });
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

async function shareImageBlob(blob) {
  const file = new File([blob], "furniflow-story.png", { type: "image/png" });
  await navigator.share({
    files: [file],
    title: "FurniFlow",
    text: "Rent or buy furniture that fits your life."
  });
}

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "furniflow-instagram-story.png";
  a.click();
  URL.revokeObjectURL(url);
}

async function copyImageToClipboard(blob) {
  if (!navigator.clipboard || !window.ClipboardItem) return false;
  try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return true;
  } catch {
    return false;
  }
}

export default function StoryShare({ className = "" }) {
  const captureRef = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const [hint, setHint] = React.useState(null);

  const runExport = React.useCallback(async (action) => {
    const node = captureRef.current;
    if (!node) return;
    setBusy(true);
    setHint(null);
    try {
      const blob = await toBlob(node, {
        type: "image/png",
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#0a0f1f"
      });
      if (!blob) throw new Error("Could not create image.");

      if (action === "share" && canShareFiles(blob)) {
        try {
          await shareImageBlob(blob);
          setHint({ severity: "success", text: "Shared — pick Instagram (or another app) from the sheet." });
        } catch (err) {
          if (err?.name === "AbortError") {
            setHint(null);
          } else {
            downloadBlob(blob);
            setHint({
              severity: "info",
              text: "Share failed — we saved the image instead. Open it and share from your gallery."
            });
          }
        }
      } else if (action === "share" && !canShareFiles(blob)) {
        downloadBlob(blob);
        setHint({
          severity: "info",
          text: "Sharing files isn’t available here — we saved the story image for you."
        });
      } else if (action === "download") {
        downloadBlob(blob);
        setHint({ severity: "success", text: "Image downloaded. Add it to your Instagram story from Photos." });
      } else if (action === "copy") {
        const ok = await copyImageToClipboard(blob);
        setHint(
          ok
            ? { severity: "success", text: "Image copied — paste into Instagram or any app." }
            : { severity: "warning", text: "Copy isn’t supported — use Download instead." }
        );
      }
    } catch (e) {
      setHint({ severity: "error", text: e?.message || "Something went wrong. Try Download." });
    } finally {
      setBusy(false);
    }
  }, []);

  const previewBoxStyle = {
    width: CAPTURE_W * PREVIEW_SCALE,
    height: CAPTURE_H * PREVIEW_SCALE,
    overflow: "hidden"
  };

  return (
    <section className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 shadow-soft ${className}`}>
      <Typography variant="h6" component="h2" className="font-bold mb-1">
        Share to Instagram story
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        We turn this layout into a 9:16 PNG. On phones, use Share to open Instagram; otherwise save the image.
      </Typography>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="mx-auto md:mx-0 shrink-0" style={previewBoxStyle}>
          <div
            style={{
              transform: `scale(${PREVIEW_SCALE})`,
              transformOrigin: "top left",
              width: CAPTURE_W,
              height: CAPTURE_H
            }}
          >
            <div
              ref={captureRef}
              className="relative overflow-hidden text-white"
              style={{
                width: CAPTURE_W,
                height: CAPTURE_H,
                fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <img
                src={STORY_IMAGE}
                alt=""
                crossOrigin="anonymous"
                className="absolute inset-0 h-full w-full object-cover"
                width={CAPTURE_W}
                height={CAPTURE_H}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,15,31,0.95) 0%, rgba(10,15,31,0.35) 45%, transparent 72%)"
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-14 pb-20">
                <p
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    marginBottom: 24
                  }}
                >
                  Live beautifully.
                  <br />
                  FurniFlow.
                </p>
                <p style={{ fontSize: 32, opacity: 0.92, fontWeight: 600 }}>Rent or buy — your space, your rules.</p>
                <p style={{ fontSize: 26, marginTop: 36, opacity: 0.75, fontWeight: 500 }}>furniflow.app</p>
              </div>
            </div>
          </div>
        </div>

        <Stack spacing={1.5} className="flex-1 w-full min-w-0">
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={busy ? <CircularProgress size={20} color="inherit" /> : <IosShareIcon />}
            disabled={busy}
            onClick={() => runExport("share")}
            aria-label="Share story image"
          >
            Share image
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<DownloadIcon />}
            disabled={busy}
            onClick={() => runExport("download")}
            aria-label="Download story image"
          >
            Download image
          </Button>
          <Button
            variant="text"
            size="medium"
            fullWidth
            startIcon={<ContentCopyIcon />}
            disabled={busy}
            onClick={() => runExport("copy")}
            aria-label="Copy image to clipboard"
          >
            Copy image
          </Button>
          {hint ? (
            <Alert severity={hint.severity} onClose={() => setHint(null)} className="mt-2">
              {hint.text}
            </Alert>
          ) : null}
        </Stack>
      </div>
    </section>
  );
}
