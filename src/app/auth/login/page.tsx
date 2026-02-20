import LoginForm from '@/components/auth/LoginForm'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Iniciar Sesión | Inmobiliaria Rosire',
    description: 'Accede a tu cuenta en Inmobiliaria Rosire.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Image Panel */}
            <div className="hidden lg:block relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                    alt="Propiedad de lujo"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">Inmobiliaria Rosire</span>
                    </Link>
                    <p className="text-2xl font-bold leading-snug max-w-xs">
                        "Tu puerta hacia el hogar perfecto"
                    </p>
                    <p className="text-slate-300 text-sm mt-2">
                        Las mejores propiedades en República Dominicana
                    </p>
                </div>
            </div>

            {/* Right: Form Panel */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="bg-slate-900 p-2 rounded-lg">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">Inmobiliaria Rosire</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Bienvenido de vuelta</h1>
                        <p className="text-slate-500 mt-2">Inicia sesión para acceder a tu portal.</p>
                    </div>

                    <LoginForm />

                    <p className="mt-8 text-center text-xs text-slate-400">
                        Al continuar, aceptas nuestros{' '}
                        <Link href="#" className="underline hover:text-slate-600">Términos de Servicio</Link>{' '}
                        y{' '}
                        <Link href="#" className="underline hover:text-slate-600">Política de Privacidad</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}
