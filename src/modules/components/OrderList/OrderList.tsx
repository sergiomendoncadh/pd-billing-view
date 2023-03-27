import React from 'react';
import {
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    Tag,
    Typography,
    Box,
    TableAction,
    Tooltip,
} from '@deliveryhero/armor';

import { OrderItem, PagingKey } from '@modules/types.graphql';
import styles from './OrderList.module.css';
import { EmptyCartIllustration } from '@deliveryhero/armor-illustrations';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@deliveryhero/armor-motion';
import { ExternalLinkIcon, FileCommonTextIcon } from '@deliveryhero/armor-icons';

interface IOrderLisProps {
    orderList: OrderItem[];
    isOrderListEmpty: boolean;
    pagingKey: PagingKey;
    fetchNextOrderSet: () => void;
}

const OrderList: React.FC<IOrderLisProps> = ({ orderList, isOrderListEmpty, pagingKey, fetchNextOrderSet }) => {
    const hasMoreOrders = (pagingKey.orderCode ? pagingKey.orderCode.length > 0 : false);

    const displayOrderInfoPage = (orderCode: string) => {
        let urlSegments = window.location.href.split('/');
        let orderInfoUrl = `https://${window.location.host}/${urlSegments[3]}/p/ops-portal-billing#/order/${orderCode}`;
        window.open(orderInfoUrl)
    }

    return (
        <div className={styles.orderListSection}>
            <InfiniteScroll
                dataLength={orderList?.length}
                next={() => fetchNextOrderSet()}
                loader={hasMoreOrders && <Box className={styles.spinner}><LoadingSpinner width='100px' secondary /></Box>}
                hasMore={hasMoreOrders}
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
                            <TableCell>Actions</TableCell>
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
                                        <TableCell>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                height={6}
                                            >
                                                <Tooltip content="Opens order info page for the selected order" disableInteractive>
                                                    <TableAction marginRight={6} onClick={() => displayOrderInfoPage(order.orderCode)}>
                                                        <ExternalLinkIcon large />
                                                    </TableAction>
                                                </Tooltip>
                                                <Tooltip content="Displays Billing Engine payload for the order mentioned" disableInteractive>
                                                    <TableAction marginRight={6}>
                                                        <FileCommonTextIcon className={styles.disableIcon} large />
                                                    </TableAction>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
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
