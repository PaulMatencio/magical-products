import { IEventRepository, StoredEvent } from "../../../domain/repositories/IEventRepository";
import { IDomainEvent } from "../../../domain/common/DomainEvents";
import { supabase } from "../../../services/supabase";



export class SupabaseEventRepository implements IEventRepository {
  async save(event: IDomainEvent): Promise<void> {
    const { error } = await supabase
      .from('domain_events')
      .insert({
        type: event.constructor.name,
        payload: JSON.parse(JSON.stringify(event)),
        occurred_at: event.dateTimeOccurred || new Date()
      });

    if (error) {
      console.error("[SupabaseOutbox] ❌ Failed to persist event:", error);
      throw error;
    }
  }

  async getUnprocessed(): Promise<StoredEvent[]> {
    const { data, error } = await supabase
      .from('domain_events')
      .select('*')
      .is('processed_at', null)
      .order('occurred_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(row => ({
      id: row.id,
      type: row.type,
      payload: row.payload,
      occurredAt: new Date(row.occurred_at),
      processedAt: row.processed_at ? new Date(row.processed_at) : undefined
    }));
  }

  async markAsProcessed(eventId: string): Promise<void> {
    const { error } = await supabase
      .from('domain_events')
      .update({ processed_at: new Date() })
      .eq('id', eventId);

    if (error) throw error;
  }
}
