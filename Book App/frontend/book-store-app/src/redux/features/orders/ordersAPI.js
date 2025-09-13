import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/orders`,
    credentials: 'include',
})

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery,
    tagTypes: ['Orders'],
    endpoints: (builders) => ({
        createOrder: builders.mutation({
            query: (newOrder) => ({
                url: '/',
                method: 'POST',
                body: newOrder,
            }),
        }),
        getOrdersByEmail: builders.query({
            query: (email) => ({
                url: `/${email}`,
            }),
            providesTags: ['Orders']
        })
    })
});

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = orderApi;
export default orderApi;