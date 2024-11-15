import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./commomns";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/pomo/initiate' }),
    endpoints: (builder) => ({
        fetchTask: builder.query({
            query: () => ({ url: '/' })
        })
    })
})
export const { useFetchTaskQuery } = taskApi;