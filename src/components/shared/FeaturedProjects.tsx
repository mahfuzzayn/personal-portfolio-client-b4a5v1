import { TLink, TProject } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import moment from "moment";
import { ArrowUpRight } from "lucide-react";

const FeaturedProjects = ({ projects }: { projects: TProject[] }) => {
    return (
        <section className="py-12 px-8 md:px-16 mt-10">
            <h2 className="text-foreground text-3xl md:text-4xl font-extrabold text-center mb-10">
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-10 max-w-[1268px] mx-auto">
                {projects.slice(0, 6).map((project) => (
                    <div
                        key={project._id}
                        className="text-white bg-muted rounded-xl"
                    >
                        <div className="p-4 md:p-6 md:pb-2 space-y-3">
                            <h2 className="text-2xl md:text-3xl font-semibold">
                                {project.title}
                            </h2>
                            <p className="text-md md:text-lg text-gray-100">
                                <span className="font-semibold">
                                    Description:
                                </span>{" "}
                                {project?.description.slice(
                                    0,
                                    65
                                )}
                                {"..."}
                            </p>
                            <ul className="flex flex-row flex-wrap gap-3 text-md md:text-lg text-gray-100 !my-5">
                                {project.links.map((link: TLink, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`${link.href}`}
                                            target="_blank"
                                            className="text-foreground bg-background px-2 py-1 rounded-md flex gap-x-1"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-100">
                                <span className="font-semibold">
                                    Published on:
                                </span>{" "}
                                {moment(project?.createdAt).format(
                                    "D MMMM, YYYY [at] h:mm A"
                                )}
                            </p>
                        </div>
                        <div className="px-4 md:px-6 pb-6 flex flex-wrap gap-4 mt-2">
                            <Link href={`/projects/${project?._id}`}>
                                <Button className="!bg-primary text-white">
                                    Explore Project
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProjects;
