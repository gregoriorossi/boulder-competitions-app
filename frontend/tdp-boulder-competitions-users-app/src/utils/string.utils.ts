export class StringUtils {
  static IsNullOrEmpty(str: string): boolean {
    return (typeof str === "undefined" || !str || 0 === str.length);
  }
}
