import ProjectDetail from "@/components/shared/user/projects/ProjectDetail";
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
            "Explore the full details of your project, including progress, tasks, and more. Stay on top of your project's status and make informed decisions.",
    };
};

const DashboardProjectDetailPage = async ({ params }: projectParams) => {
    const { projectId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}`);

    const { data: projectData } = await res.json();

    if (!projectData) {
        return (
            <>
                <div className="m-10">
                    <Link href="/dashboard/projects">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Projects
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-y-5 my-40 text-foreground justify-center items-center text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">project</span> detail
                    </h2>
                    <p>Project ID: {projectId}</p>
                    <Link href="/dashboard/projects">
                        <Button className="bg-secondary text-primary hover:!bg-secondary">
                            <ArrowLeft />
                            Projects
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/projects">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
            </div>
            <ProjectDetail project={projectData} />
        </>
    );
};

export default DashboardProjectDetailPage;
