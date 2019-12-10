// import Message from "../common/Base/Message";
// import { Config } from "../config/common.config";
// import { RootStore } from "./../stores/RootStore";
class ApiService {
  // Message = Message;
  // ApiUrl = "https://192.168.101.32:30002/";
  // ApiUrl = "http://192.168.100.252:30002/";
  ApiUrl = "http://192.168.101.32:32250/";
  // DeviceServiceUrl = Config.DeviceServiceUrl;
  authorityArr: any[] = [];
  // token = "iObLoLKRyJbOtzX6pGsK2emCSYmwHilBMfdYm35LCQGFct1jRZS-77DUtu9AqwtsTuombOtUaJ8sFGGSRxMV2Ihi8iu9rLjtL7fhMr1z8wEI9zCwZDqwJnBlPurNw5p3LWTVEm6U826vIQd4_sl3POC5UdJMzj93dpAs2TqMMirkhzLzCP6_cYVCsKCk0HyAPp759DPBCd2WLxoeFoW_lrM93Sz9mXXNmzlstUvbyYqU8UcIW1hUr4LpD2ueidFGMLvQ8dZgDQ7LEoubF5fjx2GviP-0MCpvPOsV3vQzzO7EfQmHyZKESRR2oU9v-LJxSNnf8zQ6Sy5XhrBU3-CmsK03RQYwD6eOvJgnpsI4MQCCn9C9c9LTvYONcuoNbkwzY1LhvAQ_4tjHD50t7NsuCExCzqVUnDoU0CrPtENoGDLbrXBBV-RSfqL1CiPY1y33IU3TUHjRloPwGOHVALINOFLbus-oDUqzQJO73bHzSUKl3A6mlxmiypKKeJ_w1RqL63aope8fAe2a7k8vU5W6tQ"
  // token ="BQfelWZ0LtZcJGOdy9d0DpCPFBCJ6ugEhQ9F4w2m_Zg-yL-D67QTaKtUZ5CZG694I65MoeW6Gokr0gLL6d_ZZCHxbq-Yuge_HqItSsclHj43T0rvRmgE_8Nbu4dw7kzbaT7h06Ey2Bbpub6P2zm6hkzRn-uvNNwGtryh6bcIFJcv_6Hnk89wqvxaWnk-PFUvefp5ZkGYagfYLmeW4oQ0AV1Gz8TdB5TpseDrT-_whyVtuo7n7C86ILis0KvO0NIzkikPU6_7Qv01bI67JCDbsVMoq-aCuvjfT_tezC-j4SydKoxVuIvng0GwzpS4aFrYF8uaXDnB-t3vfnA5f6uMGDXiw8iB3riTzqII0rCE6-VbmwK-5Qy4LwIQhRWa8_o35joQcgh8qIJd5rc2sR7cJ_R7EmbiaXXnI_2RXprGTATFmRrC9fJMa4nw_NhOhRnl3TzrJ1IIVbcJ9SodQIocbJ_ZmsTnInPHBHkj04jjcpDthOTb6r0lfGPPHPql5w10M4DF-nGdQMbv_-widmYboQ"
  token = ''
  // "SNMTAZeUM9ZzO8kZbZMaOKtuqXW0GVH49jtYAjHKAY72tM6rycWxNOQjDNF0Xld-76dDku_5I5xIpDoZq9h92GqA6mgvYqSBlYhzbGYq8QChlwBi2a_PmKCrpREamdhcCpmx86Dt1ymzKQTLa64kgzaKcxryzuWdd-1mO5x63VWVP2nm3mUCuSBjsAXJYigmXtLMjW_L0RjIfH8KIEC5AyGSvwQTeoxyFe-QDOkK9haGYlG9wW56nJqaCIsrKHjcNihQfZ5cWXy7ocqgl4EpzODA0ynrj_nc-BPGk6BsgqR5QtYyXivWsnsCT_6Zt5C3TpyS0HH3K8LLKvUgXtvqlwG1jsIYWiHCWX1IbQbPrsJz7bC9E-czTdlrvx8emlsmX_wmnT2Wh8mgFpPN__eCH3yfnGNCKmU23qpnd7TuYUgjFJHVQWazmH-aMxvXcxibD8Ebt9rNqFRbojartbdPCEwvRdpFdhwTedVTFhBeVFCS6LuAc7djeXs6o0am-TXtp-rxSyIkycp9Pub53yplaw";
  // "d9hk-6d2jY1zWzNxMVez8dhNbn4RNiggACC3c4KgGaC9WLXE8URIIiVM-pSOPVP_u5IYOxL1jx5fVRSHx5GGuQ6sCDWQtGh23eSRIhE9KrRmFf-xVggUOi7p6VN9DpyFmeEBXwuhgNp6w8rlFwtF01V3ie7J51sY95l4TtMuK9ROFcSXwqiFH1DbEV5iqSKuO1AvNAWwLAzjc5igVlpj8fruWiGfgD734GXSc0EFEhLCqIglQbgJ827hj-WE5vt0ceHxftCTcFkinulSvVKRLY0u4WlSEamM_dHtKrP3_Ff2BuOMHP0dgMGRjQWAM_zp97jC4XfRSWD5kmghSGhMSp9y1moLpgxXKbVhEDwraQsQQ8Df8F1QT0Znccu1UM1YrX1LMx6R4xR4kXLaF9hBuCtmjVvmpAoc8iopWNJ4AALz8duP_pgV7_8LG3Y35x-aGmVAnFU9rXEWxMwbIgLw8jHBHgivPOgVPgJhzFyQJ7_O-kF4JBnWgnte5Eh8G0HQaz9-xY29usqeajvk8FgixA";
  Header = {
    Authorization: `Bearer ${this.token}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  // RootStore = new RootStore();
  subMenu: any[] = [];
  checkStatus(res: any) {
    console.log(res, "checkStatus");
    if (res.ok) {
      return true;
    } else if (res.status === 500) {
      let errors = `${res.status}, ${res.statusText}`;
      // Message.error('500');
      throw errors;
    } else if (res.status === 404) {
      let errors = `${res.status}, ${res.statusText}`;
      // Message.error(res.status);
      throw errors;
    } else if (res.status === 401) {
      // Message.warning('Login expired');
      location.href = location.origin;
    }
    // history.back();
  }
  get(url: string): any {
    return new Promise((resolve, reject) => {
      fetch(`${this.ApiUrl}${url}`, {
        headers: new Headers({
          Authorization: `Bearer ${this.FormatToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      })
        .then(res => {
          if (this.checkStatus(res)) {
            resolve(res.json());
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  post(url: string, params?: any): any {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${this.ApiUrl}${url}`, {
          method: "POST", // or 'PUT'
          body: JSON.stringify(params),
          headers: new Headers({
            Authorization: `Bearer ${this.FormatToken()}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          })
        });

