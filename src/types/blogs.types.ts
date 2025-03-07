import { TUser } from "./user.types";

export type TBlog = {
    _id: string;
    title: string;
    content: string;
    author: TUser;
    image: string;
    category:
        | "Web Development"
        | "Programming"
        | "Tech News"
        | "Personal Projects"
        | "Career & Productivity"
        | "AI & Machine Learning"
        | "Design & UI/UX"
        | "Other";
    createdAt: Date;
    updatedAt: Date;
};

export interface blogParams {
    params: Promise<{ blogId: string }>;
}