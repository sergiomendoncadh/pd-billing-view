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
  const [status, setStatus] = React.useState('Sent');
  const [filter, setFilter] = React.useState(false);
  const [orderListAvailable, setOrderListAvailable] = React.useState(false);

  const onStatusSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(STATUS_OPIONS[Number(e.target.value)]);
  };

  const onOrderCodeSearch = () => {
    getOrderList(status);
    setOrderListAvailable(true);
    setFilter(true);
  };

  const onFilterDeselect = () => {
    setFilter(false);
  };

  return (
    <form className={styles.searchFiltersContainer}>
      <Text fontSize='subSectionTitle' content={orderListAvailable ? 'Selected Filters' : 'Search Filters'} margin={'0 0 20px 0'} />
      <Flex alignItems='center'>
        {orderListAvailable && filter ? <Box minWidth={30}>
          <Tag wide deleteOption="enabled" onDeselect={onFilterDeselect} className={styles.chip}><Text content={status} fontSize='paragraph' className={styles.chipText} /></Tag>
        </Box> :
          <>
            <SearchInput />
            <Dropdown options={STATUS_OPIONS} label='Status' onChange={onStatusSelect} />
          </>}
        <Box className={styles.buttons}>
          <Button small className={styles.searchButton} disabled={Boolean(summarizedDataError)} onClick={onOrderCodeSearch}>
            Search
          </Button>
          <Button small className={styles.resetButton} onClick={() => setFilter(false)}>
            Reset
          </Button>
        </Box>
      </Flex>
    </form >
  );
};
