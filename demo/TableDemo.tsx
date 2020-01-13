import React, { useEffect, useState } from "react";
//@ts-ignore
import { Modal as SOModal } from 'shineout';
// import "../dist/index";
// import { Rt, Search, Message, ChamInputType, Modal, ChamItem, Button, Dropdown, Spin } from "../lib/index";
import "../src/assets/index";
import { Rt, Search, Message, ChamInputType, Modal, ChamItem, Button, Dropdown, Spin, TextArea, Image, ChamInput, Input } from "../src/index";
import { api } from "./api.service";
import { faAngleDown, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FingerLogin } from "../src/components";

export const TableDemo = (props: any) => {

  const [data, setData] = useState([] as any[]);
  const [visible, setVisible] = useState(false);
  const [loadMoreType, setLoadMoreType] = useState('replace');
  const [ClassStet, setClassStet] = useState(true);
  const [chamItemValues, setChamItemValues] = useState({ EmploymentDate: "1900-01-01", Position: 20 });
  const [chamItemValues2, setChamItemValues2] = useState({});
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
  // const customColumn = [
  //   {
  //     title: "Full name",
  //     dataIndex: "FullName",
  //     checked: true,
  //   },
  //   {
  //     title: "Position",
  //     dataIndex: "PositionName",
  //     checked: true,

  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "StatusName",
  //     checked: true,
  //   },
  //   {
  //     title: "Delimitation Area Of Operation",
  //     dataIndex: "DelimitationArea",
  //     checked: true,
  //   },
  //   {
  //     title: "E-Mail Address",
  //     dataIndex: "Email",
  //     width: '300',
  //     checked: true,
  //   },
  //   {
  //     title: "Action",
  //     checked: true,
  //   }

  // ]
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
      formatCode: 'tel'
      // type: "dropDown",
      // typeCode: "Position"
    },
    // {
    //   label: "Employment Date",
    //   value: "EmploymentDate",
    //   require: true,
    //   type: "datePicker"
    // },
    {
      label: "Date of Revocation",
      value: "DateOfRevocation",
      birthDate: '1/1/1990',
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
      renderItem: '我是{ElectionName1},你好{ElectionTypeName},time:{ElectionDate}',
      renderResult: 'hello{ElectionName1},你好{ElectionTypeName},time:{ElectionDate}',
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
    // {
    //   label: "Polling Station",
    //   type: "dropDown",
    //   value: "PollingStation",
    //   linkage: "Constituency"
    // },
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
    optionValue: "AreaId",
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
    console.log('OnChamItemChange', e)

    setChamItemValues({ ...chamItemValues, ...e })
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

  const item = searchConfig[0]

  const showCaseNewUserConfig = [
    {
      label: 'Email',
      value: 'Email',
      require: true,
      pattern: '^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$',
    },
    {
      label: "User Name",
      value: "UserName",
      // require: true
    },
    {
      label: "Password",
      value: "Password",
      inputType: "password",
      require: true
    },
    {
      label: "Confirm Password",
      // label: 'National Registration Number',
      value: "ComfirmPassword",
      inputType: "password",
      require: true
    },
    {
      label: "User Role",
      type: "dropDown",
      value: "RoleId",
      apiUrl: "api/Role/GetPageList"
    }
  ]

  const onModalChange = (e: any) => {
    console.log(e, 'onModalChange')
    switch (e.type) {
      case 'ok':
        confirm()

        break;
      case 'cancel':
        closeModal();
        break;
    }
  }

  const onValidateChange = (e: any) => {
    console.log(e, 'onValidateChange')
    setDisabled(!e)
  }

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
      <FingerLogin></FingerLogin>
      <Image href={true} ></Image>
      <Image width={200} height={125} src={'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/fc7c5cc595e12203796678eedd9c4250.jpg?w=2452&h=920'} />
      <Button shape="circle" type='primary' loading />
      <Button icon={faAngleDown} shape="circle" type='primary' />
      <Button type='primary' disabled={true}>Disabled</Button>
      <Dropdown data={DropdownList} placeholder="Dropdown" type='primary'></Dropdown>
      <TextArea onChange={(e: any) => OnChange(e)}></TextArea>
      <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api} gutter={20} width={1 / 3} filters={q.Filters}></Search>
      <Button type='primary' disabled={disabled}>Disabled</Button>
      <Dropdown data={DropdownList} placeholder="Dropdown" outline={false} type='primary'>11111</Dropdown>
      <Spin loading={loading}>
        {/* <ChamItem chamItemConfig={searchConfig} onChange={OnChamItemChange} values={chamItemValues} api={api} onValidateChange={(e: any) => setDisabled(!e)}></ChamItem> */}
        {/* <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api} gutter={20} width={1 / 3} filters={q.Filters}></Search> */}
      </Spin>
      {/* <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig} api={api} gutter={20} width={1 / 3} filters={q.Filters}></Search> */}


      {/* <SOModal
        visible={visible}
        width={500}
        title="Modal Title"
        onClose={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
         </Button>,
          <Button key="ok" type="primary" onClick={confirm}>
            Ok
         </Button>,
        ]}
      >
        <ChamItem chamItemConfig={searchConfig} onChange={OnChamItemChange} values={chamItemValues} api={api} onValidateChange={(e: any) => setDisabled(!e)}></ChamItem>
      </SOModal> */}
      <Modal
        // title='Basic Modal'
        prefixCls='laxton'
        footer={null}
        onOk={confirm}
        onCancel={closeModal}
        onChange={(e: any) => onModalChange(e)}
        okDisabled={disabled}
        visible={visible} >

        {/* <Input
          // className={validateFields === false ? 'has-error' : ''}
          type={item.inputType}
          id={`txt${item.value}`}
          maxLength={item.maxLength}
          disabled={props.disabled}
          // autoCompleteType={"off"
          placeholder={"Enter Here"}
          onChange={OnChamItemChange}
          value={chamItemValues.Position}
          formatCode={item.formatCode}
        /> */}
        {/* <ChamInput
          item={searchConfig[0]}
          value={chamItemValues.Position}
          values={chamItemValues}
          onChange={OnChamItemChange}
          layOut={props.layOut}
          api={props.api}
        ></ChamInput> */}
        <ChamItem chamItemConfig={showCaseNewUserConfig} onChange={OnChamItemChange} values={chamItemValues} api={api} onValidateChange={(e: any) => onValidateChange(e)} width={1 / 2}></ChamItem>

      </Modal>

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
