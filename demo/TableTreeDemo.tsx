import React, { useEffect, useState } from "react";
// import "../dist/index";
// import { Rt, Search, Message, ChamInputItem } from "../lib/index";
import "../src/assets/index";
import { Rt, Search, Message, ChamInputItem } from "../src/index";
import { api } from "./api.service";


export const TableTreeDemo = (props: any) => {
  const [showModel, setShowModel] = useState(false);
  const [tableData, setTableData] = useState();


  const dataFormat = (data: any) => {
    let arr: any[] = [];
    data.forEach((el: any) => {
      let rtData: any = {};
      let obj: any = {};
      Object.keys(el).forEach(k => {
        if (k !== "SubMenu") {
          obj[k] = el[k];
        }
      });
      rtData = obj;
      // rtData.data = obj;
      let children: any[] = [];
      if (el.SubMenu && el.SubMenu.length > 0) {
        children = dataFormat(el.SubMenu);
      }
      // console.log("obj", obj, ">>>>>>>>>>>>>>>>>");
      rtData.children = children;
      arr.push(rtData);
    });
    return arr;
  }


  const OnEdit = (row: any, str?: any, index?: any) => {
    console.log(row, 'sesessseseeeee..............')

    // const { Name, Description, Icon, Id, Order, Router } = row
    // console.log('rootStore>>>>>>>>', Name, { LabelName: Name, Description, Icon, OperationId: Id, Order, Router }, rootStore.userStore.Roles)
    // rootStore.userStore.Roles = { ... { LabelName: Name, Description, Icon, OperationId: Id, Order, Router } }
    // console.log('rootStore>>>>>>>>2222', Name, rootStore.userStore.Roles)
    // setShowModel(true)

  };
  const Modified = async () => {
    // const res = await api.post(`api/Menu/Modify`, rootStore.userStore.Roles)
    // if (res.Result) {
    //   GetList();
    //   rootStore.userStore.Roles = { ...api.ResetObj(rootStore.userStore.Roles) }
    //   setShowModel(false)
    // }

  };
  const GetList = async () => {
    const res: any = await api.get(`api/Menu/GetList`);
    if (res.Result) {
      // this.treeValue = TreeState.create(res.Data);
      const data = res.Data;
      console.log(data, dataFormat(data), 'see data')
      setTableData(dataFormat(data));
      // setTreeValue(TreeState.create(dataFormat(data)));
    }
  }
  useEffect(() => {
    GetList();
  }, [])

  const columns = [
    { title: "Label Name", dataIndex: "Name" },
    { title: "Description", dataIndex: "Description" },
    { title: "Order", dataIndex: "Order" },
    { title: "Item Name", dataIndex: "ItemName" },
    { title: "Address", dataIndex: "Router" },
    { title: "Icon", dataIndex: "Icon" },
    {
      title: "Action", buttonIcons: [
        { type: 'edit', click: (value: any) => OnEdit(value) }
      ]
    }
  ]
  const OnInputChange = (e: any) => {

    // rootStore.userStore.Roles = { ...rootStore.userStore.Roles, ...e }
    console.log(e, 'e>>>>>>>>>>>>')
  }

  return (
    <div>

      {tableData && tableData.length > 0 && <Rt
        columns={columns}
        dataSource={tableData}
        className="RTable"
        // pagination={pagination}
        // onChange={e => { }}
        onRow={(record: any, index?: number) => { }} />}

      {/* {
        showModel && <RModal onChange={(e: any) => OnMoDalChange(e)}>
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            {infoArr.map(item =>
              <ChamInput value={rootStore.userStore.Roles[item.value]} item={item} onChange={(e: any) => OnInputChange(e)}></ChamInput>
            )}
          </View>
        </RModal>
      } */}

    </div>
  );
};
