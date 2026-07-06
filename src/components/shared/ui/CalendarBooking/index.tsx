"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/providers/LanguageProvider"

interface CalendarBookingProps {
    isDark?: boolean
}

export function CalendarBooking({ isDark = true }: CalendarBookingProps) {
    const { t } = useLanguage()
    // Colors based on theme
    const textColor = isDark ? "text-white" : "text-black"
    const textMuted = isDark ? "text-neutral-400" : "text-neutral-600"
    const borderColor = isDark ? "border-white/10" : "border-black/10"

    return (
        <div className="relative z-10 flex flex-col lg:flex-row min-h-full w-full items-start p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16">
            <div className="flex-1 flex flex-col justify-center space-y-6 w-full lg:sticky lg:top-0 lg:py-10">
                <h2 className={cn("text-3xl sm:text-4xl lg:text-5xl font-medium leading-none tracking-[-0.03em]", textColor)}>
                    {t.booking.title}
                </h2>

                <div className="space-y-4 sm:space-y-6 pt-4">
                    {[t.booking.benefit1, t.booking.benefit2].map((benefit, i) => (
                        <div key={i} className="flex gap-3 sm:gap-4">
                            <div className={cn("flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center", isDark ? "bg-white/10" : "bg-black/5")}>
                                <Check className={cn("w-5 h-5 sm:w-6 sm:h-6", textColor)} />
                            </div>
                            <div>
                                <p className={cn("text-sm sm:text-base leading-[150%]", textColor)}>
                                    {benefit}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cn("pt-6 sm:pt-8 mt-6 sm:mt-8 border-t", borderColor)}>
                    <p className={cn("text-lg sm:text-xl lg:text-2xl leading-[150%] mb-4", textColor)}>
                        &quot;{t.booking.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Placeholder for now or use a generic avatar */}
                        <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-full", isDark ? "bg-neutral-800" : "bg-neutral-200")} />
                        <div>
                            <p className={cn("text-base sm:text-lg lg:text-xl", textColor)}>
                                {t.booking.quoteAuthor}
                            </p>
                            <p className={cn("text-sm sm:text-base", textMuted)}>
                                {t.booking.quoteRole}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full h-[600px] lg:h-[700px] bg-white rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Y7jJ1ibdoAPwdrCVxFM4OWWuAAf5tRLk8q5BcnTYtchF9NydlnzUO9n1kxmVj1Fuqwvj2vXmU?gv=true"
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Google Calendar Appointment Scheduling"
                />
            </div>
        </div>
    )
}
