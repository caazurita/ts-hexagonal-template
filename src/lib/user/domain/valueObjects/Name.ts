export class Name {

    private readonly name: string
    constructor(name: string) {
        this.name = name
    }

    getValue(): string {
        return this.name
    }
}