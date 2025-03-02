import { baseApi } from "@/redux/api/baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProject: builder.mutation({
            query: (data) => ({
                url: "/projects/create-project",
                method: "POST",
                body: data,
            }),
        }),
        getSingleProject: builder.query({
            query: (args) => ({
                url: `/projects/${args.projectId}`,
                method: "GET",
            }),
        }),
        getAllProjects: builder.query({
            query: () => ({
                url: "/projects/",
                method: "GET",
            }),
        }),
        updateProject: builder.mutation({
            query: (args) => ({
                url: `/projects/${args.projectId}`,
                method: "PATCH",
                body: args.data,
            }),
        }),
        deleteProject: builder.mutation({
            query: (args) => ({
                url: `/projects/${args.projectId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAddProjectMutation,
    useGetSingleProjectQuery,
    useGetAllProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;
