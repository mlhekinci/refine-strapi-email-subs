import React from "react";
import {
  useTable,
  List,
  Table,
  DateField,
  DeleteButton,
  IResourceComponentsProps,
} from "@pankod/refine";

import { ISubscriber } from "interfaces";

export const SubscriberList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<ISubscriber>();
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="E-mail" />
        <Table.Column
          dataIndex="created_at"
          title="createdAt"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column<ISubscriber>
          title="Unsubscribe"
          dataIndex="actions"
          render={(_, record): React.ReactNode => {
            return (
              <DeleteButton size="small" recordItemId={record.id} hideText />
            );
          }}
        />
      </Table>
    </List>
  );
};


