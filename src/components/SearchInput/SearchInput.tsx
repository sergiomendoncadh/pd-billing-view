import React from 'react';
import {
  Box,
} from '@deliveryhero/armor';
import styles from './SearchInput.module.css';

export const SearchInput: React.FC = () => {
  const [searchCodeValue, setSearchCodeValue] = React.useState('');

  return (
    <Box className={styles.searchInputContainer}>
      <input
        placeholder='Order Code or Vendor Code'
        className={styles.searchInput}
        onChange={(event) => {
          setSearchCodeValue(event.target.value);
        }}
        value={searchCodeValue}
        type={'text'}
      />
    </Box>
  );
};
