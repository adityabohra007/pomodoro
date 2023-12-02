import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/pomo/configuration' }),
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => ({ url: '' })
        }),
    })
})
export const { useGetConfigQuery } = configApi;