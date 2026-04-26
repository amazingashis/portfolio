"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      <Link href="/" className="text-white font-bold text-xl tracking-tighter">
        AA.
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
        {isHome ? (
          <>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
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

      {/* Mobile Navigation (Simplified) */}
      <div className="md:hidden flex items-center gap-4 text-sm font-medium">
        {!isHome && <Link href="/" className="text-gray-300 hover:text-white">Home</Link>}
        <Link 
          href="/contact" 
          className="bg-white text-black px-3 py-1.5 rounded-full font-semibold hover:bg-gray-200"
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}
