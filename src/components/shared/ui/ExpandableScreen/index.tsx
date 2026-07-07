"use client"

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type RefObject,
} from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useLenis } from "@/providers/LenisProvider"

// Context
interface ExpandableScreenContextValue {
    isExpanded: boolean
    expand: () => void
    collapse: () => void
    layoutId: string
    triggerRadius: string
    contentRadius: string
    animationDuration: number
    isDark?: boolean
    /** true entre expand() y el remontaje del trigger — para devolverle el foco */
    wasExpandedRef: RefObject<boolean>
}

const ExpandableScreenContext =
    createContext<ExpandableScreenContextValue | null>(null)

function useExpandableScreen() {
    const context = useContext(ExpandableScreenContext)
    if (!context) {
        throw new Error(
            "useExpandableScreen must be used within an ExpandableScreen"
        )
    }
    return context
}

// Root Component
interface ExpandableScreenProps {
    children: ReactNode
    defaultExpanded?: boolean
    onExpandChange?: (expanded: boolean) => void
    layoutId?: string
    triggerRadius?: string
    contentRadius?: string
    animationDuration?: number
    lockScroll?: boolean
    isDark?: boolean
}

export function ExpandableScreen({
    children,
    defaultExpanded = false,
    onExpandChange,
    layoutId = "expandable-card",
    triggerRadius = "100px",
    contentRadius = "0px",
    animationDuration = 0.5,
    lockScroll = true,
    isDark = true,
}: ExpandableScreenProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)
    const wasExpandedRef = useRef(false)

    // Sync with external state when defaultExpanded changes (controlled mode)
    useEffect(() => {
        setIsExpanded(defaultExpanded)
    }, [defaultExpanded])

    const expand = () => {
        wasExpandedRef.current = true
        setIsExpanded(true)
        onExpandChange?.(true)
    }

    const collapse = () => {
        setIsExpanded(false)
        onExpandChange?.(false)
    }

    const lenis = useLenis()

    useEffect(() => {
        if (lockScroll) {
            // overflow:hidden no basta con Lenis (sigue comiendo la rueda):
            // hay que pausar la instancia también
            if (isExpanded) {
                document.body.style.overflow = "hidden"
                lenis?.stop()
            } else {
                document.body.style.overflow = "unset"
                lenis?.start()
            }
        }

        // Handle escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isExpanded) {
                collapse()
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("keydown", handleEscape)
            if (lockScroll) {
                document.body.style.overflow = "unset"
                lenis?.start()
            }
        }
    }, [isExpanded, lockScroll, lenis])

    return (
        <ExpandableScreenContext.Provider
            value={{
                isExpanded,
                expand,
                collapse,
                layoutId,
                triggerRadius,
                contentRadius,
                animationDuration,
                isDark,
                wasExpandedRef,
            }}
        >
            {/* reducedMotion='user': con prefers-reduced-motion el morph a
                pantalla completa se reduce a un fade de opacidad */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ExpandableScreenContext.Provider>
    )
}

// Trigger Component
interface ExpandableScreenTriggerProps {
    children: ReactNode
    className?: string
}

