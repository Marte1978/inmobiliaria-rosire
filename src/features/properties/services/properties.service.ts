'use server'

import { createClient } from '@/utils/supabase/server'
import type { Property, PropertyFilters } from '../types'

export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
    const supabase = await createClient()

    let query = supabase
        .from('properties')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })

    if (filters?.type) {
        query = query.eq('type', filters.type)
    }

    if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
    }

    if (filters?.priceRange) {
        if (filters.priceRange === '0-100000') {
            query = query.lte('price', 100000)
        } else if (filters.priceRange === '100000-300000') {
            query = query.gte('price', 100000).lte('price', 300000)
        } else if (filters.priceRange === '300000+') {
            query = query.gte('price', 300000)
        }
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching properties:', error.message)
        return []
    }

    return (data as Property[]) ?? []
}

export async function getPropertyById(id: string): Promise<Property | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching property:', error.message)
        return null
    }

    return data as Property
}

export async function getPropertiesCount(): Promise<number> {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

    if (error) return 0
    return count ?? 0
}
