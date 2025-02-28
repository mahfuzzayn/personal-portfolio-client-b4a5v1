import MessageDetail from "@/components/shared/admin/messages/MessageDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({
    params,
}: {
    params: { messageId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/messages/${params.messageId}`
    );

    const { data: messageData } = await res.json();

    return { title: `${messageData?.name} ‣ Message Detail ‣ Personal Portfolio` };
};

const DashboardBlogDetailPage = async ({ params }: { params: { messageId: string } }) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/messages/${params.messageId}`
    );

    const { data: messageData } = await res.json();

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/messages">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Messages
                    </Button>
                </Link>
            </div>
            <MessageDetail message={messageData} />
        </>
    );
};

export default DashboardBlogDetailPage;
