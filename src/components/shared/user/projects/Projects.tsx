import { TLink, TProject } from "@/types";
import moment from "moment";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DeleteProjectModal from "./DeleteProjectModal";
import { ArrowUpRight, Inbox } from "lucide-react";

const Projects = ({ projects }: { projects: TProject[] }) => {
    if (!projects?.length) {
        return (
            <div className="my-40 text-center text-foreground space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                    No <span className="text-destructive">Projects</span> were
                    found
                </h2>
                <p className="text-foreground flex justify-center items-center gap-x-1">
                    Start by creating your first project! <Inbox size={16} />
                </p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-10 mb-20 gap-10 max-w-[1268px]">
            {projects.map((project, index: number) => (
                <div
                    key={project._id}
                    className="text-white bg-muted rounded-xl"
                >
                    <div className="p-4 md:p-6 space-y-5">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            {project.title}
                        </h2>
                    </div>
                    <Separator className="bg-accent" />
                    <div className="p-4 md:p-6 space-y-5">
                        <ul className="flex flex-row flex-wrap gap-3 text-md md:text-lg text-gray-100">
                            {project.links.map((link: TLink, index) => (
                                <li key={index}>
                                    <Link
                                        href={`${link.href}`}
                                        className="text-foreground bg-background hover:text-destructive transition-colors px-2 py-1 rounded-md flex gap-x-1"
                                    >
                                        {link.label}
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-100">
                            <span className="font-semibold">Published on:</span>{" "}
                            {moment(project?.createdAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </p>
                    </div>
                    <Separator className="bg-accent" />
                    <div className="p-4 md:px-6 flex flex-wrap gap-4 mt-2">
                        <Link
                            href={`/dashboard/projects/detail/${project?._id}`}
                        >
                            <Button className="!bg-secondary text-black">
                                View Details
                            </Button>
                        </Link>
                        <Link
                            href={`/dashboard/projects/update/${project?._id}`}
                        >
                            <Button className="!bg-destructive text-white">
                                Update
                            </Button>
                        </Link>
                        <DeleteProjectModal project={project} />
                    </div>
                    <p className="text-xs text-gray-300 text-right mr-4 mb-2">
                        {index + 1}
                    </p>
                </div>
            ))}
        </section>
    );
};

export default Projects;
