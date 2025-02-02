import React, { useState } from 'react';



interface SearchComponentProps {
    setSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length > 2) {
            console.log('Search term is ', event.target.value);
            setSearch(event.target.value);
        }
    };
    

    // const handleSearch = () => {
    //     console.log('Searching for:', searchTerm);
       
    // };

    return (
        <div className="flex items-center justify-center p-4">
            <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-64"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={handleInputChange}
                // onKeyDown={(event) => {
                  
                //     if (event.key === 'Enter') {
                //         if((event.target as HTMLInputElement).value.length > 2){
                //         handleSearch();
                //         }
                //     }
                // }}
            />
            {/* <div
                className="ml-2 bg-blue-500 text-white rounded-lg p-2"
                onClick={handleSearch}
            >
                Search
            </div> */}
        </div>
    );
};

export default SearchComponent;