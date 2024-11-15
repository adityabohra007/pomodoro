import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./commomns";

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: url + '/pomo/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            // console.log('tttttt', token);
            // console.log(token, 'token');;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                headers.set('Content-Type', 'application/json')
                // console.log(headers, 'insider ');
            }
            // console.log(headers, 'header ')
            return headers
        },
        credentials: 'include'
    }),
    tagTypes: ['dashboard'],
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({ url: 'dashboard' }),
            providesTags: ['dashboard']
        }),
        barchart: builder.query({
            query: (mode) => ({ url: 'dashboard/barchart?' + mode })
        })

        // createTask
    })
})
export const {
    useDashboardQuery, useBarchartQuery
} = dashboardApi;