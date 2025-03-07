"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const SearchParam = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";

    return <p>Current Page: {page}</p>;
};

export default SearchParam;
