import { TUser } from "./user.types";

export type TProject = {
    _id: string;
    title: string;
    creator: TUser;
    images: TImage[];
    links: TLink[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TLink = {
    label: string;
    href: string;
};

export type TImage = {
    src: string;
    alt: string;
};

export interface projectParams {
    params: Promise<{ projectId: string }>;
}
