"use server"

type UserData = {
    email: string;
}

export const getUser = async (data: UserData) => {
    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
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
