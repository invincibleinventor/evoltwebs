Evolt is an open source content based social publishing platform that provides content freedom to creators. Very WIP. Uses NextJS and Tailwind for the frontend and Supabase as a serverless backend.

### Features

- Sign In Through Google OAuth
- Persistent Sign In Session
- Create Posts, Edit Or Delete Them
- Like Posts
- Bookmark Posts
- Comment On Posts
- Like Comments
- User Profile with Profile Picture and Cover Image
- Ability to edit profile
- Follow Users
- Notification System
- Full Text Search on Posts , People and Bookmarks
- more to come...

### Tech Stack

- NextJS + TailwindCSS for frontend
- React-Markdown to render Markdown
- MDXEditor for Markdown Editor component
- Supabase as a serverless backend
- Google OAuth for Google Sign In

### Note (NextJS 13+)

- The project utilizes NextJS 13+ (Server Actions)
- Client and Server components are seperated in proper bounds. Intensive tasks are loaded through the server and interactivity is done through client components
- This project therefore demands a good knowledge on NextJS 13 Server Actions & Client Components

### For Contributors

- Create a local copy of this project
- Create a local .env.local file with the following
- ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  ```
- IMPORTANT: Add the .env.local file to .gitignore if you want your keys to stay private
- Enable Google OAuth in Supabase. Follow official Supabase docs for clear instructions
- Make sure to deploy the env variables when using a hosting provider.
