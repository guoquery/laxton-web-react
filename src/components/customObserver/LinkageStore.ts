import { observable, computed } from "mobx";

class LinkageStore {
  constructor() {

  }
  @observable Province: any = null;
  @observable District: any = null;
  @observable Constituency: any = null;
  [keyName: string]: any;
}
export const linkStore = new LinkageStore()