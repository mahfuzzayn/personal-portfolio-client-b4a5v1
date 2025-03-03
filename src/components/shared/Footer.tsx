import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-white text-center py-6 px-5 space-y-4 mt-20">
            <p>
                © {new Date().getFullYear()} Personal Project. All rights
                reserved
            </p>
            <p>
                Developed by{" "}
                <span className="text-accent font-medium hover:text-primary transition-all">
                    <Link href="https://github.com/mahfuzzayn/" target="_blank">
                        Mahfuz Zayn
                    </Link>
                </span>
            </p>
        </footer>
    );
};

export default Footer;
