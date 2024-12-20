"use client";
import { ITransaction } from "@/interfaces";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function TransactionsTable({ transactions }: { transactions: ITransaction[] }) {
  const router = useRouter();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_value: any, row: ITransaction) => (
        <div className="flex gap-5">
          <Button
            icon={<Edit2 size={13} />}
            onClick={() => router.push(`/transactions/edit/${row.id}`)}
            size="small"
          ></Button>
          <Button icon={<Trash2 size={13} />} size="small"></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-5">
      <Table dataSource={transactions} columns={columns} />
    </div>
  );
}

export default TransactionsTable;
