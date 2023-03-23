import React from 'react';
import styles from './Card.module.css';
import { Box } from '@deliveryhero/armor';
import { Text } from '../Text';
import { LoadingSpinner } from '@deliveryhero/armor-motion';

interface ICard {
  title: string;
  value: number | string;
  loading: boolean;
}

export const Card: React.FC<ICard> = ({ title, value, loading }) => {
  return (
    <Box className={styles.card}>
      <Text fontSize='subSectionTitle' content={title} className={styles.title} />
      {loading ? (
        <LoadingSpinner width='50px' secondary />
      ) : (
        <Text fontSize='pageTitle' content={value} className={styles.value} />
      )}
    </Box>
  );
};
