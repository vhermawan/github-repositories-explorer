import SearchForm from "@/components/SearchForm";
import { useState } from "react";

export default function Home(){
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => {
    setSearchQuery(query);
    // setSearchInitiated(true);
    // setSelectedUser(null);
  };

	//add reset query when the query is 

	return (
		<div className='flex justify-center items-center'>
			 <div className="container py-6 mx-auto px-4 max-w-4xl">
				<header className="text-center mb-8">
          <h1 className="text-5xl font-bold">GitHub Repositories Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Search for GitHub users and explore their repositories
          </p>
        </header>

				<SearchForm 
          onSearch={handleSearch} 
          isLoading={false} 
        />
				{searchQuery ? <p>Showing users for "{searchQuery}"</p> : null}


				<footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>GitHub Repositories Explorer &copy; {new Date().getFullYear()}</p>
        </footer>
			 </div>
		</div>
	)
}