'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            router.push('/dashboard')
            router.refresh()
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
            // Friendly Spanish messages
            if (message.includes('Invalid login')) {
                setError('Correo o contraseña incorrectos.')
            } else if (message.includes('Email not confirmed')) {
                setError('Debes confirmar tu correo antes de iniciar sesión.')
            } else {
                setError(message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100 animate-in fade-in duration-200">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="login-email">
                    Correo Electrónico
                </label>
                <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                    placeholder="nombre@ejemplo.com"
                />
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700" htmlFor="login-password">
                        Contraseña
                    </label>
                    <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-700">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <div className="relative">
                    <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none pr-10"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Iniciando sesión...</span>
                    </>
                ) : (
                    <span>Iniciar Sesión</span>
                )}
            </button>

            <p className="text-center text-sm text-gray-500">
                ¿No tienes cuenta?{' '}
                <Link href="/auth/register" className="text-blue-600 font-medium hover:text-blue-700">
                    Regístrate gratis
                </Link>
            </p>
        </form>
    )
}
