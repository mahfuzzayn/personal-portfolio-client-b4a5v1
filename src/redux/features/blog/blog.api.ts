import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addBlog: builder.mutation({
            query: (data) => ({
                url: "/blogs/create-blog",
                method: "POST",
                body: data,
            }),
        }),
        getAllBlogs: builder.query({
            query: (data) => ({
                url: `/blogs?authorId=${data.email}`,
                method: "GET",
            }),
        }),
        deleteBlog: builder.mutation({
            query: (data) => ({
                url: `/blogs/${data._id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useAddBlogMutation, useGetAllBlogsQuery, useDeleteBlogMutation } = blogApi;
