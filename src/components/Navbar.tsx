"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/10"
    >
      <Link
        href="/"
        onClick={close}
        className="text-white font-bold text-xl tracking-tighter"
      >
        AA.
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
        {isHome ? (
          <>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <a href="#publications" className="hover:text-white transition-colors">Publications</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
          </>
        ) : (
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
        )}
        <Link
          href="/contact"
          className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Contact Me
        </Link>
      </div>

      {/* Mobile: hamburger toggle */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden text-white p-1 -mr-1"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 flex flex-col px-6 py-5 gap-4 text-lg font-medium text-gray-200"
          >
            {isHome ? (
              <>
                <a href="#experience" onClick={close} className="hover:text-white transition-colors">Experience</a>
                <Link href="/projects" onClick={close} className="hover:text-white transition-colors">Projects</Link>
                <a href="#publications" onClick={close} className="hover:text-white transition-colors">Publications</a>
                <a href="#achievements" onClick={close} className="hover:text-white transition-colors">Achievements</a>
                <a href="#certifications" onClick={close} className="hover:text-white transition-colors">Certifications</a>
              </>
            ) : (
              <Link href="/" onClick={close} className="hover:text-white transition-colors">Home</Link>
            )}
            <Link
              href="/contact"
              onClick={close}
              className="mt-1 bg-white text-black px-4 py-2.5 rounded-full font-semibold text-center hover:bg-gray-200 transition-colors"
            >
              Contact Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
