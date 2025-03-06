import { Pagination } from "@/components/shared/public/blogs/Pagination";
import Projects from "@/components/shared/public/projects/Projects";
import { notFound } from "next/navigation";

const fetchProjects = async (page: number) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/projects?page=${page}&limit=5`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) return notFound();

    return res.json();
};

const ProjectsPage = async ({
    searchParams,
}: {
    searchParams?: { page?: string };
}) => {
    const page = Number(searchParams?.page) || 1;
    const { data: projectsData, meta } = await fetchProjects(page);

    return (
        <section className="min-h-screen pb-20 px-10 my-20">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center">
                Innovate & Build: Discover Our Latest{" "}
                <span className="text-destructive">Projects</span>
            </h2>
            <Projects projects={projectsData} />
            <div className="flex justify-center mt-20">
                <Pagination currentPage={page} totalPages={meta.totalPage} />
            </div>
        </section>
    );
};

export default ProjectsPage;
