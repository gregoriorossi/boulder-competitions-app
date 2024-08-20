export class ColorsUtils {
  public static GetCssByColor = (colorRGB: string): string => {

    const color = colorRGB.toLowerCase();

    switch (color) {
      case '#fff':
        return 'problem-white';
      case '#00f':
        return 'problem-blue';
      case '#0f0':
        return 'problem-green';
      case '#ff0':
        return 'problem-yellow';
      case '#f00':
        return 'problem-red';
      case '#000':
        return 'problem-black';
      default:
        console.warn(`No css class found for color "${colorRGB}"`);
        return '';
    }
  }
}
