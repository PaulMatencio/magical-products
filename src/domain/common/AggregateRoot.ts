import { Entity } from "./Entity";
import { IDomainEvent } from "./DomainEvents";

/**
 * Base class for Aggregate Roots.
 * An Aggregate Root is the only entry point to an aggregate of objects.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
