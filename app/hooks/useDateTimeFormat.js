import { DEFAUL_LANGUAGE } from '../constants/locale';


export default function useDateTimeFormat(timestamp) {
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return '';
  }
  const date = new Date(timestamp);
  const language = DEFAUL_LANGUAGE;

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  return new Intl.DateTimeFormat(language, options).format(date);
}