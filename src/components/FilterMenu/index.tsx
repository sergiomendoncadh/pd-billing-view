import React from 'react';
import { Button, Dropdown, Box, Flex, Tag } from '@deliveryhero/armor';
import styles from './FilterMenu.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';
import { ApolloError } from '@apollo/client';
import { STATUS_OPIONS } from '@utils/constants';


interface IFilterMenu {
  summarizedDataError: ApolloError;
  getOrderList: (status: string) => void;
}

export const FilterMenu: React.FC<IFilterMenu> = ({ summarizedDataError, getOrderList }) => {
  const [status, setStatus] = React.useState('Delivered');
  const [orderListAvailable, setOrderListAvailable] = React.useState(false);
  const onOrderCodeSearch = () => {
    getOrderList(status);
    setOrderListAvailable(true);

  };
  return (
    <form className={styles.searchFiltersContainer}>
      <Text fontSize={'subSectionTitle'} content={orderListAvailable ? 'Selected Filters' : 'Search Filters'} margin={'0 0 20px 0'} />
      <Flex alignItems='center'>
        {orderListAvailable ? <Tag label={status} deleteOption="enabled" marginRight={3} className={styles.chip} /> :
          <>
            <SearchInput />
            <Dropdown options={STATUS_OPIONS} label='Status' onChange={e => setStatus(STATUS_OPIONS[e.target.value])} />
          </>}
        <Box className={styles.buttons}>
          <Button small className={styles.searchButton} disabled={Boolean(summarizedDataError)} onClick={onOrderCodeSearch}>
            Search
          </Button>
          <Button small className={styles.resetButton}>
            Reset
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
