import React from 'react';
import { useBaseApiContext } from 'modules/common/context';
import { ApolloError } from '@apollo/client';

type ResponseErrors = (ApolloError | undefined)[];

export const useHandleErrors = (...errors: ResponseErrors) => {
  const baseApi = useBaseApiContext();

  React.useEffect(() => {
    errors.forEach((error) => {
      if (error) {
        baseApi.alert.set(error.message, {
          variant: 'error'
        });
      }
    });
  }, [...errors]);
};
