import { Pagination } from "@/components/shared/public/blogs/Pagination";
import Messages from "@/components/shared/user/messages/Messages";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DashboardMessagesPage = async ({
    searchParams,
}: {
    searchParams?: { page?: string };
}) => {
    const page = Number(searchParams?.page) || 1;
    const res = await fetch(
        `${process.env.BACKEND_URL}/messages?page=${page}&limit=5`
    );

    const { data: messagesData, meta } = await res.json();

    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold text-foreground">Messages</h2>
            </div>
            <Messages messages={messagesData} />
            <div className="flex justify-center mt-20">
                <Pagination currentPage={page} totalPages={meta.totalPage} />
            </div>
        </>
    );
};

export default DashboardMessagesPage;
