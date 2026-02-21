'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProperty } from '../services/properties.service'
import { Loader2, Plus, X, Upload, Home, DollarSign, MapPin, Ruler, Bed, Bath, Sparkles, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PropertyForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        price_label: '',
        type: 'Venta' as 'Venta' | 'Alquiler',
        location: '',
        beds: 0,
        baths: 0,
        area: '',
        image_url: '',
        featured: false,
        agent_name: '',
        agent_phone: '',
        agent_email: '',
        agent_photo_url: '',
        amenities: [] as string[]
    })

    const [newAmenity, setNewAmenity] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const val = type === 'number' ? Number(value) : value
        setFormData(prev => ({ ...prev, [name]: val }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }

    const addAmenity = () => {
        if (newAmenity && !formData.amenities.includes(newAmenity)) {
            setFormData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity] }))
            setNewAmenity('')
        }
    }

    const removeAmenity = (amenity: string) => {
        setFormData(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Basic validation
        if (!formData.title || !formData.location || !formData.price) {
            setError('Por favor completa los campos obligatorios.')
            setLoading(false)
            return
        }

        try {
            const { error: submitError } = await createProperty(formData)
            if (submitError) throw new Error(submitError)

            setSuccess(true)
            setTimeout(() => {
                router.push('/propiedades')
                router.refresh()
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Error al guardar la propiedad')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-blue-50 max-w-2xl mx-auto mt-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600 w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Propiedad Publicada!</h2>
                <p className="text-slate-500 mb-8 text-lg">
                    La propiedad ha sido guardada correctamente y ya es visible en el catálogo.
                </p>
                <p className="text-sm text-blue-600 font-medium">Redirigiendo al catálogo...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 pb-20 max-w-5xl mx-auto">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-4 duration-300">
                    <X size={20} className="shrink-0" />
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {/* Información Principal */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <Home className="text-blue-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Detalles Básicos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Título de la Propiedad *</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                            placeholder="Ej: Villa de Lujo frente al mar en Punta Cana"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Tipo de Contrato *</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
                        >
                            <option value="Venta">Venta</option>
                            <option value="Alquiler">Alquiler</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Ubicación *</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                placeholder="Ciudad, Sector"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Precio (en números) *</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                placeholder="850000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Etiqueta de Precio (Texto)</label>
                        <input
                            name="price_label"
                            value={formData.price_label}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                            placeholder="Ej: $850,000 o $1,500/mes"
                        />
                    </div>
                </div>
            </div>

            {/* Especificaciones */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                    <div className="bg-violet-100 p-2 rounded-lg">
                        <Ruler className="text-violet-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Características de la Propiedad</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Habitaciones</label>
                        <div className="relative">
                            <Bed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                name="beds"
                                type="number"
                                value={formData.beds}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Baños</label>
                        <div className="relative">
                            <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                name="baths"
                                type="number"
                                step="0.5"
                                value={formData.baths}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Área (m² / ft²)</label>
                        <input
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 transition-all outline-none"
                            placeholder="Ej: 350 m²"
                        />
                    </div>

                    <div className="md:col-span-4 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Descripción Detallada</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                            placeholder="Describe las ventajas de la propiedad, vistas, acabados..."
                        />
                    </div>
                </div>
            </div>

            {/* Multimedia */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                    <div className="bg-amber-100 p-2 rounded-lg">
                        <Upload className="text-amber-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Multimedia</h2>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700">URL de Imagen Principal</label>
                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                        placeholder="https://images.unsplash.com/..."
                    />
                    <p className="text-xs text-slate-400 italic">Por ahora, pega una URL de Unsplash u otro servicio de imágenes.</p>
                </div>
            </div>

            {/* Amenidades */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                        <Sparkles className="text-emerald-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Amenidades y Extras</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-3">
                        <input
                            value={newAmenity}
                            onChange={(e) => setNewAmenity(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none"
                            placeholder="Ej: Piscina, Seguridad 24/7, Gimnasio..."
                        />
                        <button
                            type="button"
                            onClick={addAmenity}
                            className="px-6 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity) => (
                            <span key={amenity} className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100 animate-in zoom-in duration-200">
                                {amenity}
                                <button type="button" onClick={() => removeAmenity(amenity)} className="text-blue-400 hover:text-blue-600 transition-colors">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                        {formData.amenities.length === 0 && (
                            <p className="text-sm text-slate-400 italic">Aún no has agregado amenidades.</p>
                        )}
                    </div>

                    <hr className="border-slate-50" />

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Marcar como Destacada</span>
                    </label>
                </div>
            </div>

            {/* Agente Asignado */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                    <div className="bg-slate-100 p-2 rounded-lg">
                        <Sparkles className="text-slate-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Agente Responsable</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Nombre del Agente</label>
                        <input
                            name="agent_name"
                            value={formData.agent_name}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Teléfono de contacto</label>
                        <input
                            name="agent_phone"
                            value={formData.agent_phone}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                            placeholder="+1 (809)..."
                        />
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-10">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/25 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 min-w-[200px]"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Publicando...
                        </>
                    ) : (
                        <>
                            Publicar Propiedad
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
