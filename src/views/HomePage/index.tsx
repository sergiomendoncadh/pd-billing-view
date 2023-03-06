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
import { useGetSummarizedDataQuery } from "@modules/graphql/getSummarizedData.generated";

interface IHomeView {
  baseApi: IOpsSdk;
}

export const HomePage: React.FC<IHomeView> = () => {
  const [dateRange, setDateRange] = React.useState<[string, string]>();

  const { data } = useGetSummarizedDataQuery({
    variables: {
      filter: { endDate: dateRange && dateRange[1], startDate: dateRange && dateRange[0] }
    }
  });

  const summarizedDataResponse = data?.summarizedData;

  return (
    <>
      <Container className={styles.billingView}>
        <Flex alignItems='center'>
          <Text fontSize='large' content='Billing View' />
          <DatePicker onDateRangeSelected={(dateRange: [string, string]) => setDateRange(dateRange)} />
        </Flex>
        <Text fontSize={'medium'} content='Summarized Data' margin={'20px'} />
        <Flex justifyContent='space-between'>
          <FlexItem maxWidth='lg' className={styles.cardsContainer}>
            <Card title={'Orders in Billing'} value={summarizedDataResponse?.ordersTotalCount as number} />
            <Card title={'Order failed to be sent to SAP'} value={summarizedDataResponse?.ordersFailedPercentage as number} />
            <Card title={'Orders sent to SAP'} value={summarizedDataResponse?.ordersSentCount as number} />
          </FlexItem>
          <FlexItem className={styles.divider}>
            <InfoOutlineIcon large className={styles.infoIcon} />
            <Text
              fontSize='small'
              content='These are overall metrics calculated for the time frame filtered'
              className={styles.information}
            />
          </FlexItem>
        </Flex>
        <FilterMenu />
      </Container>
      <Flex direction='column' alignItems='center'>
        <SearchingIllustration width='100px' />
        <Text
          fontSize='small'
          content='Order List Will Be Displayed Here'
          className={styles.information}
        />
      </Flex>
    </>
  );
};
