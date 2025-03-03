import { TMessage } from "@/types";
import moment from "moment";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Messages = ({ messages }: { messages: TMessage[] }) => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-10 mb-20 gap-10 max-w-[1268px]">
            {messages.map((message, index: number) => (
                <div
                    key={message._id}
                    className="text-white bg-cyan-700 rounded-xl"
                >
                    <div className="p-4 md:p-6 space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            {message.name}
                        </h2>
                        <p className="text-md md:text-lg text-gray-100">
                            <span className="font-semibold">Content:</span>{" "}
                            {message?.message.slice(
                                0,
                                message?.message?.length * 0.2
                            )}
                            {"..."}
                        </p>
                        <p className="text-gray-100">
                            <span className="font-semibold">Submitted on:</span>{" "}
                            {moment(message?.createdAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </p>
                    </div>
                    <Separator className="bg-primary" />
                    <div className="p-4 md:px-6 flex flex-wrap gap-4 mt-2">
                        <Link href={`/dashboard/messages/detail/${message?._id}`}>
                            <Button className="!bg-primary">
                                Read More
                            </Button>
                        </Link>
                    </div>
                    <p className="text-xs text-gray-300 text-right mr-4 mb-2">
                        {index + 1}
                    </p>
                </div>
            ))}
        </section>
    );
};

export default Messages;
