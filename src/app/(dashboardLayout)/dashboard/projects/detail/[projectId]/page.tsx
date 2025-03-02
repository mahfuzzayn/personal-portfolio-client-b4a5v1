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

    return { title: `${projectData?.title} ‣ Project Detail ‣ Personal Portfolio` };
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

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/projects">
                    <Button className="bg-secondary hover:!bg-secondary">
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
