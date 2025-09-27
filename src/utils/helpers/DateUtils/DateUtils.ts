import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string="DD/MM/YYYY"): string {
        if (typeof date === "string" && moment(date, moment.ISO_8601, true).isValid()) {
            return moment(date).format(format)
        }
        return moment(date, "DD/MM/YYYY").format(format)
    }
}