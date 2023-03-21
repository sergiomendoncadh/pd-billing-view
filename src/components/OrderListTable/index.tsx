import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,

} from '@deliveryhero/armor';
import { OrderItem } from '@modules/types.graphql';
import { useBaseApiContext } from "modules/common/context";
import styles from './OrderListTable.module.css';
import { Text } from '@components/Text';

interface IOrderListTable {
  orderList: OrderItem[];
}

export const OrderListTable: React.FC<IOrderListTable> = ({ orderList }) => {
  const baseApi = useBaseApiContext();
  const entity = baseApi.getEntityId();
  const tableHeadings = ['Entity', 'Order Code', 'Order Status'];

  return (
    <Table wide className={styles.table} marginTop={10}>
      <TableHead className={styles.tableHead}>
        <TableRow className={styles.tableHeadRow}>
          {tableHeadings.map((heading) => {
            return <TableCell key={heading} contentAlignX='center'><Text fontSize={'paragraph'} content={heading} className={styles.tableCell} /></TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {orderList && orderList.map(order => {
          return (
            <TableRow key={order.OrderCode}>
              <TableCell contentAlignX='center'>{entity}</TableCell>
              <TableCell contentAlignX='center'>{order?.OrderCode}</TableCell>
              <TableCell contentAlignX='center'>{order?.StatusCode}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
