import { IOpsSdk } from "@deliveryhero/opsportal"
import React, { useState } from "react"
import { Container, Typography, Flex, FlexItem } from '@deliveryhero/armor'
import { Card } from '../components/Card/Card'
import { Filter } from '../components/Filter/Filter'
import styles from './Home.module.css'
import { DateRangePicker } from '@deliveryhero/armor-datepicker'
import { InfoOutlineIcon } from '@deliveryhero/armor-icons'
import { subMonths } from 'date-fns'

const Intro: React.FC<{ baseApi: IOpsSdk }> = ({ baseApi }) => {
  const cards = [
    { id: 1, title: "Orders in Billing", value: 124.3 },
    { id: 2, title: "Order failed to be sent to SAP", value: 3.7 },
    { id: 3, title: "Orders sent to SAP", value: 25.3 },

  ];
  const [dateRangeValue, setDateRangeValue] = useState('')
  return (
    <Container className={styles.billingView}>
      <Flex marginTop={"10px"}>
        <Typography sectionTitle>
          Billing View
        </Typography>
        <FlexItem className={styles.dateRangePicker}>
          <DateRangePicker
            label="Date Range"
            allowedDateRanges={[[subMonths(new Date(), 2), 'current']]}
            // dateValue={dateRangeValue}
            // onDateValueChange={() => setDateRangeValue('something')}
            width={"300px"}
          />
        </FlexItem>
      </Flex>
      <Typography subSectionTitle margin={"40px 0 30px 30px"}>
        Summarized Data
      </Typography>
      <div className={styles.containerWrapper}>
        <Container maxWidth="lg" className={styles.cardsContainer}>
          {cards.map((card) => {
            return (
              <Card title={card.title} value={card.value} />
            );
          })}
        </Container>
        <div className={styles.divider}>
          <InfoOutlineIcon large className={styles.infoIcon} />
          <Typography paragraph className={styles.information}>
            These are overall metrics calculated for the time frame filtered
          </Typography>
        </div>
      </div>
      <Filter />
    </Container>
  )
};

export default Intro;
