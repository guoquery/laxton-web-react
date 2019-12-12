import React, { Component } from "react";
import { faCheckCircle, faExclamationCircle, faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";




//hock 用法 ReactDOM.render 会返回null 无法获取到实例，需要使用其他逻辑实现，暂时利用class 组件完成功能

// export const Notification1 = (props: any) => {
//   const anyArr: any[] = [];
//   const [notices, setNotices] = useState(anyArr)
//   const [transitionTime, setTransitionTime] = useState(300)
//   const getNoticeKey = () => {
//     // const { notices } = this.state;
//     return `notice-${new Date().getTime()}-${notices.length}`;
//   }

//   const addNotice = (notice: { key: string; duration: number; }) => {
//     notice.key = getNoticeKey();
//     const noticesArr: any[] = notices;
//     noticesArr.push(notice);//展示所有的提示
//     // notices[0] = notice; //仅展示最后一个提示
//     setNotices(noticesArr)
//     if (notice.duration > 0) {
//       setTimeout(() => {
//         removeNotice(notice.key);
//       }, notice.duration);
//     }
//     return () => {
//       removeNotice(notice.key);
//     };
//   }

//   const removeNotice = (key: string) => {
//     setNotices(notices.filter((notice: { key: string; onClose: any; }) => {
//       if (notice.key === key) {
//         if (notice.onClose) setTimeout(notice.onClose, transitionTime);
//         return false;
//       }
//       return true;
//     })
//     );
//   }
//   const icons: any = {
//     info: "toast_info",
//     success: "toast_success",
//     error: "toast_error",
//     loading: "toast_loading"
//   };
//   return (
//     <View style={styles.toast}>
//       {notices.map((notice: { key: string | number | undefined; type: React.ReactText; content: React.ReactNode; }) => (
//         <View key={notice.key}>
//           <View style={styles.toastBox}>
//             <FontAwesomeIcon icon={faCog} size={20} color={"green"} />
//             <Text> {notice.content}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

// }

const type = ['success', 'info', 'warning', 'error', 'loading'];
const icons: any = {
  'success': {
    icon: faCheckCircle,
    color: 'green',
  },
  'info': {
    icon: faExclamationCircle,
    color: 'blue',
  },
  'warning': {
    icon: faExclamationCircle,
    color: 'orange',
  },
  'error': {
    icon: faTimesCircle,
    color: 'red',
  },
  'loading': {
    icon: faSpinner,
    color: 'green',
  },
};

export class Notification extends Component<any, any> {
  transitionTime: number;
  constructor(props: any) {
    super(props);
    this.transitionTime = 300;
    this.state = {
      notices: []
    };
    this.removeNotice = this.removeNotice.bind(this);
  }

  getNoticeKey() {
    const { notices } = this.state;
    return `notice-${new Date().getTime()}-${notices.length}`;
  }

  addNotice(notice: { key: string; duration: number; }) {
    const { notices } = this.state;
    notice.key = this.getNoticeKey();

    notices.push(notice);//展示所有的提示
    // notices[0] = notice; //仅展示最后一个提示

    this.setState({
      notices
    });
    if (notice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key);
      }, notice.duration);
    }
    return () => {
      this.removeNotice(notice.key);
    };
  }

  removeNotice(key: string) {
    const { notices } = this.state;
    this.setState({
      notices: notices.filter((notice: { key: string; onClose: any; }) => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime);
          return false;
        }
        return true;
      })
    });
  }

  render() {
    const { notices } = this.state;
    const prefixCls = 'laxton'
    // console.log(notices, "notices>>>>>>>>>")
    // const classes = classNames(prefixCls, {
    //   [`${prefixCls}-${type}`]: type,
    //   // [`${prefixCls}-${shape}`]: shape,
    //   [`${prefixCls}-${sizeCls}`]: sizeCls,
    //   // [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    //   // [`${prefixCls}-loading`]: !!loading,
    //   // [`${prefixCls}-background-ghost`]: ghost,
    //   // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    //   // [`${prefixCls}-block`]: block,
    // });
    // const icons: any = {
    //   info: "toast_info",
    //   success: "toast_success",
    //   error: "toast_error",
    //   loading: "toast_loading"
    // };
    return (
      <div className={`${prefixCls}-message`}>
        {notices.map((notice: { key: string | number | undefined; type: string; content: React.ReactNode; }) => (
          <div key={notice.key} className={`${prefixCls}-message-notice`} >
            <div className={`${prefixCls}-message-notice-content`}>
              <FontAwesomeIcon icon={icons[notice.type].icon} size={'lg'} color={icons[notice.type].color} />
              <span> {notice.content}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

// const styles = {
//   toast: {
//     width: "100%",
//     position: "absolute",
//     left: 0,
//     top: 0,
//     zIndex: 999,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 30,
//   },
//   toastBox: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 10,
//   },
// };
