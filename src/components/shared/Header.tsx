"use client";

import {
    FolderOpenDot,
    House,
    MenuIcon,
    Rss,
    UserRound,
    X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header
            className={`flex flex-col md:flex-row md:justify-between md:items-center py-5 px-10 bg-secondary text-white relative transition-all overflow-hidden ${
                isMenuOpen ? "h-[250px]" : "h-[80px]"
            }`}
        >
            <Link href="/">
                <h2 className="text-2xl font-bold my-[4px]">
                    Personal Portfolio
                </h2>
            </Link>
            <nav className="hidden md:block">
                <ul className="flex gap-x-5">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-accent transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className="hover:text-accent transition-colors"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className="hover:text-accent transition-colors"
                        >
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="hover:text-accent transition-colors"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className={`${isMenuOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col gap-y-2 mt-5">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                        >
                            <House size={18} className="mb-0.5" /> Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                        >
                            <FolderOpenDot size={18} className="mb-0.5" />
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                        >
                            <Rss size={18} className="mb-0.5" />
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="flex items-center gap-x-2 hover:text-accent transition-colors"
                        >
                            <UserRound size={18} className="mb-0.5" />
                            Contact
                        </Link>
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
