export default function Home(){
	return (
		<div className='flex justify-center items-center'>
			 <div className="container py-6 mx-auto px-4 max-w-4xl">
				<header className="text-center mb-8">
          <h1 className="text-5xl font-bold">GitHub Repositories Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Search for GitHub users and explore their repositories
          </p>
        </header>

				 <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>GitHub Repositories Explorer &copy; {new Date().getFullYear()}</p>
        </footer>
			 </div>
		</div>
	)
}