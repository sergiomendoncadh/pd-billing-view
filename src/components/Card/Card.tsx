import React from 'react';
import styles from './Card.module.css';
import { Box } from '@deliveryhero/armor';
import { Text } from '../Text/Text';

interface ICard {
  title: string;
  value: number;
}

export const Card: React.FC<ICard> = ({ title, value }) => {
  return (
    <Box className={styles.card}>
      <Text
        fontSize='small'
        content={title}
        className={styles.title}
      />
      <Text
        fontSize='large'
        content={value}
        className={styles.value}
      />
    </Box>
  );
};
