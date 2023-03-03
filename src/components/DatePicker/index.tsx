import React from 'react';
import { Box } from '@deliveryhero/armor';
import { DateRangePicker } from '@deliveryhero/armor-datepicker';
import { format } from 'date-fns';
import styles from './DatePicker.module.css';

export const DatePicker: React.FC = () => {
  const [dateValue, setDateValue] = React.useState<[Date, Date]>();
  const formatDateTime = (value: unknown) => format(
    value instanceof Date ? value : new Date(value as string),
    'hh:mm dd.MM.yyyy'
  );
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
  const prevPrevMonth = prevMonth - 1;

  const prevMonthYear = prevMonth >= 10 ? currentYear - 1 : currentYear;
  const prevPrevYear = prevPrevMonth >= 10 ? currentYear - 1 : currentYear;

  const getDays = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const totalDays = getDays(prevMonthYear, prevMonth) + getDays(prevPrevMonth, prevPrevYear);

  return (
    <Box className={styles.dateRangePicker}>
      <DateRangePicker label='Select a date range' dateValue={dateValue} onDateValueChange={(newValue) => setDateValue(newValue)} width={'300px'} formatDateTime={formatDateTime} allowedDateRanges={[[`current-${totalDays}`, 'current']]} />
    </Box>
  );
};
