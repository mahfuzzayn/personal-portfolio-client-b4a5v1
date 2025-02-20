"use server"

import { UserData } from "@/types";

export const registerUser = async (data: UserData) => {
    const res = await fetch(`${process.env.BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    const user = await res.json();

    return user;
};
