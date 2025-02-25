import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import React from 'react';

const ViewBlogPage = () => {
    return (
        <>
            <div className="m-4">
                <Link href="/dashboard/blogs">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Blogs
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default ViewBlogPage;