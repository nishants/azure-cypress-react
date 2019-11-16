import { message } from 'antd';

const DEFAULT_NOTIFICATION_DURATION = 1;
const ERROR_NOTIFICATION_DURATION = 5;

export const notifyError = (
  value = 'Error !',
  duration = ERROR_NOTIFICATION_DURATION
) => message.error(value, duration);
export const notifyInfo = (value, duration = DEFAULT_NOTIFICATION_DURATION) =>
  message.info(value, duration);
export const notifySuccess = (
  value = 'Success !',
  duration = DEFAULT_NOTIFICATION_DURATION
) => message.success(value, duration);
