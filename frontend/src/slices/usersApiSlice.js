import { apiSlice } from "./apiSlice";
const USERS_URL='/api/users'

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUserDetails: builder.query({
            query:()=>`${USERS_URL}/me`,
            providesTags: ['User']
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useGetUserDetailsQuery } = usersApiSlice