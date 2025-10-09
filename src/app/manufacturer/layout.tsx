"use client"

import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ManufacturerLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true) // Desktopda doim ochiq
      } else {
        setIsSidebarOpen(false) // Mobilda dastlab yopiq
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.classList.remove("overflow-hidden") // Cleanup on unmount
    }
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev
      // Vibration effekti (agar qurilma qo‘llab-quvvatlasa)
      if (newState && "vibrate" in navigator) {
        navigator.vibrate(50) // 50ms vibration
      }
      return newState
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-10">
        {isMobile && (
          <motion.div
            animate={{ rotate: isSidebarOpen ? 90 : 0, scale: isSidebarOpen ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 right-4 z-50"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSidebarOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: isSidebarOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isSidebarOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6 text-primary" />
                  ) : (
                    <Menu className="h-6 w-6 text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        )}
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}