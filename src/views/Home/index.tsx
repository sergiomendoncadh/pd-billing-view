import React from 'react';
import { IOpsSdk } from '@deliveryhero/opsportal';
import {
    FilterConditionValueType,
    useFilterURLStorage,
} from '@deliveryhero/armor-filter';
import { Container, Typography } from '@deliveryhero/armor';
import { useGetSummarizedDataLazyQuery } from '@modules/graphql/getSummarizedData.generated';
import { useGetOrderListLazyQuery } from '@modules/graphql/getOrderList.generated';
import { OrderItem, PagingKey } from '@modules/types.graphql';
import { formatExpectedDate, getConditionValue } from '@utils/helper';

import SummarizedSection from '@modules/components/SummarizedSection/SummarizedSection';
import ViewActionSection from '@modules/components/ViewActionSection/ViewActionSection';
import FilterMenu from '@modules/components/FilterMenu/FilterMenu';
import OrderList from '@modules/components/OrderList/OrderList';

import styles from './HomeView.module.css';

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

    // handle initial state
    React.useEffect(() => {
        // set default values
        let initialDate = formatExpectedDate(new Date().toISOString()),
            initialState = (getConditionValue(filterValue?.conditions, 'startDate')?.length == 0 || getConditionValue(filterValue?.conditions, 'endDate')?.length == 0),
            currentStatus = getConditionValue(filterValue?.conditions, 'status'),
            currentSearchTerm = getConditionValue(filterValue?.conditions, 'search');

        const initialFilterValue = {
            conditions: [
                {
                    id: "startDate",
                    name: "startDate",
                    value: initialDate,
                },
                {
                    id: "endDate",
                    name: "endDate",
                    value: initialDate,
                },
                {
                    id: "status",
                    name: "status",
                    value: 'sent',
                }
            ]
        };
        const filterSummarizedVariables = {
            startDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'startDate'),
            endDate: initialState ? initialDate : getConditionValue(filterValue?.conditions, 'endDate'),
        };
        const filterOrderListVariables = {
            ...filterSummarizedVariables,
            searchTerm: currentSearchTerm?.length == 0 ? '' : currentSearchTerm,
            status: currentStatus?.length == 0 ? 'sent' : currentStatus,
            lastEvaluatedKey: {},
        }

        setStoredValue(initialFilterValue);
        setFilterValue(initialFilterValue);

        getSummarizedData({ variables: { filter: filterSummarizedVariables } });
        getOrderList({ variables: { filter: filterOrderListVariables }, fetchPolicy: "no-cache" });
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

    const setFilterValueCommon = React.useCallback(
        (value: FilterConditionValueType) => {
            setStoredValue(value);
            setFilterValue(value);
            setOrderSet(initialOrderSet);

            // set filter variables
            const filterSummarizedVariables = {
                startDate: getConditionValue(value?.conditions, 'startDate'),
                endDate: getConditionValue(value?.conditions, 'endDate'),
            };
            const filterOrderListVariables = {
                ...filterSummarizedVariables,
                status: getConditionValue(value?.conditions, 'status'),
                lastEvaluatedKey: {},
                searchTerm: getConditionValue(value?.conditions, 'search'),
            };

            getSummarizedData({ variables: { filter: filterSummarizedVariables }, });
            getOrderList({ variables: { filter: filterOrderListVariables }, fetchPolicy: "no-cache" });
        },
        [setStoredValue, setFilterValue],
    );

    const fetchNextOrderSet = () => {
        const filterOrderListVariables = {
            startDate: getConditionValue(filterValue?.conditions, 'startDate'),
            endDate: getConditionValue(filterValue?.conditions, 'endDate'),
            status: getConditionValue(filterValue?.conditions, 'status'),
            lastEvaluatedKey: { ...orderSet.pagingKey },
            searchTerm: getConditionValue(filterValue?.conditions, 'search')
        };
        getOrderList({ variables: { filter: filterOrderListVariables } });
    }

    return (
        <Container maxWidth={"90%"}>
            <div className={styles.titleSection}>
                <Typography sectionTitle>Billing View</Typography>
            </div>
            <SummarizedSection
                ordersFailedPercentage={sumdata ? sumdata?.summarizedData.ordersFailedPercentage : 0}
                ordersSentCount={sumdata ? sumdata?.summarizedData.ordersSentCount : 0}
                ordersTotalCount={sumdata ? sumdata?.summarizedData.ordersTotalCount : 0}
            />
            <FilterMenu filterValue={filterValue} setFilterValueCommon={setFilterValueCommon} />
            <OrderList
                orderList={orderSet.orders}
                pagingKey={orderSet.pagingKey}
                fetchNextOrderSet={fetchNextOrderSet}
                orderError={ordererror}
            />
            <ViewActionSection />
        </Container>
    );
};
