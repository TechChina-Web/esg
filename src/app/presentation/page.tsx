"use client"

import { useEffect, useState } from "react"
import { GlobePolaroids } from "@/components/ui/globe-polaroids"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

// Define an empty array outside the component to keep the reference stable
// This prevents the GlobePolaroids component's useEffect from re-running and resetting the globe on every state update.
const emptyMarkers: any[] = []

export default function PresentationPage() {
  const [step, setStep] = useState(0)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const sentences = [
    [
      { text: "Starting with", type: "normal" },
      { text: "trade union services,", type: "highlight" },
      { text: "canteens,", type: "highlight" },
      { text: "buildings,", type: "highlight" },
      { text: "and office supplies.", type: "highlight" }
    ],
    [
      { text: "Better data,", type: "highlight2" },
      { text: "supplier segmentation,", type: "highlight2" },
      { text: "low-carbon procurement,", type: "highlight2" },
      { text: "supplier support,", type: "highlight2" },
      { text: "circular practices,", type: "highlight2" },
      { text: "and category projects.", type: "highlight2" }
    ]
  ]

  const maxSteps = sentences.length

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault()
        setStep((s) => Math.min(s + 1, maxSteps))
      } else if (e.code === "ArrowLeft") {
        e.preventDefault()
        setStep((s) => Math.max(s - 1, 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [maxSteps])

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans">
      
      {/* Background Globe */}
      <div className={`
        absolute top-0 bottom-0 right-0 flex items-center justify-center pointer-events-none z-0
        transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center
        w-full lg:w-[50%]
        ${step > 0 
          ? 'opacity-40 dark:opacity-30 scale-[0.8] lg:scale-[0.85] translate-x-[10%] lg:translate-x-[20%]' 
          : 'opacity-90 dark:opacity-80 scale-110 lg:scale-[1.25] translate-x-0 lg:translate-x-[5%]'
        }
      `}>
        {/* Subtle edge blending mask */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20 dark:to-[#0a0a0a]/20 pointer-events-none" />
        <GlobePolaroids markers={emptyMarkers} className="w-[800px] lg:w-[1000px] max-w-none flex-shrink-0 relative z-10" speed={0.002} dark={isDark ? 1 : 0} />
      </div>

      {/* Content Container */}
      <div className="w-full lg:w-[65%] xl:w-[60%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 min-h-screen py-20 lg:py-0">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-400 dark:from-zinc-100 dark:to-zinc-600">
            SNZA
          </h1>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mt-6 rounded-full" />
        </motion.div>

        {/* Text Content */}
        <div className="font-medium leading-[1.6] tracking-tight flex flex-col gap-12">
          <AnimatePresence mode="popLayout">
            {sentences.map((sentence, index) => {
              if (index >= step) return null

              const isPast = index < step - 1

              return (
                <motion.div 
                  key={index}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                    }
                  }}
                  className={`
                    transition-all duration-700 ease-in-out block
                    ${isPast ? 'text-2xl md:text-3xl opacity-30' : 'text-4xl md:text-5xl lg:text-6xl leading-[1.5]'}
                  `}
                >
                  {sentence.map((phrase, pIdx) => {
                    const isHighlight = phrase.type === "highlight"
                    const isHighlight2 = phrase.type === "highlight2"
                    
                    const colorClass = isHighlight ? 'text-red-600 dark:text-red-500 font-semibold' : 
                                       isHighlight2 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 
                                       'text-zinc-500 dark:text-zinc-400'

                    const words = phrase.text.split(" ")

                    return words.map((word, wIdx) => {
                      const isLastWordInPhrase = wIdx === words.length - 1
                      const isLastPhrase = pIdx === sentence.length - 1
                      
                      return (
                        <span key={`${pIdx}-${wIdx}`}>
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, filter: "blur(8px)", y: 5 },
                              visible: { 
                                opacity: 1, 
                                filter: "blur(0px)", 
                                y: 0, 
                                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                              }
                            }}
                            className={`inline-block transition-colors duration-500 ${colorClass}`}
                          >
                            {word}
                          </motion.span>
                          {(!isLastWordInPhrase || !isLastPhrase) && " "}
                        </span>
                      )
                    })
                  })}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        
      </div>

    </div>
  )
}
