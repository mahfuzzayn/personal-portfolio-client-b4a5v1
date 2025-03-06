"use client";

import React from "react";
import Image from "next/image";
import googleLogo from "../../../assets/icons/google-logo.png";
import githubLogo from "../../../assets/icons/github-logo.png";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LoginPage = () => {
    const handleLogin = async (provider: string) => {
        await signIn(provider, {
            callbackUrl: "http://localhost:3000/",
        });
    };

    return (
        <section className="flex justify-center min-h-screen">
            <div className="flex flex-col justify-center items-center text-center text-foreground p-10 gap-y-5">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 md:mb-10">
                    Login with Ease
                </h2>
                <Button
                    className="w-full max-w-[420px] bg-foreground text-background p-6 hover:bg-foreground text-md"
                    onClick={() => handleLogin("google")}
                >
                    <Image
                        src={googleLogo}
                        height={32}
                        width={32}
                        alt="Google Logo"
                    />
                    Continue with Google
                </Button>
                <Button
                    className="w-full max-w-[420px] bg-destructive text-white p-6 hover:bg-destructive text-md"
                    onClick={() => handleLogin("github")}
                >
                    <Image
                        src={githubLogo}
                        height={32}
                        width={32}
                        alt="Google Logo"
                    />
                    Continue with Github
                </Button>
                <p className="text-foreground max-w-[350px] mt-5 md:mt-10">
                    Click on any provider to{" "}
                    <span className="text-muted">login</span> and continue
                    exploring
                </p>
            </div>
        </section>
    );
};

export default LoginPage;
