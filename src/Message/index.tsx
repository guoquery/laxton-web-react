import React from 'react'
import ReactDOM from 'react-dom'
import { Notification } from './Notification'
// import './toast.css'

function createNotification() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const notification: any = ReactDOM.render(<Notification />, div)
  console.log(notification, 'notification>>>>>>>>>>1111111111111')
  return {
    addNotice(notice: any) {
      return notification.addNotice(notice)
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

// function c(money, b, c) {
//   return money * Math.pow((1 + b / 100), c).toFixed(4)
// }

let notification: any;
const notice = (type: string, content: string, duration = 2000, onClose: any) => {
  if (!notification) notification = createNotification()
  // console.log(notification, 'notification>>>>>>>>>>', notification.addNotice({
  //   type,
  //   content,
  //   duration,
  //   onClose
  // }))
  return notification.addNotice({
    type,
    content,
    duration,
    onClose
  })
}

export interface MessageType {
  (): void;
  then: (fill: any, reject: any) => Promise<void>;
  promise: Promise<void>;
}
export interface MessageApi {
  info(content: string, duration?: number | undefined, onClose?: any): MessageType;
  success(content: string, duration?: number | undefined, onClose?: any): MessageType;
  error(content: string, duration?: number | undefined, onClose?: any): MessageType;
  warn(content: string, duration?: number | undefined, onClose?: any): MessageType;
  warning(content: string, duration?: number | undefined, onClose?: any): MessageType;
  loading(content: string, duration?: number | undefined, onClose?: any): MessageType;
  // open(args: ArgsProps): MessageType;
  // config(options: ConfigOptions): void;
  // destroy(): void;
}
const Message: any = {
};
['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  Message[type] = (content: string, duration?: number | undefined, onClose?: any) => {
    // if (isArgsProps(content)) {
    //   return api.open({ ...content, type });
    // }

    // if (typeof duration === 'function') {
    //   onClose = duration;
    //   duration = undefined;
    // }

    return notice(type, content, duration, onClose);
  };
});
export default Message as MessageApi;

// export default {
//   info(content: string, duration?: number | undefined, onClose?: any) {
//     return notice('info', content, duration, onClose)
//   },
//   success(content = '操作成功', duration: number | undefined, onClose: any) {
//     return notice('success', content, duration, onClose)
//   },
//   error(content: string, duration: number | undefined, onClose: any) {
//     return notice('error', content, duration, onClose)
//   },
//   loading(content = '加载中...', duration = 0, onClose: any) {
//     return notice('loading', content, duration, onClose)
//   }
// }