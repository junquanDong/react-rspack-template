/**
 * UI相关操作
 * 只为了拆分业务逻辑和视图操作
 */

import { message } from 'antd';

class UI {
  /**
   * 错误信息Tips
   * @param {string} str - 错误信息
   * @returns {void}
   */
  static showError(str: string) {
    if (!str) {
      console.warn('UI.showError params[str] is empty');
      return
    }
    message.error(str);
  }
}

export default UI