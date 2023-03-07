import React from 'react';
import { Box } from '@deliveryhero/armor';
import { DateRangePicker } from '@deliveryhero/armor-datepicker';
import { format } from 'date-fns';
import styles from './DatePicker.module.css';

interface IDatePicker {
  onDateRangeSelected: (dateRange: [string, string]) => void;
}

export const DatePicker: React.FC<IDatePicker> = ({ onDateRangeSelected }) => {
  const getDefaultValue = React.useMemo<[Date, Date]>(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return [yesterday, today];
  }, []);

  const [dateValue, setDateValue] = React.useState<[Date, Date]>(() => getDefaultValue);

  const formatDateTime = (value: unknown) =>
    format(value instanceof Date ? value : new Date(value as string), 'dd.MM.yyyy');

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
  const beforePreviousMonth = prevMonth - 1;

  const prevMonthYear = prevMonth >= 10 ? currentYear - 1 : currentYear;
  const beforePreviousYear = beforePreviousMonth >= 10 ? currentYear - 1 : currentYear;

  const getDays = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const totalDays = getDays(prevMonthYear, prevMonth) + getDays(beforePreviousMonth, beforePreviousYear);

  React.useEffect(() => {
    const formattedStartDate = dateValue && format(dateValue[0], 'dd.MM.yyyy');
    const formattedEndDate = dateValue && format(dateValue[1], 'dd.MM.yyyy');
    onDateRangeSelected([formattedStartDate as string, formattedEndDate as string]);
  }, [dateValue]);

  return (
    <Box className={styles.dateRangePicker}>
      <DateRangePicker
        label='Select a date range'
        dateValue={dateValue}
        onDateValueChange={(newValue) => setDateValue(newValue)}
        width={'300px'}
        formatDateTime={formatDateTime}
        allowedDateRanges={[[`current-${totalDays}`, 'current']]}
        enableCloseOnSelect
        defaultDateValue={getDefaultValue}
      />
    </Box >
  );
};
