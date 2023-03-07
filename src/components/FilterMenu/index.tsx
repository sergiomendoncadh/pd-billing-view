import React from 'react';
import { Button, Dropdown, Box, Flex } from '@deliveryhero/armor';
import styles from './FilterMenu.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';

export const FilterMenu = () => {
  return (
    <form className={styles.searchFiltersContainer}>
      <Text fontSize='small' content='Search Filters' margin={'0 0 20px 0'} />
      <Flex alignItems='center'>
        <SearchInput />
        <Dropdown options={['Delivered', 'Paid', 'Cancelled']} label='Status' />
        <Box className={styles.buttons}>
          <Button small className={styles.searchButton}>
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
