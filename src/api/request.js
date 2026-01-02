// 统一的请求配置
const defaultOptions = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * 统一的请求方法
 * @param {string} url - 请求地址
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
export async function request(url, options = {}) {
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const error = new Error(`HTTP错误: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    console.error('API请求异常:', err);
    throw err;
  }
}