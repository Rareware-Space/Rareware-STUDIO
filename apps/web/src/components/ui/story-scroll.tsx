"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export interface FlowSectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  id,
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
}) => (
  <section
    id={id}
    data-flow-section
    aria-label={ariaLabel}
    className={cx("relative min-h-screen w-full overflow-hidden", className)}
  >
    <div
      data-flow-inner
      className={cx(
        "flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]",
        "will-change-transform",
      )}
      style={{ transformOrigin: "bottom left", ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  rotationAngle?: number;
  scrub?: boolean | number;
  transformOrigin?: string;
  scaleFrom?: number;
  yOffset?: number;
}

const childCount = (children: React.ReactNode) =>
  React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
  rotationAngle = 30,
  scrub = 1.2,
  transformOrigin = "bottom left",
  scaleFrom = 0.94,
  yOffset = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          "[data-flow-section]",
        ),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>(".flow-art-container");
        if (!inner) return;

        if (i > 0) {
          gsap.set(inner, {
            rotation: rotationAngle,
            scale: scaleFrom,
            y: yOffset,
            transformOrigin,
          });
          const tween = gsap.to(inner, {
            rotation: 0,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    {
      scope: containerRef,
      dependencies: [
        childCount(children),
        reducedMotion,
        rotationAngle,
        scrub,
        transformOrigin,
        scaleFrom,
        yOffset,
      ],
    },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
