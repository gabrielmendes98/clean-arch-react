export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  toString() {
    if (typeof this.value !== 'object' || this.value === null) {
      return String(this.value);
    }

    const valueStr = String(this.value);
    return valueStr === '[object Object]'
      ? JSON.stringify(this.value)
      : valueStr;
  }
}
