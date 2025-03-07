"use client";

import {
    FolderOpenDot,
    House,
    LayoutDashboardIcon,
    LogInIcon,
    LogOutIcon,
    MenuIcon,
    Rss,
    UserRound,
    X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";
import headerLogo from "../../assets/images/perpodia-logo.png";
import Image from "next/image";

type UserProps = {
    user?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { data: session }: { data: UserProps | null } = useSession();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            window.addEventListener("mousedown", handleClickOutside);
        } else {
            window.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header
            ref={menuRef}
            className={`flex flex-col md:flex-row md:justify-between md:items-center py-5 px-10 bg-primary text-white relative transition-all overflow-hidden ${
                isMenuOpen && session?.user
                    ? "h-[350px]"
                    : isMenuOpen
                    ? "h-[320px]"
                    : "h-[80px]"
            }`}
        >
            <Link href="/" className="inline-block">
                <Image
                    src={headerLogo}
                    width={140}
                    height={80}
                    alt="Perpodia Header Logo"
                    priority
                    className="relative top-[-6px] md:top-0 h-auto w-auto max-w-[120px] md:max-w-[140px]"
                />
            </Link>
            <nav className="hidden md:block">
                <ul className="flex items-center gap-x-5">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-muted transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className="hover:text-muted transition-colors"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className="hover:text-muted transition-colors"
                        >
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="hover:text-muted transition-colors"
                        >
                            Contact
                        </Link>
                    </li>
                    {!session?.user ? (
                        <li>
                            <Link
                                href="/login"
                                className="hover:text-muted transition-colors"
                            >
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-muted transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className="hover:text-muted transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            </nav>
            <nav className={`${isMenuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col gap-y-2 mt-5">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <House size={18} className="mb-0.5" /> Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FolderOpenDot size={18} className="mb-0.5" />
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Rss size={18} className="mb-0.5" />
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <UserRound size={18} className="mb-0.5" />
                            Contact
                        </Link>
                    </li>
                    {!session?.user ? (
                        <li>
                            <Link
                                href="/login"
                                className="flex items-center gap-x-2 hover:text-accent transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogInIcon size={18} className="mb-0.5" />
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-x-2 hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LayoutDashboardIcon
                                        size={18}
                                        className="mb-0.5"
                                    />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center gap-x-2 hover:text-primary transition-colors"
                                >
                                    <LogOutIcon size={18} className="mb-0.5" />
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    <li className="mt-2">
                        <ModeToggle />
                    </li>
                </ul>
            </nav>
            <div className="md:hidden absolute top-[25px] right-10">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {!isMenuOpen ? <MenuIcon size={30} /> : <X size={30} />}
                </button>
            </div>
        </header>
    );
};

export default Header;
