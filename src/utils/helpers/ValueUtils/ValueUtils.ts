export class ValueUtils {
    static currencyToCentsInt(value: string): number {
        if (!value) return 0

        const cleaned = value.replace(/[^\d,.-]/g, '')

        const normalized = cleaned.replace(',', '.')

        const floatValue = parseFloat(normalized)

        if (isNaN(floatValue)) return 0

        return Math.round(floatValue * 100)
    }

    static centsIntToCurrency(value: number): string {
        return (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}