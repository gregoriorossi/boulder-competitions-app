import * as moment from 'moment';
export class DateUtils {
  public static FormatDate(date: Date, format: string): string {
    return moment(date).utcOffset(120).format(format);
  }

  public static ParseDate(date: string, format: string): moment.Moment {
    return moment(date, format);
  }

  public static ToNoTimeZoneDate(year: number, month: number, day: number): Date {
    return new Date(Date.UTC(year, month, day));
  }
}
