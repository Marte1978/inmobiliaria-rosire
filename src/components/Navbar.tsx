'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, User, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Propiedades', href: '/propiedades' },
        { name: 'Agentes', href: '/agentes' },
        { name: 'Nosotros', href: '/nosotros' },
        { name: 'Contacto', href: '/contacto' },
    ]

    return (
        <nav
            className={cn(
                'fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-gray-200 py-3 shadow-sm'
                    : 'bg-transparent py-5 text-white'
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-slate-900 p-2 rounded-lg group-hover:bg-slate-800 transition-colors">
                        <Home className="text-white w-6 h-6" />
                    </div>
                    <span className={cn(
                        "text-xl font-bold tracking-tight transition-colors",
                        isScrolled ? "text-slate-900" : "text-white"
                    )}>
                        Inmobiliaria Rosire
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-blue-500",
                                isScrolled ? "text-slate-600" : "text-slate-200 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/auth/login"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-blue-500",
                            isScrolled ? "text-slate-600" : "text-white"
                        )}
                    >
                        Iniciar Sesión
                    </Link>
                    <Link
                        href="/auth/register"
                        className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                    >
                        Registrarse
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className={isScrolled ? "text-slate-900" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-slate-900" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-slate-600 font-medium hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-gray-100" />
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/auth/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-2.5 text-slate-600 font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/auth/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full text-center py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-md"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
