import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Space, Table } from 'antd';
import { ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  typeText: string;
  suppliers: number;
  score: number;
  risk: string;
  status: boolean;
  result: boolean;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const TempTable: React.FC = () => {

  // Table data
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '1',
      name: 'Assessment 1',
      typeText:'BRSR',
      suppliers:20,
      score:0,
      risk:"Medium",
      status:false,
      result:false,
    },
    {
      key: '2',
      name: 'Assessment 2',
      typeText:'BRSR',
      suppliers:25,
      score:98,
      risk:"Low",
      status:true,
      result:true,
    },
    
    {
      key: '3',
      name: 'Assessment 3',
      typeText:'BRSR',
      suppliers:35,
      score:22,
      risk:"High",
      status:true,
      result:true,
    },
    {
      key: '4',
      name: 'Assessment 3',
      typeText:'Custom',
      suppliers:49,
      score:23,
      risk:"Medium",
      status:true,
      result:true,
    },
    {
      key: '5',
      name: 'Assessment 3',
      typeText:'Custom',
      suppliers:100,
      score:42,
      risk:"Medium",
      status:true,
      result:true,
    },
  ]);

  const [count, setCount] = useState(2);


  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  // Table Heading
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ASSESSMENT TITLE',
      dataIndex: 'name',
      // render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'TYPE',
      dataIndex: 'typeText',
    },
    {
      title: 'NO. OF SUPPLIERS',
      dataIndex: 'suppliers',
    },
    {
      title: 'SCORE',
      dataIndex: 'score',
    },
    {
      title: 'RISK CLASSIFICATION',
      dataIndex: 'risk',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (status: boolean) => <b>{status?<a style={{color:'#2E9844',padding:"5px",borderRadius:"4px",  background:"#2E984433"}}>COMPLETE</a>:<a style={{color:'#F04F6D',padding:"5px",borderRadius:"4px",  background:"#F04F6D33"}}>PENDING</a>}</b>,
    },
    {
      title: 'RESULT',
      dataIndex: 'result',
      render: (result: boolean) => <b>{result?<a style={{color:'#4FA556'}}>View</a>:"-"}</b>,
    },
    // {
    //   title: 'ACTIONS',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button icon={<ShareAltOutlined />} />
    //       <Button icon={<DeleteOutlined />} />
    //     </Space>
    //   ),
    // },
  ];

  // Add data fucntion
  const handleAdd = () => {
    const newData: DataType = {
      key: '5',
      name: 'Assessment 3',
      typeText:'Custom',
      suppliers:100,
      score:42,
      risk:"Medium",
      status:true,
      result:true,
    }
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default TempTable;