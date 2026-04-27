"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Menu, X, Home, User, Settings, Info } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface MenuItem {
  id: number
  title: string
  url: string
  icon: React.ReactNode
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[]
  className?: string
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, title: "Home", url: "/", icon: <Home className="w-5 h-5" /> },
  { id: 2, title: "About", url: "/about", icon: <User className="w-5 h-5" /> },
  { id: 3, title: "Divisions", url: "/divisions", icon: <Settings className="w-5 h-5" /> },
  { id: 4, title: "How We Work", url: "/how-we-work", icon: <Settings className="w-5 h-5" /> },
  { id: 5, title: "Projects", url: "/projects", icon: <Settings className="w-5 h-5" /> },
  { id: 7, title: "Partner With Us", url: "/partner", icon: <Info className="w-5 h-5" /> }
]

export const Component: React.FC<ScrollNavbarProps> = ({
  menuItems = defaultMenuItems,
  className = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 100,
      end: 99999, // practically infinite
      onToggle: (self) => setIsScrolled(self.isActive)
    });
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: { type: "spring", stiffness: 300, damping: 30, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    closed: { y: 20, opacity: 0, scale: 0.8 },
    open: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } }
  }

  const hamburgerVariants: Variants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 }
  }

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${className} bg-transparent border-transparent pt-4`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div className="flex-shrink-0 z-20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/" className="text-2xl font-bold flex items-center gap-4 text-white">
                <img src="/logo.jpeg" alt="" className="h-10 max-w-[120px] object-contain rounded-md" />
                <span className="hidden xl:inline-block tracking-widest uppercase font-black text-white drop-shadow-md">AGRYEN</span>
              </a>
            </motion.div>

            <div className="hidden lg:flex flex-1 items-center justify-center px-4">
              <div className="flex items-center justify-center space-x-1 xl:space-x-4 pb-1 transition-colors bg-black/40 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={item.url}
                      className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-[11px] xl:text-xs font-black tracking-[0.2em] uppercase transition-colors whitespace-nowrap text-white/70 hover:text-primary"
                    >
                      <span className="hidden 2xl:inline-block opacity-50 scale-75">{item.icon}</span>
                      <span>{item.title}</span>
                    </a>
                    {hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 rounded-md -z-10 bg-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end flex-shrink-0 gap-4 z-20">
              <a href="/contact" className="hidden lg:flex px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-xl bg-primary hover:bg-white text-black rounded-full">
                Contact Us
              </a>
              <div className="lg:hidden">
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 rounded-md focus:outline-none text-white hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50 text-black"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center border border-white/20"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40"
              onClick={toggleMenu}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="relative bg-secondary border border-primary/30 rounded-3xl p-10 shadow-[0_0_50px_rgba(172,146,95,0.2)]">
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-6 right-6 p-2 text-white/50 hover:text-primary rounded-full hover:bg-white/5"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <div className="space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <motion.div key={item.id} variants={itemVariants} whileHover={{ scale: 1.05, x: 10 }} whileTap={{ scale: 0.95 }}>
                      <a href={item.url} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-primary/20 text-white">
                        <motion.div className="text-primary" whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                          {item.icon}
                        </motion.div>
                        <span className="text-xl font-bold uppercase tracking-widest text-white/80 group-hover:text-primary">{item.title}</span>
                      </a>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.05, x: 10 }} whileTap={{ scale: 0.95 }} className="pt-6">
                    <a href="/contact" className="flex items-center space-x-4 p-6 rounded-2xl bg-primary text-black font-black hover:bg-primary/80 transition-colors group mt-4 justify-center shadow-[0_0_20px_rgba(172,146,95,0.4)]">
                      <span className="text-xl tracking-widest uppercase">Contact Us</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
