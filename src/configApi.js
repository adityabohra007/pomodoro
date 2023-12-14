import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/pomo/configuration',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            console.log(token)
            if (token) {
                console.log('Status token adding')
                // headers.set('Authorization', `Bearer ${token}`)
                headers.set('Content-Type', 'application/json')
                // console.log(headers, 'insider ');
            }
            console.log(headers, 'header ')
            return headers
        },
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => ({ url: '' })
        }),
    })
})
export const { useGetConfigQuery } = configApi;