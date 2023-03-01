import React from 'react';
import { FilterLayout } from '@deliveryhero/armor-filter';
import styles from './Filter.module.css';
import {
  Button,
  Stack,
  Dropdown,
  Box
} from '@deliveryhero/armor';
import { Text } from '../Text/Text';
import { SearchInput } from '../SearchInput/SearchInput';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

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
        <Stack className={styles.checkboxFilters}>
          <FilterCheckbox checkboxLabel='Billable' tooltipInfo='Order is billable' />
          <FilterCheckbox checkboxLabel='Receiptable' tooltipInfo='Customer receipt is generated for the order' />
          <FilterCheckbox checkboxLabel='Wastage' tooltipInfo='Order is accepted by the vendor but is cancelled pre-delivery' />
        </Stack>
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
