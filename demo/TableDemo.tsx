import React, { useEffect, useState } from "react";
// import "../dist/index";
// import { Rt, Search, Message, ChamInputItem } from "../lib/index";
import "../src/assets/index";
import { Rt, Search, Message, ChamInputItem,ChamPopup } from "../src/index";
import { api } from "./api.service";


export const TableDemo = (props: any) => {
  let dataType: any[] = [];
  const [data, setData] = useState(dataType);
  const [visible, setVisible] = useState(false);
  const [loadMoreType, setLoadMoreType] = useState('replace');
  const [ClassStet, setClassStet] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10
  });
  const [q, setQ] = useState({
    CurrentPage: 1,
    Filters: { Name: null },
    PageSize: 10
  });
  const Action = (action: string, data: any) => {
    console.log(action, "edit", data.Id);
    switch (action) {
      case "delete":
        // api.post(`api/User/Deactive?userId=${data.record.Id}`).then((res: any) => {
        //   if (res.Result) {
        //     api.post(`api/User/GetPageListWithPostion`, q).then((res: any) => {
        //       setData(res.Data.Items);
        //       Message.success('DELETE SUCCESSFULLY.');
        //     });
        //   }
        // });
        break;
      case "edit":
          // showModal();
          // console.log(visible);
          setVisible(true);
          console.log(visible);
        // props.navigation.navigate("UserDetailScreen", { id: data.record.Id });
        // console.log(action, "edit", data.record.Id);
        break;
    }
  };
  useEffect(()=>{
    console.log(visible,222222)
  },[visible])
  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setClassStet(true)
    console.log('我是onClose回调');
  }

  const confirm = () => {
    setVisible(false);
    setClassStet(true)
      console.log('我是confirm回调');
  }
  const columns = [
    {
      title: "Role Name",
      dataIndex: "Name",
      width: 100,
      sorter: true
    },
    {
      title: "Description",
      dataIndex: "Description",
      width: 100,
      sorter: true
    },
    {
      title: "Action",
      buttonIcons: [
        {
          type: 'edit',
          // popTitle: this.api.translate('toolTips.delete?'),
          click: (item: any) => { Action('edit', item) },
          // iif: (item) => (item.ElectionStatus === 1 && this.api.canView('Function_Elections_Elections_Delete')),
        },
        {
          type: 'delete',
          click: (item: any) => { Action('delete', item) },
          // popTitle: this.api.translate('toolTips.delete?'),
          // click: (item: any) => { this.listPage.deleteList(item); },
          // iif: (item) => (item.ElectionStatus === 1 && this.api.canView('Function_Elections_Elections_Delete')),
        },
      ]
    }
  ];
  const customColumn = [
    {
      dataIndex: "Name",
      title: "Role Name",
      checked: true,
    },
    {
      dataIndex: "Description",
      title: "Description",
      checked: true
    },
    {
      title: "Action",
      checked: true
    }
  ];
  const getPageList = async (action: "concat" | "replace" = "replace") => {
    console.log("qqqqq>>>>>>>>>", q.CurrentPage);
    const res = await api.post(`api/Role/GetPageList`, q);
    if (res.Result) {
      Message.success('test1111')
      Message.error('test1111')
      Message.warning('test1111')
      const Data = res.Data.Items;
      if (action === "replace") {
        setData(Data);
      } else {
        setData([...data, ...Data]);
      }
      setPagination({ total: res.Data.TotalRecord, pageSize: q.PageSize, current: q.CurrentPage });
    }
  };
  useEffect(() => {
    getPageList((loadMoreType as ('concat' | 'replace')));
    return () => { };
  }, [q]);

  const OnTableChange = (e: any) => {
    console.log(e, "e>>>>>>>>>", q.CurrentPage);
    const CurrentPage = e.data.page;
    switch (e.type) {
      case 'pagination':
        setQ({
          CurrentPage,
          Filters: q.Filters,
          PageSize: e.data.pageSize
        });
        break;
      case 'scroll':
        setLoadMoreType('concat')
        setQ({
          CurrentPage,
          Filters: q.Filters,
          PageSize: e.data.pageSize
        });
        break;
    }

  };
  // const OnRow = (record: any, index?: number) => {
  //   console.log(record, index, "demo....");
  //   // return {
  //   //   onClick: event:any => {}, // 点击行
  //   //   onDoubleClick: event => {},
  //   //   onContextMenu: event => {},
  //   //   onMouseEnter: event => {}, // 鼠标移入行
  //   //   onMouseLeave: event => {}
  //   // };
  // };
  const OnChange = (e: any) => {
    switch (e.type) {
      case 'reset':
        // setLoadMoreType('replace')
        break;
      case 'search':

        break;
    }
    setLoadMoreType('replace')
    setQ({ ...q, ...{ CurrentPage: 1, Filters: e.data } })
  }

  const searchConfig: ChamInputItem[] = [
    {
      label: "First Name",
      value: "FirstName"
    },
    {
      label: "Province",
      value: "Province",
      type: "dropDown",
      typeCode: "Province",
      linkage: 0
    },
    {
      label: "District",
      type: "dropDown",
      value: "District",
      linkage: "Province"
    },
    {
      label: "Constituency",
      type: "dropDown",
      value: "Constituency",
      linkage: "District"
    },
    {
      label: "Polling Station",
      type: "dropDown",
      value: "PollingStation",
      linkage: "Constituency"
    },
    {
      label: "Residential Address",
      type: "textArea",
      value: "ResidentialAddress"
    },
    {
      label: "Postal Address",
      type: "textArea",
      value: "PostalAddress"
    }
  ]

  return (
    <div
      style={{ height: "100%", overflowY: "scroll" }}
      data-testid="scrollMain"
    >
      {/* <RTable columns={columns}
        data={data}
        className="RTable"></RTable> */}
      <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api}></Search>

      <ChamPopup
        title='Basic Modal'
        onOk={confirm}
        onCancel={closeModal}
        okText='Determine'
        cancelText='Cancel'
        width='40%'
        mask={true}
        visible={visible} >
           <p>Some contents...</p>
           <p>Some contents...</p>
           <p>Some contents...</p>
      </ChamPopup>

      <Rt
        columns={columns}
        dataSource={data}
        className="RTable"
        pagination={pagination}
        // paginationType={"common"}
        paginationType='common'
        onChange={(e: any) => OnTableChange(e)}
        // onRow={(record: any, index?: number) => OnRow(record, index)}
        customColumn={customColumn}
      ></Rt>
    </div>
  );
};
