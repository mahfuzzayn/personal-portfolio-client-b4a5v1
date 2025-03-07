import MessageDetail from "@/components/shared/user/messages/MessageDetail";
import { Button } from "@/components/ui/button";
import { messageParams } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({ params }: messageParams) => {
    const { messageId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/messages/${messageId}`);

    const { data: messageData } = await res.json();

    return {
        title: `${
            messageData?.name ? messageData?.name + "'s" : "404"
        } ‣ Message Detail ‣ PerpoDia`,
        description:
            "View the details of your selected message. Read the full content, take necessary actions according to this message.",
    };
};

const DashboardBlogDetailPage = async ({ params }: messageParams) => {
    const { messageId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/messages/${messageId}`);

    const { data: messageData } = await res.json();

    if (!messageData) {
        return (
            <>
                <div className="m-10">
                    <Link href="/dashboard/messages">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Messages
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-y-5 my-40 text-foreground justify-center items-center text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">message</span> detail
                    </h2>
                    <p>Message ID: {messageId}</p>
                    <Link href="/dashboard/messages">
                        <Button className="bg-secondary text-primary hover:!bg-secondary">
                            <ArrowLeft />
                            Back to Messages
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/messages">
                    <Button className="bg-accent text-white hover:!bg-accent">
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
