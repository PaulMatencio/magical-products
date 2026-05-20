import { ValueObject } from "../common/ValueObject";

interface PriceProps {
  value: number;
  currency: string;
}

export class Price extends ValueObject<PriceProps> {
  private constructor(props: PriceProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  get currency(): string {
    return this.props.currency;
  }

  public static create(value: number, currency: string = 'USD'): Price {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    return new Price({ value, currency });
  }

  public toString(): string {
    return `${this.props.currency} ${this.props.value.toFixed(2)}`;
  }
}
