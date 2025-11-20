'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function TestPage() {

    return (

        <div className="flex ">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-col flex gap-2">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-4" />
            </div>
        </div>
    )
}