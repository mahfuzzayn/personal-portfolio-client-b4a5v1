export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path",
        "/dashboard/:path/:path",
        "/dashboard/:path/:path/:path",
    ],
};
