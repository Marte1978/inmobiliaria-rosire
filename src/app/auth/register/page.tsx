import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'
import { Home } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group mb-6">
                        <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Home className="text-white w-5 h-5" />
                        </div>
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                        Únete a Inmobiliaria Rosire
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Crea tu cuenta para guardar propiedades favoritas y recibir alertas.
                    </p>
                </div>

                <RegisterForm />

                <div className="mt-8 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
