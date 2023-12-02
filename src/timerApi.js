import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timerApi = createApi({
    reducerPath: 'timerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/pomo/' }),
    endpoints: (builder) => ({
        startTimer: builder.mutation({
            query: (body) => ({
                url: `timer/start`,
                method: 'POST',
                body
            }),

        }),

    }),
})

export const { useStartTimerMutation } = timerApi;