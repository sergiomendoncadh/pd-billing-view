import React from 'react';
import { Button, Dropdown, Box, Flex, PseudoEventType, DropdownValueType } from '@deliveryhero/armor';
import styles from './FilterMenu.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';
import { ApolloError } from '@apollo/client';
import { ORDER_STATES } from '@utils/constants';

const DEFAULT_SENT_STATUS = 1;

interface IFilterMenu {
  error: ApolloError;
  handleFetchOrderList: Function;
}

const initialState = {
  searchInput: '',
  dropdownStatus: DEFAULT_SENT_STATUS,
}

export const FilterMenu: React.FC<IFilterMenu> = ({ error, handleFetchOrderList }) => {
  const [filterQuery, handleFilterQuery] = React.useState(initialState);

  return (
    <form className={styles.searchFiltersContainer}>
      <Text fontSize={'subSectionTitle'} content='Search Filters' margin={'0 0 20px 0'} />
      <Flex alignItems='center'>
        <SearchInput handleFilterQuery={handleFilterQuery} filterQuery={filterQuery}/>
        <Dropdown
          options={Object.values(ORDER_STATES)}
          label='Status'
          defaultValue={DEFAULT_SENT_STATUS}
          value={filterQuery.dropdownStatus}
          onChange={(e: any) => handleFilterQuery({...filterQuery, dropdownStatus: e.target.value})}
        />
        <Box className={styles.buttons}>
          <Button small className={styles.searchButton} disabled={Boolean(error)} onClick={() => handleFetchOrderList(filterQuery)}>
            Search
          </Button>
          <Button small className={styles.resetButton} onClick={() => handleFilterQuery(initialState)}>
            Reset
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
