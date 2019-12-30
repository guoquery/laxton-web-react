import React, { useEffect, useState } from "react";
// import "../dist/index";
// import { Rt, Search, Message, ChamInputType, Modal, ChamItem, Button, Dropdown, Spin } from "../lib/index";
import "../src/assets/index";
import { Rt, Search, Message, ChamInputType, Modal, ChamItem, Button, Dropdown, Spin } from "../src/index";
import { api } from "./api.service";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


export const TableDemo = (props: any) => {
  let dataType: any[] = [];
  const [data, setData] = useState(dataType);
  const [visible, setVisible] = useState(false);
  const [loadMoreType, setLoadMoreType] = useState('replace');
  const [ClassStet, setClassStet] = useState(true);
  const [chamItemValues, setChamItemValues] = useState({ EmploymentDate: "1900-01-01" });
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10
  });
  const [q, setQ] = useState({
    CurrentPage: 1,
    Filters: { TestNumber: '123456' },
    // Filters: {FirstName:'77777'},
    PageSize: 10
  });
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(true)
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
        showModal();
        // console.log(visible);
        // setVisible(true);
        console.log(visible);
        // props.navigation.navigate("UserDetailScreen", { id: data.record.Id });
        // console.log(action, "edit", data.record.Id);
        break;
    }
  };
  useEffect(() => {
    console.log(visible, 222222)
  }, [visible])
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
    // console.log("qqqqq>>>>>>>>>", q.CurrentPage);
    const res = await api.post(`api/Role/GetPageList`, q);
    if (res.Result) {
      // setChamItemValues({ Status: 1 })
      Message.success('test1111')
      Message.error('test1111')
      Message.warning('test1111')
      const Data = res.Data.Items;
      if (action === "replace") {
        setData(Data);
      } else {
        setData([...data, ...Data]);
      }
      setLoading(false)
      setPagination({ total: res.Data.TotalRecord, pageSize: q.PageSize, current: q.CurrentPage });
    }
  };
  useEffect(() => {
    console.log('q>>L>>>>>>', q)
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
  const OnChange = (e: any) => {
    switch (e.type) {
      case 'reset':
        break;
      case 'search':

        break;
    }
    setLoadMoreType('replace')
    setQ({ ...q, ...{ CurrentPage: 1, Filters: { ...q.Filters, ...e.data } } })
  }

  const searchConfig: ChamInputType[] = [
    {
      label: "Position",
      value: "Position",
      require: true,
      // type: "dropDown",
      // typeCode: "Position"
    },
    {
      label: "Employment Date",
      value: "EmploymentDate",
      require: true,
      type: "datePicker"
    },
    {
      label: "Date of Revocation",
      value: "DateOfRevocation",
      require: true,
      type: "datePicker"
    },
    {
      label: "Status",
      value: "Status",
      type: "dropDown",
      typeCode: "Status",
      require: true,
      optionValue: "Id"
    },
    {
      label: "First Name",
      value: "FirstName",
      require: true,
      pattern: '[A-Za-z]{3}',
      // disabled: true,
      // iif: () => true
      // error: 'The input is not valid Name'
    },
    {
      label: "Last Name",
      value: "LastName",
      // require: true,
      type: 'datePicker',
      minDate: '1/1/1980',
      maxDate: '1/1/1990',
      // dateType: 'year',
      // disabled: true,
      error: 'The input is not valid Name'
    },
    // {
    //   label: "test Name",
    //   value: "TestName",
    //   require: true,
    //   // error: 'The input is not valid Name'
    // },
    // {
    //   label: 'Email',
    //   value: "Email",
    //   require: true,
    //   pattern: '^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$',
    //   // error: 'The input is not valid E-mail!'
    // },
    // {
    //   label: "Province",
    //   value: "Province",
    //   type: "dropDown",
    //   typeCode: "Province",
    //   renderItem: 'Name',
    //   optionValue: 'AreaId',
    //   linkage: 0,
    //   // disabled: true,
    //   placeholder: 'Enter to Search Here',
    //   searchAble: true,
    // },
    // {
    //   label: "District",
    //   type: "dropDown",
    //   value: "District",
    //   linkage: "Province"
    // },
    // {
    //   label: "Constituency",
    //   type: "dropDown",
    //   value: "Constituency",
    //   linkage: "District"
    // },
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
    // {
    //   label: "Postal Address",
    //   type: 'datePicker',
    //   value: "PostalAddress"
    // },
    {
      label: "Residential Address",
      type: "text",
      value: "ResidentialAddress"
    },
  ]
  const userAddress: ChamInputType[] = [{
    label: "Province",
    value: "Province",
    type: "dropDown",
    typeCode: "Province",
    linkage: 0,
    optionValue: "AreaId",
    useFormat: false,
  },
  {
    label: "District",
    type: "dropDown",
    value: "District",
    linkage: "Province",
    optionValue: "AreaId",
    useFormat: false,
  },
  {
    label: "Constituency",
    type: "dropDown",
    value: "Constituency",
    linkage: "District",
    optionValue: "AreaId"
  },
  {
    label: "Polling Station",
    type: "dropDown",
    value: "PollingStation",
    linkage: "Constituency",
    optionValue: "AreaId"
  }]

  const customizeFooter = () => {
    return (
      <div>
        一个皮皮虾
      </div>
    )
  }
  const OnChamItemChange = (e: any) => {
    // console.log('OnChamItemChange', e)
  }
  const DropdownList = [
    {
      content: 'Submenu',
      children: [
        {
          content: 'Link to Google',
          target: '_blank',
          url: 'https://google.com',
        },
        {
          content: 'Disabled',
          disabled: true,
        },
      ],
    },
    <a href="/">Home</a>,
    {
      content: 'Message',
      onClick: () => {
        Message.info('Some message.')
      },
    },
  ]

  return (
    <div
      style={{ height: "100%", overflowY: "scroll" }}
      data-testid="scrollMain"
    >
      <div style={{ display: 'flex', }}>
        <Spin name="ring" />
        <Spin name="plane" />
        <Spin name="pulse" />
        <Spin />
      </div>

      <Button shape="circle" type='primary' loading />
      <Button icon={faAngleDown} shape="circle" type='primary' />
      <Button type='primary' disabled={disabled}>Disabled</Button>
      <Dropdown data={DropdownList} placeholder="Dropdown" outline={false} type='primary'>11111</Dropdown>
      <Spin loading={loading}>
        {/* <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api} gutter={20} width={1 / 3} filters={q.Filters}></Search> */}
      </Spin>
      {/* <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api} gutter={20} width={1 / 3} filters={q.Filters}></Search> */}

      <Modal
        title='Basic Modal'
        prefixCls='laxton'
        // footer={null}
        onOk={confirm}
        onCancel={closeModal}
        okText='Determine'
        cancelText='Cancel'
        visible={visible} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <ChamItem chamItemConfig={searchConfig} onChange={OnChamItemChange} values={chamItemValues} api={api} onValidateChange={(e: any) => setDisabled(!e)}></ChamItem>

      <Rt
        columns={columns}
        dataSource={data}
        className="RTable"
        pagination={pagination}
        // paginationType={"common"}
        // paginationType='common'
        onChange={(e: any) => OnTableChange(e)}
        // onRow={(record: any, index?: number) => OnRow(record, index)}
        customColumn={customColumn}
      ></Rt>
    </div>
  );
};
