import React from 'react';

const NoResults = ({value}) => {
    return <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center gap-4">
            <img src="../../images/no_results.svg" className="h-[250px] w-[250px]" alt=""/>
            <div>No results were found for <span className="font-bold">{value}</span>.</div>
            <div className="text-xl">Try with other keywords!</div>
        </div>
    </div>;
};

export default NoResults;
