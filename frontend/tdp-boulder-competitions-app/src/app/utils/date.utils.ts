import * as moment from "moment";

export class DateUtils {
  public static FormatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }
}
