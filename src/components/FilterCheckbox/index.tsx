import React from 'react';
import {
  Checkbox,
  Box,
  Tooltip,
  IconButton
} from '@deliveryhero/armor';
import { InfoOutlineIcon } from '@deliveryhero/armor-icons';
import styles from './FilterCheckbox.module.css';

interface IFilterCheckbox {
  checkboxLabel: string,
  tooltipInfo: string;
}

export const FilterCheckbox: React.FC<IFilterCheckbox> = ({ checkboxLabel, tooltipInfo }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Box>
      <Checkbox onChange={() => setChecked(!checked)} label={checkboxLabel} enterKeyHint />
      <Tooltip align='top-start' content={tooltipInfo}>
        <IconButton light>
          <InfoOutlineIcon medium color='#b8b8b8' className={styles.tooltipIcon} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
