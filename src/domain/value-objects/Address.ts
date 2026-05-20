import { ValueObject } from "../common/ValueObject";

interface AddressProps {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  get street(): string { return this.props.street; }
  get city(): string { return this.props.city; }
  get postalCode(): string { return this.props.postalCode; }
  get country(): string { return this.props.country; }

  public static create(street: string, city: string, postalCode: string, country: string = 'USA'): Address {
    if (!street || !city || !postalCode) {
      throw new Error("Address must have a street, city, and postal code");
    }
    return new Address({ street, city, postalCode, country });
  }

  public toString(): string {
    return `${this.props.street}, ${this.props.city}, ${this.props.postalCode}, ${this.props.country}`;
  }
}
