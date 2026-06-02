/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../../services/supabase';
import { IOwnerRepository } from '../../domain/repositories/IOwnerRepository';

export class SupabaseOwnerRepository implements IOwnerRepository {
  async checkIsOwner(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error || !data) return false;

    return data.role === 'business_owner' || data.role === 'admin'; // Admin can also access owner dashboard
  }
}

export const supabaseOwnerRepository = new SupabaseOwnerRepository();
