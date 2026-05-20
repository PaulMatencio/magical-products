/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';

const ACTIVITY_TABLE = 'anonymous_user_activity';

export const anonymousActivityService = {
  async recordActivity(userId: string): Promise<void> {
    const { error } = await supabase
      .from(ACTIVITY_TABLE)
      .upsert(
        {
          user_id: userId,
          last_active_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.warn('AnonymousActivityService: Failed to record anonymous activity:', error);
    }
  },

  async cleanupInactiveUsers(): Promise<number | null> {
    const { data, error } = await supabase.rpc('cleanup_inactive_anonymous_users');

    if (error) {
      if (error.code === 'PGRST202') {
        console.info('AnonymousActivityService: Cleanup RPC is not installed yet.');
      } else {
        console.warn('AnonymousActivityService: Cleanup RPC failed:', error);
      }
      return null;
    }

    return typeof data === 'number' ? data : null;
  },
};
