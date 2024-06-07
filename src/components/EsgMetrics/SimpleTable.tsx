import React, { useState } from 'react';
import { Divider, Table, Space, Button, message } from 'antd';
import { ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

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

const columns: TableColumnsType<DataType> = [
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
  {
    title: 'ACTIONS',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<ShareAltOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const data: DataType[] = [
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
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const SimpleTable: React.FC = () => {
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  
  return (
    <div>
      <Divider />
      <div style={{ overflowX: 'auto' }}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default SimpleTable;
