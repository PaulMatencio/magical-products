/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../../services/supabase';
import { IOperatorRepository } from '../../domain/repositories/IOperatorRepository';

export class SupabaseOperatorRepository implements IOperatorRepository {
  async checkIsOperator(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error || !data) return false;

    return data.role === 'operator' || data.role === 'admin'; // Admin can also be operator
  }
}

export const supabaseOperatorRepository = new SupabaseOperatorRepository();
