import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { registerUser } from "./actions/registerUser";
import { getUser } from "./actions/getUser";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            try {
                if (user) {
                    let existingUser = await getUser({
                        email: user?.email as string,
                    });

                    if (!existingUser.success) {
                        const newUser = {
                            name: user.name as string,
                            email: user.email as string,
                        };
                        existingUser = await registerUser(newUser);
                    }

                    token.id = existingUser?._id || user.id;
                }
            } catch (error) {
                console.error("❌ Error in jwt callback:", error);
            }

            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },

    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
