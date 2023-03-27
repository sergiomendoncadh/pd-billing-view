import React from 'react';
import { IOpsSdk } from '@deliveryhero/opsportal';
import {
    FilterConditionValueType,
    useFilterURLStorage,
    FilterConditionValueElementOrGroupType
} from '@deliveryhero/armor-filter';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Tag, Typography } from '@deliveryhero/armor';
import styles from './HomeView.module.css';
import { DatabaseIllustration, EmptyCartIllustration } from '@deliveryhero/armor-illustrations';
import { useGetSummarizedDataQuery } from '@modules/graphql/getSummarizedData.generated';
import { useGetOrderListLazyQuery } from '@modules/graphql/getOrderList.generated';
import FilterMenu from '@modules/components/FilterMenu/FilterMenu';
import OrderList from '@modules/components/OrderList/OrderList';
import { OrderItem, PagingKey } from '@modules/types.graphql';

interface IHomeView {
    baseApi: IOpsSdk;
}

interface IOrderSet {
    orders: OrderItem[];
    pagingKey: PagingKey;
}

// TODO: replace with actual call
const sampleMockCall = {
    "data": {
        "billingViewOrderList": {
            "Orders": [
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-3333",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T09:09:43.135628788Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-ztpc",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T09:09:43.135628788Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x1ba-l8bn",
                    "VendorCode": "x1ba",
                    "OrderUpdatedAt": "2023-03-23T07:33:55.436036009Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-hc4o",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T08:54:48.122885736Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x8km-nuiy",
                    "VendorCode": "x8km",
                    "OrderUpdatedAt": "2023-03-24T09:44:10.889835395Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "s6th-pirs",
                    "VendorCode": "s6th",
                    "OrderUpdatedAt": "2023-03-24T09:03:49.43430701Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "di-v3zb-sxvq",
                    "VendorCode": "di-v",
                    "OrderUpdatedAt": "2023-03-24T02:42:43.311468892Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "s9sv-sk9o",
                    "VendorCode": "s9sv",
                    "OrderUpdatedAt": "2023-03-24T09:39:07.454988131Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x1ba-x1lb",
                    "VendorCode": "x1ba",
                    "OrderUpdatedAt": "2023-03-24T07:06:24.999843798Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                }
            ],
            "PagingKey": {
                "flow": "LATEST",
                "orderCode": "s6mu-f0nr",
                "orderPlacedAt": "2023-03-24"
            }
        }
    }
};

const getConditionValue = (conditions: FilterConditionValueElementOrGroupType[] | undefined, filterId: string): string => {
    let conditionMap: any = {};

    if (!conditions) return '';

    conditions.map((ctd: FilterConditionValueElementOrGroupType) => {
        if (ctd.id?.indexOf('Date') !== -1) {
            ctd.value = formatExpectedDate(ctd.value as string)
        }

        conditionMap[ctd?.id ?? ''] = ctd.value;
    });

    return conditionMap[filterId];
}

const formatExpectedDate = (date: string) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const initialOrderSet: IOrderSet = {
    orders: [],
    pagingKey: {},
}

export const HomeView: React.FC<IHomeView> = () => {
    const [storedValue, setStoredValue] = useFilterURLStorage('filterA');
    const [filterValue, setFilterValue] = React.useState<FilterConditionValueType | undefined>(storedValue);
    const [orderSet, setOrderSet] = React.useState<IOrderSet>(initialOrderSet);

    const { data: sumdata, loading: sumloading, error: sumerror } = useGetSummarizedDataQuery({
        variables: {
            filter: {
                startDate: getConditionValue(filterValue?.conditions, 'startDate'),
                endDate: getConditionValue(filterValue?.conditions, 'endDate'),
            }
        }
    });

    const [getOrderList, { data: orderdata, loading: orderloading, error: ordererror }] = useGetOrderListLazyQuery();

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
                }
            });
        },
        [setStoredValue, setFilterValue],
    );

    const fetchNextOrderSet = () => {
        console.log('fetch next set');
        getOrderList({
            variables: {
                filter: {
                    startDate: getConditionValue(filterValue?.conditions, 'startDate'),
                    endDate: getConditionValue(filterValue?.conditions, 'endDate'),
                    status: getConditionValue(filterValue?.conditions, 'status'),
                    lastEvaluatedKey: { ...orderSet.pagingKey },
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
