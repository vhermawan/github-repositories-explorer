# GitHub Repositories Explorer

## Overview

This application allows users to search for GitHub users and explore their repositories. Users can:

- Search for up to 5 GitHub users with usernames similar to the input value
- Select a user to view all their public repositories
- Click on repository names to visit them on GitHub

## Features

- User search functionality with GitHub API integration
- Display of user search results with avatars
- Repository listing for selected users
- Responsive design for mobile and desktop views
- Error handling with user-friendly messages
- Loading states with skeleton for better UX
- Keyboard navigation support

## Technologies Used

- React 19
- TypeScript
- Vite (for fast development and building)
- GitHub REST API v3
- Shadcn UI
- Axios

## Live Demo

The application is deployed on GitHub Pages and can be accessed at: [https://github-repositories-explorer-alpha.vercel.app/](https://github-repositories-explorer-alpha.vercel.app/)

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn or bun
- In this project is use bun

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-repositories-explorer.git
   cd github-repositories-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   bun
   ```

3. Copy `env.example` to `.env` and fill in the correct URLs and other necessary environment variables.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## API Usage

This application uses the GitHub REST API v3. The specific endpoints used are:

- `GET /search/users?q={query}&per_page=5` - To search for users
- `GET /users/{username}/repos` - To get a user's repositories

## UX Features

- Keyboard support:
  - Press Enter to submit search
  - Press Escape to clear search input
- Skeleton indicators for search operations
- Error handling with friendly messages
- Responsive design for all device sizes
- Visual feedback for selected users

## Testing

To run the tests:

```bash
npm run test
# or
yarn test
```

## Future Improvements

- Add pagination for repositories
- Add sorting options for repositories
- Add redirect to detail repository
- Add dark mode support

## License

MIT
