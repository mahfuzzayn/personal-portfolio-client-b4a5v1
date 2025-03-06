"use server";

export const getUser = async (email: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/users/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const user = await res.json();

    return user;
};
