import React, { useState } from 'react';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
       
    };

    return (
        <div className="flex items-center justify-center p-4">
            <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-64"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button
                className="ml-2 bg-blue-500 text-white rounded-lg p-2"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchComponent;