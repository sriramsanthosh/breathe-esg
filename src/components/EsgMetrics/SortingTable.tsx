import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  key: React.Key;
  month: string;
  status: string;
  completion: number;
  businessUnit: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'MONTH',
    dataIndex: 'month',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.month.length - b.month.length,
    sortDirections: ['descend'],
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend'],
    render: (text: string) => <span>{text[0] === "I" ? <span className='orange-box button-box'>{text}</span> : text[0] === "P" ? <span className='pink-box button-box'>{text}</span> : <span className='green-box button-box'>{text}</span>}</span>,
  },
  {
    title: 'COMPLETION %',
    dataIndex: 'completion',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.completion - b.completion,
    sortDirections: ['descend'],
  },
  {
    title: 'BUSSINESS UNIT',
    dataIndex: 'businessUnit',
    filters: [
      {
        text: 'Bussiness Unit 1',
        value: 'Bussiness Unit 1',
      },
      {
        text: 'Bussiness Unit 2',
        value: 'Bussiness Unit 2',
      },
    ],
    onFilter: (value, record) => record.businessUnit.indexOf(value as string) === 0,
  },
];

const data = [
  {
    key: '1',
    month: 'Jan 2023',
    status: "PENDING APPROVAL (1/12)",
    completion: 20,
    businessUnit: 'Bussiness Unit 1',
  },
  {
    key: '2',
    month: 'Feb 2023',
    status: "APPROVED (2/12)",
    completion: 30,
    businessUnit: 'Bussiness Unit 1',
  },
  {
    key: '3',
    month: 'Mar 2023',
    status: "INCOMPLETE (4/12)",
    completion: 50,
    businessUnit: 'Bussiness Unit 1',
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const SortingTable: React.FC = () => (
  <Table style={{ margin: '10px 5px ' }}
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{ target: 'sorter-icon' }}
  />
);

export default SortingTable;