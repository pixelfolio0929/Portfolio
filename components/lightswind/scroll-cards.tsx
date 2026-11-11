"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Building2, ArrowUpRight, Eye, CheckCircle2 } from "lucide-react";

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  tagline?: string;
  description?: string;
  badge?: string;
  isWorkMode?: boolean;
  isOfficialWork?: boolean;
  organization?: string;
  officeLocation?: string;
  technologies?: string[];
  live?: string;
  onAction?: () => void;
}

export interface ScrollCardsProps {
  cards: CardData[];
  /**
   * Defines the direction from which the next card enters.
   * @default "bottom"
   */
  direction?: "bottom" | "top" | "left" | "right";
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  /**
   * The scale the current card scales down to.
   * @default 0.72
   */
  cardScale?: number;
  /**
   * The rotation the current card rotates to.
   * @default 5
   */
  cardRotation?: number;
  isRTL?: boolean;
  onCardClick?: (card: CardData) => void;
}

export function ScrollCards({
  cards,
  direction = "bottom",
  className,
  containerClassName,
  imageClassName,
  cardScale = 0.72,
  cardRotation = 5,
  isRTL = false,
  onCardClick,
}: ScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean);
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      // Ensure first card is visible and at rest
      gsap.set(cardElements[0], { x: "0%", y: "0%", scale: 1, rotation: 0, opacity: 1 });

      // Determine initial offset based on entrance direction
      const getInitialOffset = () => {
        switch (direction) {
          case "top":
            return { y: "-100%", x: "0%" };
          case "left":
            return { x: "-100%", y: "0%" };
          case "right":
            return { x: "100%", y: "0%" };
          case "bottom":
          default:
            return { y: "100%", x: "0%" };
        }
      };

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardElements[i], { ...getInitialOffset(), scale: 1, rotation: 0, opacity: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * totalCards}`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: cardScale,
            rotation: isRTL ? -cardRotation : cardRotation,
            duration: 1,
            ease: "power2.inOut",
          },
          position,
        );

        scrollTimeline.to(
          nextCard,
          {
            x: "0%",
            y: "0%",
            duration: 1,
            ease: "power2.inOut",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
      };
    },
    { scope: container, dependencies: [direction, cards.length, cardScale, cardRotation, isRTL] }
  );

  return (
    <div className={cn("relative w-full h-screen", className)} ref={container}>
      <div className="lightswind-scroll-cards-trigger relative flex h-full w-full items-center justify-center overflow-visible p-3 sm:p-6 lg:p-8">
        <div
          className={cn(
            "relative w-[96%] sm:w-[92%] lg:w-[88%] max-w-[1240px] aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden rounded-3xl shadow-2xl border border-white/10 dark:border-white/10 bg-[#0c0d12]",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => onCardClick?.(card)}
              className={cn(
                "absolute inset-0 rounded-3xl overflow-hidden will-change-transform shadow-2xl bg-[#0c0d12] cursor-pointer group transition-all duration-300",
                imageClassName
              )}
            >
              {/* Full Bleed Image */}
              <img
                src={card.image}
                alt={card.alt || card.title || `Project ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />

              {/* Seamless Dark Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35 pointer-events-none" />

              {/* Floating Top Bar (Clean UI Engineer Layout) */}
              <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
                {/* Traffic Lights & Org Callout */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  {card.isOfficialWork && (
                    <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                      <Building2 size={13} className="text-emerald-400 shrink-0" />
                      <span className="font-bold">{card.organization || "SBA"}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/70">{card.officeLocation || "Riyadh HQ"}</span>
                    </div>
                  )}
                </div>

                {/* Right Status Badge */}
                <div>
                  {card.isOfficialWork ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>{isRTL ? "مشروع حكومي رسمي بمقر الهيئة" : "Official In-Office Project"}</span>
                    </span>
                  ) : card.isWorkMode ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>{isRTL ? "قيد العمل والتطوير" : "Work Mode"}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-bold">
                      <span>{card.badge || (isRTL ? "مباشر" : "Live")}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 flex flex-col justify-end">
                {/* Index Indicator */}
                <div className="text-[11px] font-mono text-white/50 mb-1 tracking-wider">
                  {`0${i + 1} // 0${cards.length}`}
                </div>

                {/* Project Title */}
                {card.title && (
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-white tracking-tight drop-shadow-md">
                    {card.title}
                  </h3>
                )}

                {/* Tagline */}
                {card.tagline && (
                  <p className="text-xs sm:text-sm text-primary font-mono font-medium mt-1 drop-shadow-sm truncate">
                    {card.tagline}
                  </p>
                )}

                {/* Technologies Pills */}
                {card.technologies && card.technologies.length > 0 && (
                  <div className="hidden sm:flex items-center gap-1.5 mt-2.5 flex-wrap">
                    {card.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 backdrop-blur-md text-[10px] font-mono text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Row */}
                <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {card.description && (
                    <p className="text-xs sm:text-sm text-white/75 font-light line-clamp-2 max-w-2xl leading-relaxed">
                      {card.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    {card.isOfficialWork ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span>{isRTL ? "عمل رسمي نشط بالهيئة" : "Active In-Office Project"}</span>
                      </span>
                    ) : card.live ? (
                      <a
                        href={card.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-bold hover:bg-primary/90 transition-colors shadow-xs"
                      >
                        <span>{isRTL ? "زيارة الموقع" : "Launch Live"}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick?.(card);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono font-medium backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>{isRTL ? "التفاصيل" : "Inspect"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
