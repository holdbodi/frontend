import { useState } from "react";
import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

import { cx } from "@/lib/format";

interface ShareButtonsProps {
  url: string;
  text: string;
  className?: string;
}

const pillBase =
  "inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-4 py-2 font-mono text-[12.5px] uppercase text-ink transition-colors hover:bg-ink hover:text-cream";

export function ShareButtons({ url, text, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== "undefined" && Boolean(navigator.share);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const links = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: MessageCircle,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link. Please copy it manually.");
    }
  };

  const handleInstagram = async () => {
    // Instagram has no web share-intent URL, so we either hand off to the
    // OS share sheet (which includes Instagram on mobile) or fall back to
    // copying the link for the person to paste into their bio/story.
    if (canNativeShare) {
      try {
        await navigator.share({ title: "holdbodí", text, url });
      } catch {
        // person cancelled the share sheet - nothing to do
      }
      return;
    }
    await handleCopy();
    toast.message("Link copied — paste it into your Instagram bio or story.");
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: "holdbodí", text, url });
    } catch {
      // cancelled
    }
  };

  return (
    <div className={cx("flex flex-wrap items-center justify-center gap-2.5", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={pillBase}
        >
          {link.icon && <link.icon size={14} />}
          {link.label}
        </a>
      ))}

      <button type="button" onClick={handleInstagram} className={pillBase}>
        Instagram
      </button>

      <button type="button" onClick={handleCopy} className={pillBase}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>

      {canNativeShare && (
        <button type="button" onClick={handleNativeShare} className={pillBase}>
          <Share2 size={14} />
          More
        </button>
      )}
    </div>
  );
}
