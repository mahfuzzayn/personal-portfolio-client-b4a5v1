"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
    { name: "TypeScript", percentage: 85, color: "bg-destructive" },
    { name: "Next.js", percentage: 75, color: "bg-destructive" },
    { name: "React", percentage: 85, color: "bg-destructive" },
    { name: "Express.js", percentage: 80, color: "bg-destructive" },
    { name: "MongoDB", percentage: 90, color: "bg-destructive" },
    { name: "TailwindCSS", percentage: 90, color: "bg-destructive" },
    { name: "Node.js", percentage: 85, color: "bg-destructive" },
    { name: "WordPress", percentage: 60, color: "bg-destructive" },
];

const Skills = () => {
    return (
        <section className="text-foreground py-12 px-8 md:px-16 mt-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
                Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-full gap-16">
                {skills.map((skill, index) => (
                    <div key={index} className="w-full relative">
                        <>
                            <span className="text-2xl md:text-3xl font-extrabold absolute top-4 left-4">
                                {skill.name}
                            </span>
                            <span className="text-2xl font-bold absolute right-4">
                                {skill.percentage}%
                            </span>
                        </>
                        <div className="w-full h-8 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${skill.percentage}%` }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    delay: index * 0.2,
                                }}
                                className={`h-full ${skill.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