export function ExpandableScreenTrigger({
    children,
    className = "",
}: ExpandableScreenTriggerProps) {
    const { isExpanded, expand, layoutId, triggerRadius, wasExpandedRef } =
        useExpandableScreen()
    const triggerRef = useRef<HTMLDivElement>(null)

    // El trigger se desmonta al expandir (AnimatePresence), así que al
    // colapsar el foco debe volver a su remontaje — no al nodo viejo.
    useEffect(() => {
        if (!isExpanded && wasExpandedRef.current) {
            wasExpandedRef.current = false
            triggerRef.current
                ?.querySelector<HTMLElement>("button, a, [tabindex]")
                ?.focus()
        }
    }, [isExpanded, wasExpandedRef])

    return (
        <AnimatePresence initial={false}>
            {!isExpanded && (
                <motion.div ref={triggerRef} className={`inline-block relative ${className}`}>
                    {/* Background layer with shared layoutId for morphing */}
                    <motion.div
                        style={{
                            borderRadius: triggerRadius,
                        }}
                        layout
                        layoutId={layoutId}
                        className="absolute inset-0 transform-gpu will-change-transform"
                    />
                    {/* Content layer that fades out on expand */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        layout={false}
                        onClick={expand}
                        className="relative cursor-pointer"
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Content Component - Full Screen
interface ExpandableScreenContentProps {
    children: ReactNode
    className?: string
    showCloseButton?: boolean
    closeButtonClassName?: string
    ariaLabel?: string
}

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

export function ExpandableScreenContent({
    children,
    className = "",
    showCloseButton = true,
    closeButtonClassName = "",
    ariaLabel = "Diálogo",
}: ExpandableScreenContentProps) {
    const { isExpanded, collapse, layoutId, contentRadius, animationDuration, isDark } =
        useExpandableScreen()

    const [mounted, setMounted] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Al abrir, el foco entra al diálogo (el trigger ya se desmontó y lo
    // habría dejado caer a <body>).
    useEffect(() => {
        if (!isExpanded) return
        const t = setTimeout(() => overlayRef.current?.focus(), 50)
        return () => clearTimeout(t)
    }, [isExpanded])

    // Trap de Tab: el fondo sigue en el tab order (solo hay scroll-lock),
    // así que el ciclo debe quedarse dentro del overlay.
    const trapTab = (e: React.KeyboardEvent) => {
        if (e.key !== "Tab") return
        const root = overlayRef.current
        if (!root) return
        const focusables = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (!focusables.length) {
            e.preventDefault()
            return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === root)) {
            e.preventDefault()
            last.focus()
        } else if (!e.shiftKey && active === last) {
            e.preventDefault()
            first.focus()
        }
    }

    if (!mounted) return null

    // Create portal container if it doesn't exist (though we use document.body)
    const portalContent = (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={ariaLabel}
                    tabIndex={-1}
                    onKeyDown={trapTab}
                    className="fixed inset-0 z-[9999] outline-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: animationDuration * 0.5 }}
                >
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: animationDuration }}
                        className={cn(
                            "absolute inset-0",
                            isDark ? "bg-black/90" : "bg-white/90"
                        )}
                        onClick={collapse}
                    />

                    {/* Full-screen morphing container */}
                    <motion.div
                        layoutId={layoutId}
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                            y: 100
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            scale: 0.9,
                            opacity: 0,
                            y: 50
                        }}
                        transition={{
                            duration: animationDuration,
                            ease: [0.32, 0.72, 0, 1]
                        }}
                        style={{
                            borderRadius: contentRadius,
                        }}
                        className={cn(
                            "absolute inset-0 flex flex-col overflow-hidden transform-gpu will-change-transform",
                            isDark
                                ? "bg-neutral-950"
                                : "bg-white",
                            className
                        )}
                    >
                        {/* Content wrapper with fade-in */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: animationDuration * 0.3, duration: animationDuration * 0.7 }}
                            className="relative z-20 flex flex-col h-full w-full overflow-y-auto overscroll-y-contain"
                        >
                            {children}
                        </motion.div>

                        {/* Close button */}
                        {showCloseButton && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: animationDuration * 0.5, duration: 0.2 }}
                                onClick={collapse}
                                className={cn(
                                    "fixed right-6 top-6 sm:right-8 sm:top-8 z-[100] flex h-12 w-12 items-center justify-center transition-all rounded-full hover:scale-110 active:scale-95 shadow-lg",
                                    closeButtonClassName ||
                                    "text-white bg-neutral-900 hover:bg-neutral-800 border border-white/20"
                                )}
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    // @ts-ignore - createPortal types can be tricky with specific React versions
    return createPortal(portalContent, document.body)
}

export { useExpandableScreen }
