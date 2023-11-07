import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API}`
    }),
    endpoints: (builder) => ({
        getDataByName: builder.query({
            query: (name: string) => ({
                url: `/${name}`,
                method: 'GET',
                headers: {
                    'api_key': `${import.meta.env.VITE_API_KEY}`
                }
            })
        })
    })
})

export const { useGetDataByNameQuery } = userApi;