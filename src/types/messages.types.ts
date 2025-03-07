export type TMessage = {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface messageParams {
    params: Promise<{ messageId: string }>;
}
