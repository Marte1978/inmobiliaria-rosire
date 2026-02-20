import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Home, Users, MessageSquare, TrendingUp, Bell, Calendar, ArrowRight, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getPropertiesCount } from '@/features/properties/services/properties.service'

export const metadata = {
    title: 'Dashboard | Inmobiliaria Rosire',
}

export const dynamic = 'force-dynamic'

async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
}

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/auth/login')

    const propertiesCount = await getPropertiesCount()

    const stats = [
        { label: 'Propiedades Activas', value: String(propertiesCount), icon: Home, color: 'bg-blue-500', trend: 'En catálogo' },
        { label: 'Leads Recibidos', value: '—', icon: Users, color: 'bg-violet-500', trend: '' },
        { label: 'Mensajes Pendientes', value: '—', icon: MessageSquare, color: 'bg-amber-500', trend: '' },
        { label: 'Visitas Programadas', value: '—', icon: Calendar, color: 'bg-emerald-500', trend: 'Próximas 7 días' },
    ]


    const recentLeads = [
        { name: 'María González', interest: 'Apto. 3 hab en Piantini', date: 'Hace 2 horas', status: 'Nuevo' },
        { name: 'Carlos Méndez', interest: 'Villa en Cap Cana', date: 'Hace 5 horas', status: 'En proceso' },
        { name: 'Ana Rodríguez', interest: 'Local Comercial Santo Domingo', date: 'Ayer', status: 'Calificado' },
        { name: 'Luis Perez', interest: 'Terreno en La Romana', date: 'Ayer', status: 'Nuevo' },
    ]

    const statusColors: Record<string, string> = {
        'Nuevo': 'bg-blue-100 text-blue-700',
        'En proceso': 'bg-amber-100 text-amber-700',
        'Calificado': 'bg-green-100 text-green-700',
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Bar */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2 rounded-lg">
                        <Home className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-lg hidden sm:inline">Portal del Agente</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-medium text-slate-900 max-w-[160px] truncate">{user.email}</p>
                            <p className="text-xs text-slate-400">Agente</p>
                        </div>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            title="Cerrar sesión"
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut size={18} />
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-10 max-w-7xl">
                {/* Welcome */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">
                        ¡Buenos días! 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Aquí tienes el resumen de tu actividad hoy.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`${stat.color} p-3 rounded-xl`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                {stat.trend && (
                                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                        <TrendingUp size={11} /> {stat.trend}
                                    </span>
                                )}
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Leads */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 flex justify-between items-center border-b border-slate-100">
                            <h2 className="font-bold text-slate-900">Leads Recientes</h2>
                            <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                Ver todos <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {recentLeads.map((lead) => (
                                <div key={lead.name} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-800 text-sm">{lead.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{lead.interest}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>
                                            {lead.status}
                                        </span>
                                        <p className="text-xs text-slate-400 mt-1">{lead.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="font-bold text-slate-900 mb-5">Accesos Rápidos</h2>
                        <div className="space-y-3">
                            {[
                                { label: 'Ver Propiedades', href: '/propiedades', icon: Home },
                                { label: 'Ver Agentes', href: '/agentes', icon: Users },
                                { label: 'Contacto & Leads', href: '/contacto', icon: MessageSquare },
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium text-slate-700 group"
                                >
                                    <item.icon size={18} className="text-slate-400 group-hover:text-blue-500" />
                                    {item.label}
                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-blue-600 text-white">
                            <p className="font-semibold text-sm">Chat IA Activo</p>
                            <p className="text-xs text-blue-200 mt-1">Tu asistente virtual está listo para atender clientes 24/7.</p>
                            <div className="mt-3 flex items-center gap-2 text-xs">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Conectado al webhook n8n
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