        if (this.checkStatus(res)) {
          resolve(res.json());
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  GetToken(params: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${this.ApiUrl}token`, {
          method: "POST", // or 'PUT'
          body: params,
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json, text/plain, */*"
          })
        });
        if (this.checkStatus(res)) {
          const data: any = await res.json();
          this.token = data.access_token;
          // this.RootStore.userStore.token = data;
          this.SetStorage("token", data);

          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  FormatToken(): string {
    let token = this.token || this.GetStorage("token").access_token;
    return token;
  }
  getAuthority(str: string): boolean {
    return this.authorityArr.some(el => el === str);
  }

  SetStorage(param: string, value?: Object) {
    if (value !== undefined && typeof value === "object") {
      sessionStorage.setItem(param, JSON.stringify(value));
    } else if (typeof value === "string") {
      sessionStorage.setItem(param, value);
    } else {
      sessionStorage.removeItem(param);
    }
  }
  GetStorage(param: string): any {
    let str = sessionStorage.getItem(param);
    let data = {};
    if (str) {
      try {
        data = JSON.parse(str);
      } catch (error) {
        data = str;
      }
    }
    return data;
  }

  SetStoreData(store: any, ...rest: string[]) {
    rest.forEach(str => {
      this.SetStorage(str, store[str]);
    });
  }
  GetStoreData(store: any, ...rest: string[]) {
    rest.forEach(str => {
      store[str] = this.GetStorage(str);
    });
  }

  UserDetails: any = {};

  GetFingerData(fingerData: any) {
    enum fingerType {
      LeftThumbImageArray = 1,
      LeftIndexImageArray,
      LeftMiddleImageArray,
      LeftRingImageArray,
      LeftLittleImageArray,
      RightThumbImageArray,
      RightIndexImageArray,
      RightMiddleImageArray,
      RightRingImageArray,
      RightLittleImageArray
    }
    const obj: any = {};
    fingerData.forEach((el: any) => {
      obj[fingerType[el.Type]] = el.ImageBytes;
    });
    return obj;
  }
  GetFingerData2(fingerData: any) {
    enum fingerType {
      LeftThumbImageArray = 1,
      LeftIndexImageArray,
      LeftMiddleImageArray,
      LeftRingImageArray,
      LeftLittleImageArray,
      RightThumbImageArray,
      RightIndexImageArray,
      RightMiddleImageArray,
      RightRingImageArray,
      RightLittleImageArray
    }
    const arr: any[] = [];
    Object.keys(fingerData).forEach((el: any) => {
      arr.push({
        Type: fingerType[el],
        ImageBytes: fingerData[el]
      });
    });
    return arr;
  }

  debug(param: any, type: "log" | "warn" | "error" = "log") {
    if (location.hostname === "localhost") {
      console[type](param);
    }
  }
  ResetObj(obj: any) {
    if (Object.keys(obj).length > 0) {
      Object.keys(obj).forEach(e => {
        obj[e] = "";
      });
      console.log(obj, "obj>>>>>>");
    }
    return obj;
  }
}

export const api = new ApiService();
