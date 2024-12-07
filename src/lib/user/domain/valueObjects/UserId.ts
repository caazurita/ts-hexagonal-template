export class UserId {
  private readonly id: number;
  constructor(id: number) {
    this.id = id;
  }

  // Getter
  getValue(): number {
    return this.id;
  }

  // Método para verificar si el ID es válido
  isValid(): boolean {
    return typeof this.id === "string" || typeof this.id === "number";
  }

  // Método para obtener una representación en string
  toString(): string {
    return this.id.toString();
  }

  // Método para comparar con otro ID
  equals(id: UserId): boolean {
    return this.id === id.getValue();
  }
}
