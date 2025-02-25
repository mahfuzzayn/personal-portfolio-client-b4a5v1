import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardProjectsPage = () => {
    return (
        <>
            <div className="m-4">
                <Link href="/dashboard">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default DashboardProjectsPage;
