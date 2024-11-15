import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./commomns";

export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  url +'/pomo/configuration',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            console.log(token)
            if (token) {
                console.log('Status token adding')
                headers.set('Authorization', `Bearer ${token}`)
                headers.set('Content-Type', 'application/json')
                // console.log(headers, 'insider ');
            }
            // console.log(headers, 'header ')
            return headers
        },
        credentials: 'include'
    }),
    tagTypes: ['config'],
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => ({ url: '' }),
            providesTags: ['config'],
        }),
        updateConfig: builder.mutation({
            query: (body) => ({
                url: 'update/',
                method: 'POST',
                body
            }),
            invalidatesTags: ['config']
        })
    })
})
export const { useGetConfigQuery, useUpdateConfigMutation } = configApi;