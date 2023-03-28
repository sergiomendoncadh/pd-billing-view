import React from 'react';
import { IOpsSdk } from '@deliveryhero/opsportal';
import {
    FilterConditionValueType,
    useFilterURLStorage,
} from '@deliveryhero/armor-filter';
import { Container, Typography } from '@deliveryhero/armor';
import styles from './HomeView.module.css';
import { DatabaseIllustration } from '@deliveryhero/armor-illustrations';
import { useGetSummarizedDataLazyQuery } from '@modules/graphql/getSummarizedData.generated';
import { useGetOrderListLazyQuery } from '@modules/graphql/getOrderList.generated';
import FilterMenu from '@modules/components/FilterMenu/FilterMenu';
import OrderList from '@modules/components/OrderList/OrderList';
import { OrderItem, PagingKey } from '@modules/types.graphql';
import { formatExpectedDate, getConditionValue } from '@utils/helper';

interface IHomeView {
    baseApi: IOpsSdk;
}

interface IOrderSet {
    orders: OrderItem[];
    pagingKey: PagingKey;
}

const initialOrderSet: IOrderSet = {
    orders: [],
    pagingKey: {},
}

export const HomeView: React.FC<IHomeView> = () => {
    const [storedValue, setStoredValue] = useFilterURLStorage('filterA');
    const [filterValue, setFilterValue] = React.useState<FilterConditionValueType | undefined>(storedValue);
    const [orderSet, setOrderSet] = React.useState<IOrderSet>(initialOrderSet);

    const [getSummarizedData, { data: sumdata, loading: sumloading, error: sumerror }] = useGetSummarizedDataLazyQuery();
    const [getOrderList, { data: orderdata, loading: orderloading, error: ordererror }] = useGetOrderListLazyQuery();

    console.log(orderSet);

    // handle initial state
    React.useEffect(() => {
        // set default values
        let initialDate = formatExpectedDate(new Date().toISOString()),
            initialState = (getConditionValue(filterValue?.conditions, 'startDate').length == 0 || getConditionValue(filterValue?.conditions, 'endDate').length == 0),
            currentStatus = getConditionValue(filterValue?.conditions, 'status'),
            currentSearchTerm = getConditionValue(filterValue?.conditions, 'search');

        getSummarizedData({
            variables: {
                filter: {
                    startDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'startDate'),
                    endDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'endDate'),
                }
            }
        });

        getOrderList({
            variables: {
                filter: {
                    startDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'endDate'),
                    endDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'endDate'),
                    searchTerm: currentSearchTerm?.length == 0 ? '' : currentSearchTerm,
                    status: currentStatus?.length == 0 ? 'sent' : currentStatus,
                    lastEvaluatedKey: {},
                }
            },
            fetchPolicy: "no-cache",
        });
    }, []);

    React.useEffect(() => {
        if (orderdata?.billingViewOrderList.orders) {
            setOrderSet({
                ...orderSet,
                orders: [...orderSet.orders, ...orderdata?.billingViewOrderList.orders as OrderItem[]],
                pagingKey: { ...orderdata.billingViewOrderList.pagingKey },
            })
        }
    }, [orderdata])

    const setFilterValueCommon: any = React.useCallback(
        (value: FilterConditionValueType) => {
            setStoredValue(value);
            setFilterValue(value);
            setOrderSet(initialOrderSet);

            getSummarizedData({
                variables: {
                    filter: {
                        startDate: getConditionValue(value?.conditions, 'startDate'),
                        endDate: getConditionValue(value?.conditions, 'endDate'),
                    }
                },
            });

            // call for updating the order list
            getOrderList({
                variables: {
                    filter: {
                        startDate: getConditionValue(value?.conditions, 'startDate'),
                        endDate: getConditionValue(value?.conditions, 'endDate'),
                        status: getConditionValue(value?.conditions, 'status'),
                        lastEvaluatedKey: {},
                        searchTerm: getConditionValue(value?.conditions, 'search')
                    }
                },
                fetchPolicy: "no-cache",
            });
        },
        [setStoredValue, setFilterValue],
    );

    const fetchNextOrderSet = () => {
        getOrderList({
            variables: {
                filter: {
                    startDate: getConditionValue(filterValue?.conditions, 'startDate'),
                    endDate: getConditionValue(filterValue?.conditions, 'endDate'),
                    status: getConditionValue(filterValue?.conditions, 'status'),
                    lastEvaluatedKey: { ...orderSet.pagingKey },
                    searchTerm: getConditionValue(filterValue?.conditions, 'search')
                }
            }
        });
    }

    const isOrderListEmpty = (orderSet.orders.length == 0);

    return (
        <Container maxWidth={"90%"}>
            <div className={styles.titleSection}>
                <Typography sectionTitle>Billing View</Typography>
            </div>
            <div className={styles.summarizedSection}>
                <div className={styles.cardSection}>
                    <div className={styles.cardContainer}>
                        <Typography className={styles.cardLabel} label medium>Orders in Billing</Typography>
                        <div className={styles.cardDataSet}>
                            <Typography pageTitle>{sumdata?.summarizedData.ordersTotalCount}</Typography>
                        </div>
                    </div>
                    <div className={styles.cardContainer}>
                        <Typography className={styles.cardLabel} label medium>Orders Failed to Be Sent to SAP</Typography>
                        <div className={styles.cardDataSet}>
                            <Typography pageTitle>{sumdata?.summarizedData.ordersFailedPercentage}</Typography>
                            <Typography sectionTitle>%</Typography>
                        </div>
                    </div>
                    <div className={styles.cardContainer}>
                        <Typography className={styles.cardLabel} label medium>Orders Sent to SAP</Typography>
                        <div className={styles.cardDataSet}>
                            <Typography pageTitle>{sumdata?.summarizedData.ordersSentCount}</Typography>
                        </div>
                    </div>
                </div>

                <div className={styles.informationSection}>
                    <DatabaseIllustration width='150px' marginRight={10} />
                    <Typography paragraph>Select the data tiles to apply specific filters</Typography>
                </div>
            </div>

            <FilterMenu filterValue={filterValue} setFilterValueCommon={setFilterValueCommon} />
            <OrderList
                isOrderListEmpty={isOrderListEmpty}
                orderList={orderSet.orders}
                pagingKey={orderSet.pagingKey}
                fetchNextOrderSet={fetchNextOrderSet}
            />
        </Container>
    );
};
