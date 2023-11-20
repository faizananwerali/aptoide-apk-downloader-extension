import React from 'react';
import { twMerge } from 'tailwind-merge';
import VersionNumber from "../VersionNumber";

const Title = ({ className = '', name, packageName, vername }) => {
    return (
        <div className={twMerge(
                 'flex grow flex-col gap-1',
                 className,
             )}>
            <span className="text-sm">{name}</span>
            {packageName && (
                <span className="text-xs">{packageName}</span>
            )}
            {vername && (
                <VersionNumber vername={vername} />
            )}
        </div>
    );
};

export default Title;
