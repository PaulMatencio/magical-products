import { ValueObject } from "../common/ValueObject";

interface PhoneProps {
  value: string;
}

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(phone: string): Phone {
    // Basic phone validation (at least 7 digits)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Invalid phone number format");
    }
    return new Phone({ value: phone.replace(/\s/g, '') });
  }
}
