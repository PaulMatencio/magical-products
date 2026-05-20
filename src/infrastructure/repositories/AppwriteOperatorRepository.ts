/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../../services/supabase';
import { IOperatorRepository } from '../../domain/repositories/IOperatorRepository';

export class AppwriteOperatorRepository implements IOperatorRepository {
  async checkIsOperator(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      return data?.role === 'operator' || data?.role === 'admin';
    } catch (e) {
      return false;
    }
  }
}

export const appwriteOperatorRepository = new AppwriteOperatorRepository();
