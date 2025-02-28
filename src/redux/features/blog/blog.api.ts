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
        getSingleBlog: builder.query({
            query: (data) => ({
                url: `/blogs/${data._id}`,
                method: "GET",
            }),
        }),
        updateBlog: builder.mutation({
            query: (args) => ({
                url: `/blogs/${args?._id}`,
                method: "PATCH",
                body: args.data,
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

export const {
    useAddBlogMutation,
    useGetAllBlogsQuery,
    useGetSingleBlogQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
