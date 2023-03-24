import * as Types from '../types.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrderListQueryVariables = Types.Exact<{
  filter: Types.FilterQueryInput;
}>;


export type GetOrderListQuery = { __typename?: 'Query', billingViewOrderList: { __typename?: 'OrderList', Orders: Array<{ __typename?: 'OrderItem', Status: string, LatestEventType?: string | null, OrderCode: string, VendorCode: string, OrderUpdatedAt?: string | null, IsBillable?: boolean | null, EntityId?: string | null, OrderPlacedAt?: string | null } | null>, PagingKey: { __typename?: 'PagingKeyType', flow?: string | null, orderCode?: string | null, orderPlacedAt?: string | null } } };


export const GetOrderListDocument = gql`
    query GetOrderList($filter: FilterQueryInput!) {
  billingViewOrderList(filter: $filter) {
    Orders {
      Status
      LatestEventType
      OrderCode
      VendorCode
      OrderUpdatedAt
      IsBillable
      EntityId
      OrderPlacedAt
    }
    PagingKey {
      flow
      orderCode
      orderPlacedAt
    }
  }
}
    `;

/**
 * __useGetOrderListQuery__
 *
 * To run a query within a React component, call `useGetOrderListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetOrderListQuery(baseOptions: Apollo.QueryHookOptions<GetOrderListQuery, GetOrderListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderListQuery, GetOrderListQueryVariables>(GetOrderListDocument, options);
      }
export function useGetOrderListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderListQuery, GetOrderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderListQuery, GetOrderListQueryVariables>(GetOrderListDocument, options);
        }
export type GetOrderListQueryHookResult = ReturnType<typeof useGetOrderListQuery>;
export type GetOrderListLazyQueryHookResult = ReturnType<typeof useGetOrderListLazyQuery>;
export type GetOrderListQueryResult = Apollo.QueryResult<GetOrderListQuery, GetOrderListQueryVariables>;