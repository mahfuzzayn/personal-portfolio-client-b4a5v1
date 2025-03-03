import Messages from "@/components/shared/user/messages/Messages";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DashboardMessagesPage = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/messages`);

    const { data: messagesData } = await res.json();

    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold text-white">Messages</h2>
            </div>
            <Messages messages={messagesData} />
        </>
    );
};

export default DashboardMessagesPage;
