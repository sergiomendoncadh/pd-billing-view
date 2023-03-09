import React, { createContext, FC, ReactNode, useContext } from 'react';

import { IOpsSdk } from '@deliveryhero/opsportal';

// Creating context
const BaseApiContext = createContext<IOpsSdk | undefined>(undefined);

/**
 * Context Provider with [[IOpsSdk | BaseApi]]
 */
export const BaseApiProvider: FC<BaseApiProviderProps> = ({
  children,
  baseApi
}: BaseApiProviderProps) => (
  <BaseApiContext.Provider value={baseApi}>{children}</BaseApiContext.Provider>
);

BaseApiProvider.displayName = 'BaseApiProvider';

/**
 * hook we use to get access to [[IOpsSdk | BaseApi]]
 */
export const useBaseApiContext = (): IOpsSdk => {
  const baseApi = useContext(BaseApiContext);
  if (!baseApi) {
    throw new Error('Component is beyond BaseApiContext');
  }
  return baseApi;
};

export type { IOpsSdk };

export interface BaseApiProviderProps {
  children: ReactNode;
  baseApi: IOpsSdk;
}
