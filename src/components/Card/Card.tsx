import React from 'react';
import styles from './Card.module.css';
import { Typography } from '@deliveryhero/armor';


interface ICard {
  title: string;
  value: number;
}

export const Card: React.FC<ICard> = ({ title, value }) => {
  return (
    <div className={styles.card}>
      <Typography className={styles.title} paragraph>{title}</Typography>
      <Typography className={styles.value} pageTitle>{value}</Typography>
    </div>
  )
}
