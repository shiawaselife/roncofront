// src/utils/dateUtils.js

/**
 * 날짜 및 시간을 포맷하는 유틸리티 함수
 * @param {Date | string | number} date - 포맷할 날짜
 * @param {string} [format='yyyy-MM-dd HH:mm:ss'] - 원하는 포맷 형식
 * @returns {string} - 포맷된 날짜 문자열
 */
export function formatDateTime(date, format = 'yyyy-MM-dd HH:mm:ss') {
  const d = new Date(date)

  const padZero = (num, size = 2) => {
    let s = String(num)
    while (s.length < size) s = '0' + s
    return s
  }

  const components = {
    'yyyy': d.getFullYear(),
    'MM': padZero(d.getMonth() + 1),
    'dd': padZero(d.getDate()),
    'HH': padZero(d.getHours()),
    'mm': padZero(d.getMinutes()),
    'ss': padZero(d.getSeconds()),
  }

  let formatted = format
  for (const key in components) {
    formatted = formatted.replace(key, components[key])
  }

  return formatted
}
