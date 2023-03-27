import React from 'react';
import {
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    Tag,
    Typography,
} from '@deliveryhero/armor';

import { OrderItem } from '@modules/types.graphql';
import styles from './OrderList.module.css';
import { EmptyCartIllustration } from '@deliveryhero/armor-illustrations';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IOrderLisProps {
    orderList: OrderItem[] | null;
    isOrderListEmpty: boolean;
}

const OrderList: React.FC<IOrderLisProps> = ({ orderList, isOrderListEmpty }) => {
    return (
        <div className={styles.orderListSection}>
            <InfiniteScroll
                dataLength={10}
                next={() => { }}
                loader={<></>}
                hasMore={false}
            >
                {!isOrderListEmpty && <Table width={"100%"} marginTop={5} stickyHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Entity</TableCell>
                            <TableCell>Order Code</TableCell>
                            <TableCell>Vendor Code</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Billable</TableCell>
                            <TableCell>Order Placed At</TableCell>
                            <TableCell>Payload</TableCell>
                        </TableRow>
                    </TableHead>
                    {orderList && orderList.length > 0 &&
                        <TableBody>
                            {orderList.map(order => {
                                return (
                                    <TableRow>
                                        <TableCell>{order?.entityId}</TableCell>
                                        <TableCell>{order?.orderCode}</TableCell>
                                        <TableCell>{order?.vendorCode}</TableCell>
                                        <TableCell>{order?.status}</TableCell>
                                        <TableCell>
                                            {order?.isBillable
                                                ? <Tag type={'approved'}>{order?.isBillable.toString()}</Tag>
                                                : <Tag type={'denied'}>{order?.isBillable ? order.isBillable.toString() : 'false'}</Tag>
                                            }
                                        </TableCell>
                                        <TableCell>{order?.orderPlacedAt}</TableCell>
                                        <TableCell>{'TBD'}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>}
                </Table>}
            </InfiniteScroll>
            
            {/* for empty order list */}

            {isOrderListEmpty && <div className={styles.emptyOrderList}>
                <EmptyCartIllustration width='200px' />
                <Typography paragraph large>No orders to show</Typography>
                <Typography paragraph>Change your filters or check if the order code is correct</Typography>
            </div>}
        </div>
    );
}

export default OrderList;
