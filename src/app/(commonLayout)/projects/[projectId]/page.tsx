import ProjectDetail from "@/components/shared/public/projects/ProjectDetail";
import { Button } from "@/components/ui/button";
import { projectParams } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({ params }: projectParams) => {
    const { projectId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}`);

    const { data: projectData } = await res.json();

    return {
        title: `${
            projectData?.title ? projectData?.title : "404"
        } ‣ Project Detail ‣ PerpoDia`,
        description:
            "Explore the details of this project, including its objectives, challenges, solutions, and the impact it has had. Learn how we approached the project and the results we achieved.",
    };
};

const ProjectDetailPage = async ({ params }: projectParams) => {
    const { projectId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}`);

    const { data: projectData } = await res.json();

    if (!projectData) {
        return (
            <>
                <div className="m-10 mt-20">
                    <Link href="/projects">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Projects
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-y-5 min-h-screen text-foreground mt-32 md:mt-40 items-center text-center mx-5">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">project</span> detail
                    </h2>
                    <p>Project ID: {projectId}</p>
                    <Link href="/projects">
                        <Button className="bg-secondary text-primary hover:!bg-secondary">
                            <ArrowLeft />
                            Back to Projects
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <section className="min-h-screen pt-10 pb-20">
            <div className="m-10">
                <Link href="/projects">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
            </div>
            <ProjectDetail project={projectData} />
        </section>
    );
};

export default ProjectDetailPage;
