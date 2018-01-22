export interface ProgramOption {
    option: string
    description?: string
    validate?: RegExp
    default?: string | number
}

export abstract class Program {

    public abstract command: string

    public options: ProgramOption[] = []

    public abstract run(...args: any[])

}
