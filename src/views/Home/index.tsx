import React from 'react';
import {
    FilterConditionValueType,
    useFilterURLStorage,
} from '@deliveryhero/armor-filter';
import { Container, Typography } from '@deliveryhero/armor';
import { useGetSummarizedDataLazyQuery } from '@modules/graphql/getSummarizedData.generated';
import { useGetOrderListLazyQuery } from '@modules/graphql/getOrderList.generated';
import { OrderItem } from '@modules/types.graphql';
import { formatExpectedDate, getConditionValue } from '@utils/helper';

import SummarizedSection from '@modules/components/SummarizedSection/SummarizedSection';
import FilterMenu from '@modules/components/FilterMenu/FilterMenu';
import OrderList from '@modules/components/OrderList/OrderList';

import styles from './HomeView.module.css';
import { useBaseApiContext } from '@modules/common/context';
import { IHomeView, initialFilterValue, initialOrderSet, IOrderSet } from './types';


export const HomeView: React.FC<IHomeView> = () => {
    const baseApi = useBaseApiContext();
    const [storedValue, setStoredValue] = useFilterURLStorage('filterA');
    const [filterValue, setFilterValue] = React.useState<FilterConditionValueType | undefined>(storedValue);
    const [orderSet, setOrderSet] = React.useState<IOrderSet>(initialOrderSet);
    const getCountryValue = baseApi.getCountry()?.code;

    const [getSummarizedData, { data: sumdata, loading: sumloading, error: sumerror }] = useGetSummarizedDataLazyQuery();
    const [getOrderList, { data: orderdata, loading: orderloading, error: ordererror }] = useGetOrderListLazyQuery();

    // handle initial state
    React.useEffect(() => {
        // set default values
        let initialDate = formatExpectedDate(new Date().toISOString()),
            initialState = (getConditionValue(filterValue?.conditions, 'startDate')?.length == 0 || getConditionValue(filterValue?.conditions, 'endDate')?.length == 0),
            currentStatus = getConditionValue(filterValue?.conditions, 'status'),
            currentSearchTerm = getConditionValue(filterValue?.conditions, 'search');

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

        // update local filter states only if stored state is empty
        if (!storedValue) {
            setStoredValue(initialFilterValue);
            setFilterValue(initialFilterValue);
        }

        getSummarizedData({ variables: { filter: filterSummarizedVariables } });
        getOrderList({ variables: { filter: filterOrderListVariables }, fetchPolicy: "no-cache" });
    }, []);

    React.useEffect(() => {
        if (orderdata?.billingViewOrderList.orders) {
            let finalOrderSet: OrderItem[] = [];

            // handle duplication of orders 
            ([...orderSet.orders, ...orderdata?.billingViewOrderList.orders as OrderItem[]]).map((order) => {
                if (finalOrderSet.findIndex((el) => el.orderCode == order.orderCode) == -1) {
                    finalOrderSet.push(order);
                }
            })

            setOrderSet({
                ...orderSet,
                orders: finalOrderSet,
                pagingKey: { ...orderdata.billingViewOrderList.pagingKey },
            })
        }
    }, [orderdata]);

    const setFilterValueCommon = React.useCallback(
        (value: FilterConditionValueType) => handleFilterUpdates(value),
        [setStoredValue, setFilterValue, getCountryValue],
    );

    const handleFilterUpdates = (value: FilterConditionValueType) => {
        // handle filter updates 
        let startDate = getConditionValue(value?.conditions, 'startDate'),
            endDate = getConditionValue(value?.conditions, 'endDate');

        if (new Date(endDate) < new Date(startDate)) {
            return baseApi.alert.set('[Validation] End date cannot be lower than start date', { variant: 'error' });
        }

        setStoredValue(value);
        setFilterValue(value);
        setOrderSet(initialOrderSet);

        // set filter variables
        const filterSummarizedVariables = { startDate, endDate };
        const filterOrderListVariables = {
            ...filterSummarizedVariables,
            status: getConditionValue(value?.conditions, 'status'),
            lastEvaluatedKey: {},
            searchTerm: getConditionValue(value?.conditions, 'search'),
        };

        getSummarizedData({ variables: { filter: filterSummarizedVariables }, });
        getOrderList({ variables: { filter: filterOrderListVariables }, fetchPolicy: "no-cache" });
    }

    // handle country changes
    React.useEffect(() => {
        if (filterValue) handleFilterUpdates(filterValue);
    }, [baseApi.getCountry()]);

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

    if (sumerror) {
        baseApi.alert.set("[Request Error] Summarized data failed to load", {
            variant: "error"
        });
    }

    if (ordererror) {
        baseApi.alert.set("[Request Error] Order list data failed to load", {
            variant: "error"
        });
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
                orderLoading={orderloading}
            />
        </Container>
    );
};
