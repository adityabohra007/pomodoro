import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { invalid } from 'moment';

export const timerApi = createApi({
    reducerPath: 'timerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/pomo/' }),
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
                url: 'timer/status?current_time=' + current_time,
                // body: { 'current_time': current_time },
                // method:'GET',
            }),
            providesTags: ['status']
        })


    }),
})

export const { useStartTimerMutation, usePauseTimerMutation, useCompleteTimerMutation, useStatusQuery, useResumeTimerMutation } = timerApi;