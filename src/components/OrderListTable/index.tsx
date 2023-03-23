import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tag,
  Button,
  Box
} from '@deliveryhero/armor';
import { OrderItem } from '@modules/types.graphql';
import { useBaseApiContext } from "modules/common/context";
import styles from './OrderListTable.module.css';
import { Text } from '@components/Text';
import { ArrowDownTailIcon, FilterIcon, NavigateIcon, FileCSVIcon } from '@deliveryhero/armor-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@deliveryhero/armor-motion';

interface IOrderListTable {
  orderList: OrderItem[];
  fetchNextSetOrders: () => void;
}

export const OrderListTable: React.FC<IOrderListTable> = ({ orderList, fetchNextSetOrders }) => {
  const baseApi = useBaseApiContext();
  const entity = baseApi.getEntityId();
  const tableHeadings = ['Entity', 'Order Code', 'Vendor Code', 'Order Status', 'Order Placed At', 'Order Updated At', 'Billable', 'Payload'];
  //TODO: remove when schema is updated
  const pagingKey = {};
  const hasMoreOrders = pagingKey !== null ? true : false;

  return (
    <>
      <Box className={styles.tableIcons}>
        <Button small disabled>
          <FilterIcon large />
        </Button>
        <Button small disabled>
          <NavigateIcon large />
        </Button>
        <Button small disabled>
          <FileCSVIcon large />
        </Button>
      </Box>
      <InfiniteScroll
        dataLength={orderList.length}
        next={() => {
          hasMoreOrders &&
            fetchNextSetOrders();
        }}
        loader={hasMoreOrders && <Box className={styles.spinner}><LoadingSpinner width='100px' secondary /></Box>}
        hasMore={hasMoreOrders}
      >
        <Table wide enableFixedLayout className={styles.table} marginTop={5}>
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
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={entity} /></TableCell>
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={order?.OrderCode} /></TableCell>
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={order?.VendorCode} /></TableCell>
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={order?.StatusCode || ''} /></TableCell>
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={order?.OrderPlacedAt || ''} /></TableCell>
                  <TableCell contentAlignX='center'><Text fontSize='paragraph' content={order?.OrderUpdatedAt || ''} /></TableCell>
                  {order?.IsBillable ? <TableCell contentAlignX='center'><Tag type="approved"><Text fontSize='paragraph' content='true' /></Tag></TableCell> : <TableCell contentAlignX='center'><Tag type="denied"><Text fontSize={'paragraph'} content='false' /></Tag></TableCell>}
                  <TableCell contentAlignX='center'>
                    <Button tertiary disabled>
                      <ArrowDownTailIcon medium />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </>
  );
};
