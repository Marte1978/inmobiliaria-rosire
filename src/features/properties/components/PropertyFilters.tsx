'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

export function PropertyFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const updateFilter = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            router.push(`/propiedades?${params.toString()}`)
        },
        [router, searchParams]
    )

    return (
        <section className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm flex-1 min-w-[200px]">
                    <Search size={16} className="text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar por ciudad o zona..."
                        defaultValue={searchParams.get('search') ?? ''}
                        onChange={(e) => {
                            // Debounce simple: update on blur or Enter
                            const val = e.target.value
                            if (!val) updateFilter('search', '')
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                updateFilter('search', (e.target as HTMLInputElement).value)
                            }
                        }}
                        onBlur={(e) => updateFilter('search', e.target.value)}
                        className="bg-transparent outline-none text-slate-700 w-full placeholder:text-gray-400"
                    />
                </div>

                {/* Type filter */}
                <select
                    defaultValue={searchParams.get('type') ?? ''}
                    onChange={(e) => updateFilter('type', e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Tipo</option>
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                </select>

                {/* Price filter */}
                <select
                    defaultValue={searchParams.get('priceRange') ?? ''}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Precio</option>
                    <option value="0-100000">Hasta $100,000</option>
                    <option value="100000-300000">$100k – $300k</option>
                    <option value="300000+">+$300,000</option>
                </select>

                <button
                    onClick={() => router.push('/propiedades')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                    <SlidersHorizontal size={16} />
                    Limpiar
                </button>
            </div>
        </section>
    )
}
