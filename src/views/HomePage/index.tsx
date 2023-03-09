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

  const { data, loading, error } = useGetSummarizedDataQuery({
    variables: {
      filter: { endDate: dateRange && dateRange[1], startDate: dateRange && dateRange[0] }
    }
  });

  useHandleErrors(error);
  const summarizedDataResponse = data?.summarizedData;

  const formatDataValue = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  };

  const cards = [
    {
      title: 'Orders in Billing',
      formattedValue: formatDataValue(Number(summarizedDataResponse?.ordersTotalCount)),
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
      formattedValue: formatDataValue(Number(summarizedDataResponse?.ordersSentCount)),
      loading
    }
  ];

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
        <Text fontSize={"sectionTitle"} content='Summarized Data' margin={'20px'} />
        <Flex justifyContent='space-between'>
          <FlexItem maxWidth='lg' className={styles.cardsContainer}>
            {summarizedDataResponse ? cards.map((card) => {
              return (
                <Card
                  title={card.title}
                  value={Number(card.formattedValue)}
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
        <FilterMenu error={error as ApolloError} />
      </Container>
      <Flex direction='column' alignItems='center' marginTop={10}>
        <SearchingIllustration width={'100px'} />
        <Text
          fontSize={'subSectionTitle'}
          content='Order List Will Be Displayed Here'
          className={styles.information}
        />
      </Flex>
    </>
  );
};
