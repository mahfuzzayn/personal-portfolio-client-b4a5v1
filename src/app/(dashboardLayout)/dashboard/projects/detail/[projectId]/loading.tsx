import { Spinner } from "@/components/shared/Spinner";

const BlogDetailLoadingPage = () => {
    return (
        <div className="flex gap-y-5 min-h-screen text-white justify-center items-center text-center mx-5">
            <Spinner />
        </div>
    );
};

export default BlogDetailLoadingPage;
