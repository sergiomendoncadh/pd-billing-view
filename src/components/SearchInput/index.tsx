import React from 'react';
import { TextInput } from '@deliveryhero/armor';

interface ISearchInputProps {
  handleFilterQuery: Function;
  filterQuery: {
    searchInput: string;
    dropdownStatus: number;
  };
}

export const SearchInput: React.FC<ISearchInputProps> = ({handleFilterQuery, filterQuery}) => {
  return (
    <TextInput
      label='Enter Order Code'
      name='order_code'
      value={filterQuery.searchInput}
      onChange={(event) => handleFilterQuery({...filterQuery, searchInput: event.target.value})}
      width={100}
      marginRight={5}
    />
  );
};
