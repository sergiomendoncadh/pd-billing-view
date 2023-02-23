import React, { useState } from 'react';
import {
  FilterLayout,
} from '@deliveryhero/armor-filter';
import styles from './Filter.module.css'
import { Button, Typography, Checkbox, Stack, Dropdown } from '@deliveryhero/armor';
import { SearchIcon, InfoOutlineIcon } from '@deliveryhero/armor-icons';

export const Filter = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <FilterLayout tall marginTop={10} className={styles.filterLayout}>
        <Typography subSectionTitle>Search Filters</Typography>
        <div className={styles.filtersContainer}>
          <div className={styles.orderCodeSearchInput}>
            <input
              placeholder="Order Code or Vendor Code"
              className={styles.input}
              onChange={(event) => setValue(event.target.value)}
              value={value}
              type={"text"}
            />
            <div className={styles.searchIcon}>
              <SearchIcon medium />
            </div>
          </div>
          <Stack className={styles.checkboxFilters}>
            <div className={styles.checkbox}>
              <Checkbox
                onChange={() => { }}
                label="Billable"
                marginBottom={2}
                enterKeyHint
              />
              <div className={styles.info}>
                <InfoOutlineIcon medium />
              </div>
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                onChange={() => { }}
                label="Receiptable"
                marginBottom={2}
                enterKeyHint
              />
              <div className={styles.info}>
                <InfoOutlineIcon medium />
              </div>
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                onChange={() => { }}
                label="Wastage"
                marginBottom={2}
                enterKeyHint
              />
              <div className={styles.info}>
                <InfoOutlineIcon medium />
              </div>
            </div>
          </Stack>
          <div className={styles.dropdown}>
            <Dropdown
              options={['Delivered', 'Paid', 'Cancelled']}
              label="Status"
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.searchButton}>Search</Button>
          <Button className={styles.resetButton}>Reset</Button>
        </div>
      </ FilterLayout>
    </>
  )

}

