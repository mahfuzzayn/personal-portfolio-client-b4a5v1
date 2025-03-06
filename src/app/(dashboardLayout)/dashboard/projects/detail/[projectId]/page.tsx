import ProjectDetail from "@/components/shared/user/projects/ProjectDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({
    params,
}: {
    params: { projectId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${params.projectId}`
    );

    const { data: projectData } = await res.json();

    return {
        title: `${
            projectData?.title ? projectData?.title : "404"
        } ‣ Project Detail ‣ Personal Portfolio`,
    };
};

const DashboardProjectDetailPage = async ({
    params,
}: {
    params: { projectId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${params.projectId}`
    );

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
                <div className="flex flex-col gap-y-5 min-h-screen text-foreground justify-center items-center text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">project</span> detail
                    </h2>
                    <p>Project ID: {params.projectId}</p>
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
