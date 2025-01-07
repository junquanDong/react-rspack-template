import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';
import UI from '@/utils/ui';
import Env from '@/_env';

/**
 * handle http status
 * 
 * @param {number} status - http status
 * @returns {boolean} - whether continue
 */
function handleHttpStatus(status: number): void {
  switch (status) {
    case 404:
      UI.showError('请求404~');
      break;
    default:
      UI.showError('请求异常~');
      break;
  }
}

/**
 * Handles the response code from an HTTP request.
 *
 * @param {number} code - The response code received from the server.
 * @param {string} message - The message associated with the response code.
 * @returns {boolean} - Returns true if the response code is 0, otherwise false.
 */
function handleResponseCode(code: number, message: string): boolean {
  switch (code) {
    case 0:
      return true;
    default:
      UI.showError(message || '请求异常~');
      return false;
  }
}

const Alova = (baseURL = Env.baseURL) => 
  createAlova({
    baseURL,
    requestAdapter: adapterFetch(),
    statesHook: reactHook,
    beforeRequest: request => {
      // 配置请求头参数
      // request.config.headers.token = '123'
    },
    responded: {
      async onSuccess(response, method) {
        try {
          const data = await response.json()
          if (!handleResponseCode(data.code, data.msg)) {
            return undefined;
          }
          return data
        } catch (e) {
          handleHttpStatus(response.status)
          return undefined;
        }
      },
      onError(error, method) {
        console.error('Alova onError')
        console.error(error, method)
        UI.showError(error.message)
      }
    }
  });

export default Alova

