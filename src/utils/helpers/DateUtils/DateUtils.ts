import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string="DD/MM/YYYY"): string {
        if (typeof date === "string" && moment(date, moment.ISO_8601, true).isValid()) {
            return moment(date).format(format)
        }
        return moment(date, "DD/MM/YYYY").format(format)
    }

    static formatToUTC(date: Date): Date {
        return moment(date).utc().startOf("day").add(12, "hours").toDate()
    }

    static monthsInYearForMovement(year: number, startDate: Date | string, endDate?: Date | string): number {
        const start = new Date(startDate)
        const end = endDate ? new Date(endDate) : start

        // Se o movimento começa depois do ano ou termina antes do ano, não tem meses
        if (start.getFullYear() > year || end.getFullYear() < year) return 0

        // Primeiro mês do movimento no ano
        const monthStart = start.getFullYear() === year ? start.getMonth() : 0
        // Último mês do movimento no ano
        const monthEnd = end.getFullYear() === year ? end.getMonth() : 11

        // +1 porque os meses são zero-indexados
        return monthEnd - monthStart + 1
    }

    static getYear(date: Date): number {
        const utcFormatted = this.formatToUTC(date)
        return utcFormatted.getFullYear()
    }

    static getClosestYear(year: number, availableYears: number[]): number {
        return availableYears.reduce((prev, curr) =>
            Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
        )
    }

    static howMuchTimeFromXInPeriod(dateStart: Date, dateEnd: Date, period: "monthly" | "yearly"): number {
        const now = dateStart

        const yearDiff = dateEnd.getFullYear() - now.getFullYear()
        const monthDiff = dateEnd.getMonth() - now.getMonth()

        const totalPeriod = yearDiff * 12 + monthDiff

        if (period === "yearly") {
            return Math.floor(totalPeriod / 12)
        }

        return totalPeriod
    }
}