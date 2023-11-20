import React from 'react';

const SearchInput = ({ value, onChange, onClick }) => {
    return (
        <div className="relative p-4 w-full sm:max-w-2xl sm:mx-auto">
            <div className="overflow-hidden z-0 rounded-full relative p-3">
                <div className="relative flex z-50 bg-white rounded-full">
                    <input className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                           type="text"
                           placeholder="Search any App here..."
                           value={value}
                           onChange={onChange}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   onClick(e); // Call your onClick function here
                               }
                           }}
                    />
                    <button
                        className="bg-indigo-500 text-white rounded-full font-semibold
                        px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none" onClick={onClick}>Search</button>
                </div>
                <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
                <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
                <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
                <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
            </div>
        </div>
    );
};

export default SearchInput;
