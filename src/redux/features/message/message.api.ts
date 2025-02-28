import { baseApi } from "@/redux/api/baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addMessage: builder.mutation({
            query: (data) => ({
                url: "/messages/create-message",
                method: "POST",
                body: data,
            }),
        }),
        getSingleMessage: builder.query({
            query: (data) => ({
                url: `/messages/${data.messageId}`,
                method: "GET",
            }),
        }),
        getAllMessages: builder.query({
            query: () => ({
                url: "/messages",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useAddMessageMutation,
    useGetSingleMessageQuery,
    useGetAllMessagesQuery,
} = messageApi;
