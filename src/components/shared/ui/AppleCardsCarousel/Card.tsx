"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CardProps } from "./AppleCardsCarousel.types";

export function Card({ card, index, layout = false }: CardProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    // Hide/show navbar elements to prevent z-index overlap
    const navbarElements = document.querySelectorAll<HTMLElement>('[data-navbar]');

    if (open) {
      document.body.style.overflow = "hidden";
      (window as any).__lenis?.stop();
      navbarElements.forEach(el => el.style.display = 'none');
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
      (window as any).__lenis?.start();
      navbarElements.forEach(el => el.style.display = '');
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Restore navbar on cleanup
      navbarElements.forEach(el => el.style.display = '');
    };
  }, [open, handleClose]);

  useOutsideClick(containerRef, handleClose);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] overflow-auto py-10 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg fixed inset-0 z-[100]"
            />

            {/* Expanded Card Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 z-[101] p-4 md:p-10 rounded-3xl font-sans relative"
            >
              {/* Close Button */}
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center z-[70]"
                onClick={handleClose}
              >
                <X className="h-5 w-5 text-white dark:text-black" />
              </button>

              {/* Category */}
              <p className="text-base font-medium text-black dark:text-white mt-4">
                {card.category}
              </p>

              {/* Title */}
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 dark:text-white mt-4"
              >
                {card.title}
              </motion.p>

              {/* Content */}
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed Card */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p className="text-white text-sm md:text-base font-medium font-sans text-left">
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
}

function BlurImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? '/logo-khannda.png' : src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 224px, 384px"
      className={`${className} object-cover transition duration-300 ${
        loaded ? "blur-none" : "blur-md"
      }`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setError(true);
        setLoaded(true);
      }}
    />
  );
}
