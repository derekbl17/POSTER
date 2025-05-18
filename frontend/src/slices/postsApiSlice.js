import { apiSlice } from "./apiSlice";
const POSTS_URL="/api/posts"

export const postsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        create:builder.mutation({
            query:(data)=>({
                url: `${POSTS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Post"],
        }),
        getCategories: builder.query({
            query: () => `/api/categories`,
            providesTags: ["Category"],
        })
    })
})

export const {useCreateMutation, useGetCategoriesQuery} = postsApiSlice