'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Search,
  Menu,
  X,
  Compass,
  GitCompare,
  Wrench,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';

const navLinks = [
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/builder', label: 'Builder', icon: Wrench },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'mr', name: 'मराठी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useAppStore();

  const currentLang = languages.find((l) => l.code === language) ?? languages[0];

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-800/50">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400 transition group-hover:bg-cyan-600/30">
            <Rocket className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              NASA 3D{' '}
              <span className="text-cyan-400">COSMOS</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-800/50 hover:text-gray-100"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <Link href="/explore">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Search className="h-4 w-4" />
            </Button>
          </Link>

          {/* Language selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangOpen(!langOpen)}
              className="text-gray-400 gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{currentLang.name}</span>
            </Button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-800 bg-gray-900/95 backdrop-blur-xl py-1 shadow-xl z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition hover:bg-gray-800/50 ${
                        language === lang.code
                          ? 'text-cyan-400'
                          : 'text-gray-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-800/50 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-gray-800/50"
                >
                  <link.icon className="h-4 w-4 text-gray-500" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
