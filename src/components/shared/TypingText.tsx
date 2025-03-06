"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const texts = [
    "TypeScript Technocrat",
    "Express & Mongoose Master",
    "NoSQL Backend Brainiac",
    "Redux Reaper",
    "Next.JS Ninja",
];

const TypingText = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 120;
    const deletingSpeed = 60;
    const pauseTime = 1200;

    useEffect(() => {
        const currentText = texts[textIndex];
        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
                if (displayedText === "") {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setDisplayedText((prev) =>
                    currentText.slice(0, prev.length + 1)
                );
                if (displayedText === currentText) {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, textIndex]);

    return (
        <motion.div
            className="text-3xl font-bold text-destructive my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayedText}
            <span className="animate-blink">|</span>
        </motion.div>
    );
};

export default TypingText;
