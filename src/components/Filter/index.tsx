import React from 'react';
import { FilterLayout } from '@deliveryhero/armor-filter';
import {
  Button,
  Dropdown,
  Box
} from '@deliveryhero/armor';
import styles from './Filter.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';

export const Filter = () => {
  return (
    <FilterLayout tall marginTop={10} className={styles.filterLayout}>
      <Text
        fontSize='small'
        content='Search Filters'
        margin={'0 0 20px 0'}
      />
      <Box className={styles.filtersContainer}>
        <SearchInput />
        <Box className={styles.statusDropdown}>
          <Dropdown options={['Delivered', 'Paid', 'Cancelled']} label='Status' />
        </Box>
      </Box>
      <Box className={styles.buttons}>
        <Button className={styles.searchButton}>Search</Button>
        <Button className={styles.resetButton}>Reset</Button>
      </Box>
    </FilterLayout>
  );
};
