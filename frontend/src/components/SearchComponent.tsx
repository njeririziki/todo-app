import React, { useState } from 'react';



interface SearchComponentProps {
    setSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ setSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length > 2) {
           
            setSearch(event.target.value);
        }
    };
   

    return (
        <div className="flex items-center justify-center p-4">
            <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-64"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={() => {
                    if (searchTerm === '') {
                       
                        setSearch(searchTerm);
                    }
                }}
               
            />
          
        </div>
    );
};

export default SearchComponent;