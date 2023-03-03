import React from 'react';
import { Container, Flex, FlexItem } from '@deliveryhero/armor';
import { InfoOutlineIcon } from '@deliveryhero/armor-icons';
import { SearchingIllustration } from '@deliveryhero/armor-illustrations';
import styles from './HomePage.module.css';
import { Text } from '@components/Text';
import { Filter } from '@components/Filter';
import { DatePicker } from '@components/DatePicker';
import { Card } from '@components/Card';

export const HomePage: React.FC = () => {
  const cards = [
    { id: 1, title: 'Orders in Billing', value: 124.3 },
    { id: 2, title: 'Order failed to be sent to SAP', value: 3.7 },
    { id: 3, title: 'Orders sent to SAP', value: 25.3 }
  ];

  return (
    <>
      <Container className={styles.billingView}>
        <Flex alignItems='center'>
          <Text fontSize='large' content='Billing View' />
          <DatePicker />
        </Flex>
        <Text fontSize={'medium'} content='Summarized Data' margin={'20px'} />
        <Flex justifyContent='space-between'>
          <FlexItem maxWidth='lg' className={styles.cardsContainer}>
            {cards.map((card) => {
              return <Card title={card.title} value={card.value} key={card.id} />;
            })}
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
        <Filter />
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
