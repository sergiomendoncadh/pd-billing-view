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
    Skeleton,
} from '@deliveryhero/armor';

import { OrderItem, PagingKey } from '@modules/types.graphql';
import styles from './OrderList.module.css';
import { EmptyCartIllustration, NoConnectionIllustration } from '@deliveryhero/armor-illustrations';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@deliveryhero/armor-motion';
import { ExternalLinkIcon, FileCommonTextIcon } from '@deliveryhero/armor-icons';
import { useBaseApiContext } from '@modules/common/context';
import { ApolloError } from '@apollo/client';
import { STATUS_TAG } from '@utils/constants';

interface IOrderLisProps {
    orderList: OrderItem[];
    pagingKey: PagingKey;
    fetchNextOrderSet: () => void;
    orderError: ApolloError | undefined;
    orderLoading: boolean;
}

const OrderList: React.FC<IOrderLisProps> = ({ orderList, pagingKey, fetchNextOrderSet, orderError, orderLoading }) => {
    const renderErrorSection = () => (
        <div className={styles.errorSection}>
            <NoConnectionIllustration width='200px' />
            <Typography paragraph large>Something went wrong</Typography>
        </div>
    );

    if (orderError) return renderErrorSection();

    const baseApi = useBaseApiContext();
    const hasMoreOrders = (pagingKey.orderCode ? pagingKey.orderCode.length > 0 : false);

    const renderBillableTag = (isBillable: boolean) => (<Tag type={isBillable ? 'approved' : 'denied'}>{isBillable.toString()}</Tag>);

    const displayOrderInfoPage = (orderCode: string) => {
        let countryCode = baseApi.getCountry()
        let orderInfoUrl = `https://${window.location.host}/${countryCode}/p/ops-portal-billing#/order/${orderCode}`;
        window.open(orderInfoUrl);
    }

    const isOrderListEmpty = (orderList.length == 0);

    const renderStatusTag = (status: string) => <Tag type={STATUS_TAG[status]}>{status}</Tag>;

    const singleRowLoader = () => {
        let singleRow = [];
        for (let i = 0; i < 8; i++) {
            singleRow.push(<TableCell contentAlignX='center'><Skeleton width='100%' /></TableCell>);
        }

        return singleRowLoader;
    }

    return (
        <div>
            {!isOrderListEmpty &&
                <InfiniteScroll
                    dataLength={orderList?.length}
                    loader={hasMoreOrders && singleRowLoader()}
                    hasMore={hasMoreOrders}
                    next={fetchNextOrderSet}
                    height={700}
                    style={{ overflowY: 'scroll' }}
                >
                    <Table width={"100%"} marginTop={5} stickyHead>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Entity</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Order Code</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Vendor Code</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Status</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Billable</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Order Placed At</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Order Updated At</TableCell>
                                <TableCell className={styles.tableCellWhite} contentAlignX='center'>Actions</TableCell>
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
                                            <TableCell contentAlignX='center' style={{ textTransform: 'capitalize' }}>{renderStatusTag(order.status ? order.status : 'failed')}</TableCell>
                                            <TableCell contentAlignX='center'>{renderBillableTag(order.isBillable ? order.isBillable : false)}</TableCell>
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

            {!orderLoading && isOrderListEmpty && <div className={styles.emptyOrderList}>
                <EmptyCartIllustration width='200px' />
                <Typography paragraph large>No orders to show</Typography>
                <Typography paragraph>Change your filters or check if the order code is correct</Typography>
            </div>}
        </div>
    );
}

export default OrderList;
