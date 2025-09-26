import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string="DD/MM/YYYY"): string {
        const m = typeof date === "string"
            ? moment(date, "DD/MM/YYYY")
            : moment(date)
        return m.format(format)
    }
}