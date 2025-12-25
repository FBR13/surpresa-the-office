import { supabase } from '../lib/supabase';
import type { WeddingInfo } from '../types'; 

export const weddingService = {
  async getDate(): Promise<WeddingInfo> {
    const { data, error } = await supabase.from('wedding_info').select('*').eq('id', 1).single();
    if (error) throw error;
    return data;
  },
  async updateDate(newDate: string): Promise<void> {
    const { error } = await supabase.from('wedding_info').update({ wedding_date: newDate }).eq('id', 1);
    if (error) throw error;
  }
};