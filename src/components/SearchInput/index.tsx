import React from 'react';
import { TextInput } from '@deliveryhero/armor';

export const SearchInput: React.FC = () => {
  const [searchCodeValue, setSearchCodeValue] = React.useState('');

  return (
    <TextInput
      label='Enter Order Code'
      name='order_code'
      value={searchCodeValue}
      onChange={(event) => {
        setSearchCodeValue(event.target.value);
      }}
      width={100}
      marginRight={5}
    />
  );
};
