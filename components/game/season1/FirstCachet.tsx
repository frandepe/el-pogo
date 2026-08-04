"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIRST_CACHET_PERSONAL_SHARE,
  FIRST_CACHET_TOTAL_AMOUNT,
} from "@/game/careerRewards";
import Image from "next/image";
import { InfoScene } from "../info/InfoScene";

type FirstCachetProps = {
  onReward: () => void;
  onComplete: () => void;
};

export function FirstCachet({ onReward, onComplete }: FirstCachetProps) {
  const onRewardRef = useRef(onReward);
  const onCompleteRef = useRef(onComplete);
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpeningEnvelope, setIsOpeningEnvelope] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAmountVisible, setIsAmountVisible] = useState(false);

  useEffect(() => {
    onRewardRef.current = onReward;
    onCompleteRef.current = onComplete;
  }, [onReward, onComplete]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const openingTimer = window.setTimeout(() => {
      setIsOpeningEnvelope(true);
    }, 300);
    const openEnvelopeTimer = window.setTimeout(() => {
      setIsEnvelopeOpen(true);
    }, 500);
    const amountTimer = window.setTimeout(() => {
      setIsAmountVisible(true);
    }, 600);
    const rewardTimer = window.setTimeout(() => {
      onRewardRef.current();
    }, 1400);
    const completeTimer = window.setTimeout(() => {
      onCompleteRef.current();
    }, 2500);

    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(openEnvelopeTimer);
      window.clearTimeout(amountTimer);
      window.clearTimeout(rewardTimer);
      window.clearTimeout(completeTimer);
    };
  }, [hasStarted]);

  return (
    <InfoScene
      actionDisabled={hasStarted}
      actionLabel="Abrir el sobre"
      eyebrow="Primer cachet"
      media={
        <div className="relative h-64 w-72 sm:h-72 sm:w-80">
          <Image
            alt="Sobre cerrado con el primer cachet de la banda"
            className={[
              "absolute inset-0 object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.36)]",
              "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity motion-reduce:duration-150",
              isEnvelopeOpen
                ? "translate-y-1 scale-[0.98] opacity-0"
                : isOpeningEnvelope
                  ? "translate-y-1 scale-[0.99] opacity-85"
                  : "translate-y-0 scale-100 opacity-100",
            ].join(" ")}
            height={1024}
            priority
            src="/money/close_envelope.png"
            width={1024}
          />
          <Image
            alt="Sobre abierto con el primer cachet de la banda"
            className={[
              "absolute inset-0 object-contain drop-shadow-[0_32px_75px_rgba(0,0,0,0.38)]",
              "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity motion-reduce:duration-150",
              isEnvelopeOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-[0.97] opacity-0",
            ].join(" ")}
            height={1024}
            priority
            src="/money/open_envelope.png"
            width={1024}
          />

          <div
            aria-live="polite"
            className={[
              "absolute inset-x-0 top-0 flex items-start justify-center gap-3",
              "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity motion-reduce:duration-150",
              isAmountVisible
                ? "-translate-y-2 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0",
            ].join(" ")}
          >
            <span className="font-heading text-5xl font-semibold text-[#f0d58a] drop-shadow-[0_10px_32px_rgba(240,213,138,0.16)] sm:text-6xl">
              +${FIRST_CACHET_TOTAL_AMOUNT}
            </span>
            <span className="-mt-1 -rotate-3 border-b border-[#78a86a]/50 px-1 font-heading text-lg font-semibold text-[#8fbd7b] drop-shadow-[0_8px_20px_rgba(143,189,123,0.14)] sm:text-xl">
              +${FIRST_CACHET_PERSONAL_SHARE} para vos
            </span>
          </div>
        </div>
      }
      title="El primer sobre"
      tone="positive"
      onAction={() => setHasStarted(true)}
    >
      <p>
        El dueño del bar se acerca despacio y deja un sobre de papel bastante
        arrugado sobre la mesa.
      </p>
      <p>
        -&quot;No es mucho... pero es la primera vez que les puedo pagar por
        tocar.&quot;
      </p>
      <p>
        Durante unos segundos nadie lo abre. Todos miran el sobre como si
        pesara mucho más de lo que realmente pesa.
      </p>
    </InfoScene>
  );
}
