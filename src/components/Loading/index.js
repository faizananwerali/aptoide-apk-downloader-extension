import React from 'react';
import Skeleton from "../Skeleton";

const Loading = () => {
    const arr = new Array(5).fill(0);
    return <>
        {arr.map((_, i) => (
            <>
                <div key={i} className="flex p-4 gap-2.5">
                    <Skeleton className="h-16 w-16" />
                    <div className="flex grow flex-col gap-2.5">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <div className="flex gap-2.5">
                        <Skeleton className="h-16 w-[122px]" />
                        <Skeleton className="h-16 w-[151px]" />
                    </div>
                </div>
                <hr className="h-px my-2 bg-gray-200 border-0 " />
            </>
        ))}
    </>;
};

export default Loading;
