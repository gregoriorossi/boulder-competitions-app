import * as moment from "moment";

export class DateUtils {
  public static FormatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  public static ToNoTimeZoneDate(year: number, month: number, day: number): Date {
    return new Date(Date.UTC(year, month, day));
  }
}
