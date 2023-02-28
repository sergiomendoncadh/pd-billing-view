import * as Types from '../types.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSummarizedDataQueryVariables = Types.Exact<{
  filter: Types.SummarizedDataInput;
}>;


export type GetSummarizedDataQuery = { __typename?: 'Query', summarizedData: { __typename?: 'SummarizedData', ordersSentCount?: number | null, ordersFailedPercentage?: number | null, ordersTotalCount?: number | null } };


export const GetSummarizedDataDocument = gql`
    query getSummarizedData($filter: SummarizedDataInput!) {
  summarizedData(filter: $filter) {
    ordersSentCount
    ordersFailedPercentage
    ordersTotalCount
  }
}
    `;

/**
 * __useGetSummarizedDataQuery__
 *
 * To run a query within a React component, call `useGetSummarizedDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSummarizedDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSummarizedDataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetSummarizedDataQuery(baseOptions: Apollo.QueryHookOptions<GetSummarizedDataQuery, GetSummarizedDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSummarizedDataQuery, GetSummarizedDataQueryVariables>(GetSummarizedDataDocument, options);
      }
export function useGetSummarizedDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSummarizedDataQuery, GetSummarizedDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSummarizedDataQuery, GetSummarizedDataQueryVariables>(GetSummarizedDataDocument, options);
        }
export type GetSummarizedDataQueryHookResult = ReturnType<typeof useGetSummarizedDataQuery>;
export type GetSummarizedDataLazyQueryHookResult = ReturnType<typeof useGetSummarizedDataLazyQuery>;
export type GetSummarizedDataQueryResult = Apollo.QueryResult<GetSummarizedDataQuery, GetSummarizedDataQueryVariables>;
