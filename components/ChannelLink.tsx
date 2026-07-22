"use client";

import { useState } from "react";
import type { Channel } from "@/lib/queries";

// The visible "one login → connect your chats" surface. The signed-in user gets
// a one-time code; sending it to the Telegram/WhatsApp bot binds that channel to
// this same account, so anything they send by chat files under their identity.

const CHANNEL_LABEL: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  messenger: "Messenger",
  instagram: "Instagram",
  email: "Email",
};

export default function ChannelLink({
  code,
  channels,
  telegramBot,
  whatsappNumber,
}: {
  code: string | null;
  channels: Channel[];
  telegramBot: string;
  whatsappNumber: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked, the code is visible to type manually */
    }
  };

  const linked = new Set(channels.map((c) => c.channel));

  // Pre-config (no shared DB yet): keep the promise visible, don't error.
  if (!code) {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-muted">
        Chat channels switch on the moment your account database is connected.
        You&rsquo;ll get a one-time code here to link WhatsApp and Telegram to
        this login.
      </div>
    );
  }

  const tgHref = `https://t.me/${telegramBot.replace(/^@/, "")}?start=${code}`;
  const waText = encodeURIComponent(`LINK ${code}`);
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${waText}`
    : null;

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-card p-6">
      <p className="text-sm text-muted">
        Send this one-time code to the ARC bot on any chat app to link it to your
        account. It expires in 24 hours.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <code className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 font-mono text-lg tracking-widest">
          {code}
        </code>
        <button
          onClick={copy}
          className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={tgHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          Link Telegram
          {linked.has("telegram") && <span className="text-emerald-600">✓</span>}
        </a>
        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5"
          >
            Link WhatsApp
            {linked.has("whatsapp") && <span className="text-emerald-400">✓</span>}
          </a>
        ) : (
          <span className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted">
WhatsApp coming soon
          </span>
        )}
      </div>

      {channels.length > 0 && (
        <div className="mt-6 border-t border-white/8 pt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Linked
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {channels.map((c) => (
              <span
                key={`${c.channel}-${c.platform_user_id}`}
                className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
              >
                <span className="text-emerald-400">✓</span>
                {CHANNEL_LABEL[c.channel] ?? c.channel}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
