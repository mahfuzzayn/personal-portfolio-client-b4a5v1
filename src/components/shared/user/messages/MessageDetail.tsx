import { TMessage } from "@/types";
import React from "react";
import moment from "moment";
import Link from "next/link";
const MessageDetail = ({ message }: { message: TMessage }) => {
    return (
        <section className="m-10">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
                Message by <span className="text-accent">{message.name}</span>
            </h2>
            <div className="text-gray-200 mt-10 text-lg space-y-4">
                <p className="font-bold">
                    Sender name:{" "}
                    <span className="font-normal text-accent">
                        {message.name}
                    </span>
                </p>
                <p className="font-bold">
                    Sender email:{" "}
                    <Link href={`mailto:${message.email}`} className="font-medium text-muted">
                        {message.email}
                    </Link>
                </p>
                <p className="font-bold text-justify">
                    Message:{" "}
                    <span className="font-normal">{message.message}</span>
                </p>
                <p className="font-bold !mt-10">
                    Submitted on:{" "}
                    <span className="font-normal">
                        {moment(message?.createdAt).format(
                            "D MMMM, YYYY [at] h:mm A"
                        )}
                    </span>
                </p>
                {message.createdAt !== message.updatedAt && (
                    <p className="font-bold">
                        Updated on:{" "}
                        <span className="font-normal">
                            {moment(message?.updatedAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default MessageDetail;
