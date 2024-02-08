export default class Colors {
  constructor() {}
  /**
   *
   * @param color
   * @param alpha
   */
  hex2Rgba(color: string, alpha?: number) {
    // 去掉#号
    let hex = color.replace('#', '');
    // 把hex值分解为R、G、B的部分
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}