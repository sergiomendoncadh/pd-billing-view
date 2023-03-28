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
        <div>
            {!isOrderListEmpty && <InfiniteScroll
                dataLength={orderList?.length}
                loader={hasMoreOrders && <Box className={styles.spinner}><LoadingSpinner width='100px' secondary /></Box>}
                hasMore={hasMoreOrders}
                next={fetchNextOrderSet}
                height={700}
                style={{ overflowY: 'scroll' }}
            >
                <Table width={"100%"} marginTop={5} stickyHead>
                    <TableHead>
                        <TableRow>
                            <TableCell contentAlignX='center'>Entity</TableCell>
                            <TableCell contentAlignX='center'>Order Code</TableCell>
                            <TableCell contentAlignX='center'>Vendor Code</TableCell>
                            <TableCell contentAlignX='center'>Status</TableCell>
                            <TableCell contentAlignX='center'>Billable</TableCell>
                            <TableCell contentAlignX='center'>Order Placed At</TableCell>
                            <TableCell contentAlignX='center'>Order Updated At</TableCell>
                            <TableCell contentAlignX='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {orderList && orderList.length > 0 &&
                        <TableBody>
                            {orderList.map(order => {
                                return (
                                    <TableRow>
                                        <TableCell contentAlignX='center'>{order?.entityId}</TableCell>
                                        <TableCell contentAlignX='center'>{order?.orderCode}</TableCell>
                                        <TableCell contentAlignX='center'>{order?.vendorCode}</TableCell>
                                        <TableCell contentAlignX='center'>{order?.status}</TableCell>
                                        <TableCell contentAlignX='center'>
                                            {order?.isBillable
                                                ? <Tag type={'approved'}>{order?.isBillable.toString()}</Tag>
                                                : <Tag type={'denied'}>{order?.isBillable ? order.isBillable.toString() : 'false'}</Tag>
                                            }
                                        </TableCell>
                                        <TableCell contentAlignX='center'>{order?.orderPlacedAt}</TableCell>
                                        <TableCell contentAlignX='center'>{order?.orderUpdatedAt}</TableCell>
                                        <TableCell contentAlignX='center'>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                height={6}
                                            >
                                                <Tooltip content="Opens order info page for the selected order" disableInteractive>
                                                    <TableAction marginRight={6} onClick={() => displayOrderInfoPage(order.orderCode)}>
                                                        <ExternalLinkIcon large />
                                                    </TableAction>
                                                </Tooltip>
                                                <Tooltip content="Displays Billing Engine payload for the order mentioned" disableInteractive>
                                                    <TableAction>
                                                        <FileCommonTextIcon className={styles.disableIcon} large />
                                                    </TableAction>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>}
                </Table>
            </InfiniteScroll>}

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
