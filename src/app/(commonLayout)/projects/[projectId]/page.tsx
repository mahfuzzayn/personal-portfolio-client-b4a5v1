import ProjectDetail from "@/components/shared/public/projects/ProjectDetail";
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

    const { data: blogData } = await res.json();

    return { title: `${blogData?.title} ‣ Project Detail ‣ Personal Portfolio` };
};

const BlogDetailPage = async ({ params }: { params: { projectId: string } }) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${params.projectId}`
    );

    const { data: projectData } = await res.json();

    return (
        <section className="min-h-screen pt-10 pb-20">
            <div className="m-10">
                <Link href="/projects">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
            </div>
            <ProjectDetail project={projectData} />
        </section>
    );
};

export default BlogDetailPage;
