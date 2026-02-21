'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X, Home, LogOut, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navbar({ user }: { user: User | null }) {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [isLoggingOut, setIsLoggingOut] = React.useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        setIsLoggingOut(false)
        router.refresh()
        router.push('/')
    }

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
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-500",
                                    isScrolled ? "text-slate-600" : "text-white"
                                )}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-70 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
                            </button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
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

            {/* Mobile Menu - CSS transition instead of framer-motion */}
            <div
                className={cn(
                    "md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out",
                    mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
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
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-600 font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    disabled={isLoggingOut}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 shadow-md disabled:opacity-70"
                                >
                                    <LogOut size={18} />
                                    {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
                                </button>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
