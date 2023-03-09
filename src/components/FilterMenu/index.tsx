import React from 'react';
import { Button, Dropdown, Box, Flex } from '@deliveryhero/armor';
import styles from './FilterMenu.module.css';
import { Text } from '../Text';
import { SearchInput } from '../SearchInput';
import { ApolloError } from '@apollo/client';

interface IFilterMenu {
  error: ApolloError;
}

export const FilterMenu: React.FC<IFilterMenu> = ({ error }) => {
  return (
    <form className={styles.searchFiltersContainer}>
      <Text fontSize={'subSectionTitle'} content='Search Filters' margin={'0 0 20px 0'} />
      <Flex alignItems='center'>
        <SearchInput />
        <Dropdown options={['Delivered', 'Paid', 'Cancelled']} label='Status' />
        <Box className={styles.buttons}>
          <Button small className={styles.searchButton} disabled={Boolean(error)}>
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
