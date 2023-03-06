import React from 'react';
import { Button, Dropdown, Box } from '@deliveryhero/armor';
import styles from './FilterMenu.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';

export const FilterMenu = () => {
  return (
    <form className={styles.filterLayout}>
      <Text fontSize='small' content='Search Filters' margin={'0 0 20px 0'} />
      <Box className={styles.filtersContainer}>
        <SearchInput />
        <Dropdown options={['Delivered', 'Paid', 'Cancelled']} label='Status' />
      </Box>
      <Box className={styles.buttons}>
        <Button className={styles.searchButton}>Search</Button>
        <Button className={styles.resetButton}>Reset</Button>
      </Box>
    </form>
  );
};
