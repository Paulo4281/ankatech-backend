export class ValueUtils {
    static currencyToCentsInt(value: string): number {
        if (!value) return 0

        const formattedValue = Number(value.replace(/\D/g, ''))

        return Math.round(formattedValue / 100)
    }

    static centsIntToCurrency(value: number): string {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value)
    }
}