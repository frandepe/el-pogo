"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type CinematicTransitionProps = {
  actionLabel?: string;
  alt: string;
  children: ReactNode;
  imagePriority?: boolean;
  imageSrc: string;
  summary?: ReactNode;
  title: string;
  onContinue: () => void;
};

export function CinematicTransition({
  actionLabel = "Continuar",
  alt,
  children,
  imagePriority = false,
  imageSrc,
  summary,
  title,
  onContinue,
}: CinematicTransitionProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleContinue() {
    if (isLeaving) {
      return;
    }

    setIsLeaving(true);
    timeoutRef.current = setTimeout(onContinue, 220);
  }

  return (
    <section
      className="cinematic-transition relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen px-6 py-2 sm:py-4"
      data-state={isLeaving ? "leaving" : "entered"}
    >
      <div className="cinematic-transition__frame relative isolate mx-auto min-h-[560px] w-full max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_32px_90px_rgba(0,0,0,0.38)] sm:min-h-[620px]">
        <Image
          alt={alt}
          className="cinematic-transition__image object-cover"
          fill
          priority={imagePriority}
          sizes="(min-width: 1280px) 1280px, calc(100vw - 3rem)"
          src={imageSrc}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_62%_34%,rgba(255,255,255,0.07),transparent_30%),linear-gradient(90deg,rgba(6,5,5,0.97)_0%,rgba(8,6,6,0.88)_28%,rgba(13,8,8,0.54)_48%,rgba(16,9,8,0.22)_72%,rgba(0,0,0,0.10)_100%),linear-gradient(180deg,rgba(0,0,0,0.64)_0%,transparent_22%,transparent_68%,rgba(0,0,0,0.78)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-7 bg-black/82 sm:h-9"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-7 bg-black/82 sm:h-9"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:100%_3px]"
        />
        <div aria-hidden="true" className="cinematic-transition__grain" />

        <div className="relative z-10 flex min-h-[560px] flex-col justify-end px-5 py-12 sm:min-h-[620px] sm:px-10 sm:py-16 lg:px-14">
          <div className="max-w-2xl">
            <div className="cinematic-transition__rule mb-6 h-px w-28 bg-gradient-to-r from-[#d8b45f] via-[#f1e7cf]/70 to-transparent" />
            <h2 className="cinematic-transition__title text-balance font-heading text-4xl font-semibold leading-[0.98] text-[#f7efe1] sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            <div className="cinematic-transition__copy mt-7 flex max-w-xl flex-col gap-3 text-pretty text-lg leading-8 text-[#e8ded0]/82 sm:text-xl sm:leading-9">
              {children}
            </div>
            {summary ? (
              <div className="cinematic-transition__summary mt-8 w-full max-w-xl rounded-md border border-[#f1e7cf]/12 bg-black/22 px-4 py-3 text-[#f1e7cf]/72 backdrop-blur-sm">
                {summary}
              </div>
            ) : null}
          </div>

          <button
            className="cinematic-transition__action mt-9 inline-flex w-fit items-center gap-2 rounded-md border border-[#f1e7cf]/35 bg-black/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#f1e7cf]/82 backdrop-blur-sm transition-[background-color,border-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#f1e7cf]/60 hover:bg-[#f1e7cf]/10 hover:text-[#f7efe1] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-colors motion-reduce:active:scale-100"
            disabled={isLeaving}
            type="button"
            onClick={handleContinue}
          >
            <span>{actionLabel}</span>
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
