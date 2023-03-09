import React from 'react';
import { useBaseApiContext } from 'modules/common/context';
import { ApolloError } from '@apollo/client';

type ResponseErrors = (ApolloError | undefined);

export const useHandleErrors = (error: ResponseErrors) => {
  const baseApi = useBaseApiContext();

  React.useEffect(() => {
    if (error) {
      baseApi.alert.set(error.message, {
        variant: 'error'
      });
    }
  }, [error]);
};
