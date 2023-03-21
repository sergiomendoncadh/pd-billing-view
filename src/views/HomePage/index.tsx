import React from 'react';
import { Container, Flex, FlexItem } from '@deliveryhero/armor';
import { InfoOutlineIcon } from '@deliveryhero/armor-icons';
import { SearchingIllustration } from '@deliveryhero/armor-illustrations';
import styles from './HomePage.module.css';
import { Text } from '@components/Text';
import { FilterMenu } from '@components/FilterMenu';
import { DatePicker } from '@components/DatePicker';
import { Card } from '@components/Card';
import { IOpsSdk } from '@deliveryhero/opsportal';
import { useGetSummarizedDataQuery } from '@modules/graphql/getSummarizedData.generated';
import { format } from 'date-fns';
import { useHandleErrors } from '@hooks/useHandleErrors';
import { ApolloError } from '@apollo/client';
import { useGetOrderListLazyQuery } from '@modules/graphql/getOrderList.generated';
import { OrderListTable } from '@components/OrderListTable';


interface IHomeView {
  baseApi: IOpsSdk;
}

export const HomePage: React.FC<IHomeView> = () => {
  const [dateRange, setDateRange] = React.useState<[string, string]>(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const formattedToday = format(today, 'dd.MM.yyyy');
    const formattedYesterday = format(yesterday, 'dd.MM.yyyy');
    return [formattedYesterday, formattedToday];
  });
  const [orderList, setOrderList] = React.useState([]);

  const { data, loading, error: summarizedDataError } = useGetSummarizedDataQuery({
    variables: {
      filter: { startDate: dateRange && dateRange[0], endDate: dateRange && dateRange[1] }
    }
  });

  useHandleErrors(summarizedDataError);
  const summarizedDataResponse = data?.summarizedData;

  const formatDataValue = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  };

  const cards = [
    {
      title: 'Orders in Billing',
      formattedValue: typeof summarizedDataResponse?.ordersTotalCount !== 'undefined' && formatDataValue(Number(summarizedDataResponse?.ordersTotalCount)),
      loading
    },
    {
      title: 'Order failed to be sent to SAP',
      formattedValue:
        summarizedDataResponse?.ordersFailedPercentage &&
        `${summarizedDataResponse?.ordersFailedPercentage}%`,
      loading
    },
    {
      title: 'Orders sent to SAP',
      formattedValue: typeof summarizedDataResponse?.ordersSentCount !== 'undefined' && formatDataValue(Number(summarizedDataResponse?.ordersSentCount)),
      loading
    }
  ];

  const [fetchOrderList, { data: ordersData }] = useGetOrderListLazyQuery();
  const orderListData = ordersData?.billingViewOrderList;

  React.useEffect(() => {
    if (orderListData) {
      setOrderList(orderListData);
    }
  }, [orderListData]);

  const getOrderList = (status: string) => {
    fetchOrderList({
      variables: {
        // TODO: remove the filters once the bff is done
        filter: { startDate: dateRange[0], endDate: dateRange[1], status: status.toLowerCase(), isBillable: true, isReceiptable: true, isWastage: false, pageLimit: 20, pageNumber: 1 }
      }
    });
  };

  const isOrderListEmpty = !!(orderList.length === 0);

  return (
    <>
      <Container className={styles.billingView}>
        <Flex alignItems='center'>
          <Text fontSize={"pageTitle"} content='Billing View' />
          <DatePicker
            onDateRangeSelected={(dateRange: [string, string]) => {
              setDateRange(dateRange);
            }}
          />
        </Flex>
        {isOrderListEmpty && <>
          <Text fontSize={"sectionTitle"} content='Summarized Data' margin={'20px'} />
          <Flex justifyContent='space-between'>
            <FlexItem maxWidth='lg' className={styles.cardsContainer}>
              {summarizedDataResponse ? cards.map((card) => {
                return (
                  <Card
                    title={card.title}
                    value={card.formattedValue as number}
                    loading={loading}
                    key={card.title}
                  />
                );
              }) : null}
            </FlexItem>
            <FlexItem className={styles.divider}>
              <InfoOutlineIcon large className={styles.infoIcon} />
              <Text
                fontSize={'paragraph'}
                content='These are overall metrics calculated for the time frame filtered'
                className={styles.information}
              />
            </FlexItem>
          </Flex>
        </>}
        <FilterMenu summarizedDataError={summarizedDataError as ApolloError} getOrderList={getOrderList} />
        {isOrderListEmpty ? <Flex direction='column' alignItems='center' marginTop={10}>
          <SearchingIllustration width={'100px'} />
          <Text
            fontSize={'subSectionTitle'}
            content='Order List Will Be Displayed Here'
            className={styles.information}
          />
        </Flex> : <OrderListTable orderList={orderList} />}
      </Container>
    </>
  );
};
