import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from './commomns';
const baseQuery = fetchBaseQuery({
    baseUrl: url + '/pomo/',
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
})
export const timerApi = createApi({
    reducerPath: 'timerApi',
    baseQuery: baseQuery,
    tagTypes: ['status'],
    endpoints: (builder) => ({
        startTimer: builder.mutation({
            query: (body) => ({
                url: `timer/start`,
                method: 'POST',
                body
            }),

        }),
        pauseTimer: builder.mutation({
            query: (body) => ({
                url: 'timer/update',
                method: 'POST',
                body
            })
        }),
        resumeTimer: builder.mutation({
            query: (body) => ({
                url: 'timer/update',
                method: 'POST',
                body
            })
        }),
        completeTimer: builder.mutation({
            query: (body) => ({
                url: 'timer/update',
                method: 'POST',
                body
            }),
            invalidatesTags: ['status']
        }),
        status: builder.query({
            query: (current_time) => ({
                url: 'timer/status',
            }),
            providesTags: ['status']
        }),
        breakTimerStart: builder.mutation({
            query: (body) => ({
                url: '/break/create',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['status']

        }),
        breakTimerStop: builder.mutation({
            query: (body) => ({
                url: '/break/stop',
                method: 'POST',
            }),
            invalidatesTags: ['status']

        })



    }),
})

export const {
    useStartTimerMutation,
    usePauseTimerMutation,
    useCompleteTimerMutation,
    useStatusQuery,
    useResumeTimerMutation,
    useBreakTimerStartMutation,
    useBreakTimerStopMutation
} = timerApi;