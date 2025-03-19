import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import { useSearchUsers, useUserRepositories } from "./hooks/useGithubUsers";
import UserList from "@/components/UserList";
import type { User } from "@/types/model";

export default function Home(){
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const { 
    data: users = {
			items: [],
			incomplete_results: false,
			totalCount: 0
		},
    isFetching: isLoadingUsers
  } = useSearchUsers(searchQuery);

	 const { 
    data: repositories = [], 
    isFetching: isLoadingRepos,
  } = useUserRepositories(selectedUser?.login || '');

	const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedUser(null);
  };

	const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

	return (
		<div className='flex justify-center items-center'>
			 <div className="container py-6 mx-auto md:px-4 md:max-w-4xl">
				<header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">GitHub Repositories Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Search for GitHub users and explore their repositories
          </p>
        </header>

				<SearchForm 
          onSearch={handleSearch} 
          isLoading={isLoadingUsers} 
        />
				{searchQuery ? <p data-testid="search-query">Showing users for "{searchQuery}"</p> : null}

				<UserList 
					users={searchQuery ? users.items : []} 
					onUserSelect={handleUserSelect} 
					isLoading={isLoadingUsers}
					repositories={repositories}
					isLoadingRepos={isLoadingRepos}
				/>

				<footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>GitHub Repositories Explorer &copy; {new Date().getFullYear()}</p>
        </footer>
			 </div>
		</div>
	)
}