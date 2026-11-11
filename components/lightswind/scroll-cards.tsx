"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Building2, MapPin, CheckCircle2 } from "lucide-react";

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
   * @default 0.7
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
  cardScale = 0.7,
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

      gsap.set(cardElements[0], { x: "0%", y: "0%", scale: 1, rotation: 0, opacity: 1 });

      // Determine initial offset based on direction
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
          end: `+=${window.innerHeight * totalCards * 0.9}`,
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
    <div className={cn("relative w-full h-[85vh] sm:h-[90vh]", className)} ref={container}>
      <div className="lightswind-scroll-cards-trigger relative flex h-[85vh] sm:h-[90vh] w-full items-center justify-center overflow-hidden p-2 sm:p-4 lg:p-6">
        <div
          className={cn(
            "relative w-[96%] sm:w-[92%] lg:w-[88%] max-w-[1200px] aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl",
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
                "absolute top-0 left-0 h-full w-full rounded-3xl overflow-hidden will-change-transform shadow-2xl border bg-[#14151a] flex flex-col justify-between cursor-pointer group transition-colors",
                card.isOfficialWork
                  ? "border-emerald-500/40 hover:border-emerald-500/70"
                  : card.isWorkMode
                  ? "border-amber-500/40 hover:border-amber-500/70"
                  : "border-white/10 hover:border-primary/40",
                imageClassName
              )}
            >
              {/* Browser HUD Header */}
              <div className="relative z-20 h-11 px-4 bg-black/65 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/60 px-3 py-0.5 rounded-md bg-white/5 truncate max-w-[320px]">
                    {card.isOfficialWork ? (
                      <>
                        <Building2 size={12} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">OFFICIAL PROJECT</span>
                        <span className="text-white/40">//</span>
                        <span>{card.organization || "SBA RIYADH"}</span>
                      </>
                    ) : card.isWorkMode ? (
                      "govt-enterprise // internal-staging"
                    ) : (
                      card.id
                    )}
                  </div>
                </div>

                <div>
                  {card.isOfficialWork ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono font-bold shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>{isRTL ? "مشروع رسمي مباشر بالهيئة" : "Official In-Office Project"}</span>
                    </span>
                  ) : card.isWorkMode ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>{isRTL ? "قيد العمل" : "Work Mode"}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold">
                      {card.badge || (isRTL ? "مباشر" : "Live")}
                    </span>
                  )}
                </div>
              </div>

              {/* Central Screenshot Image */}
              <div className="relative flex-1 w-full overflow-hidden bg-black/50">
                <img
                  src={card.image}
                  alt={card.alt || card.title || `Scroll card gallery image ${i}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-90" />

                {/* Overlay Project Title, Organization & Summary */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  {/* Official Organization Pill */}
                  {card.isOfficialWork && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300 mb-2.5 shadow-md">
                      <Building2 size={13} className="text-emerald-400" />
                      <span className="font-bold">{card.organization || "Saudi Broadcasting Authority (SBA)"}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/70 flex items-center gap-1">
                        <MapPin size={11} />
                        {card.officeLocation || (isRTL ? "الرياض" : "Riyadh HQ")}
                      </span>
                    </div>
                  )}

                  {card.title && (
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-white tracking-tight drop-shadow-md">
                      {card.title}
                    </h3>
                  )}
                  {card.tagline && (
                    <p className="text-xs sm:text-sm text-primary font-mono font-medium mt-1 drop-shadow-sm truncate">
                      {card.tagline}
                    </p>
                  )}
                  {card.description && (
                    <p className="text-xs sm:text-sm text-white/75 font-light mt-1.5 line-clamp-2 max-w-3xl">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action Strip */}
              <div className="relative z-20 px-4 py-3 bg-black/75 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
                <span className="text-white/50">
                  {`0${i + 1} / 0${cards.length}`}
                </span>

                <div className="flex items-center gap-2">
                  {card.isOfficialWork ? (
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span>{isRTL ? "مقر الهيئة بالرياض // عمل رسمي نشط" : "SBA Riyadh HQ // Active In-Office Project"}</span>
                    </span>
                  ) : card.isWorkMode ? (
                    <span className="text-[11px] text-amber-400 font-bold">
                      {isRTL ? "مشروع حكومي قيد العمل والتنفيذ" : "Govt Enterprise In Development"}
                    </span>
                  ) : card.live ? (
                    <a
                      href={card.live}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                    >
                      {isRTL ? "زيارة الموقع" : "Launch Live"}
                    </a>
                  ) : null}

                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                    {card.isOfficialWork
                      ? (isRTL ? "استعراض تفاصيل العمل الرسمي" : "Inspect Official Project")
                      : (isRTL ? "تفاصيل المعمارية" : "Inspect Specs")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
