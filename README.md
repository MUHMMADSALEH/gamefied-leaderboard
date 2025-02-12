# Gamified Educational Platform Leaderboard

A leaderboard feature for a gamified educational platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- Search users by name
- Filter users by attempt count range
- Display user statistics including:
  - Total attempts
  - Total score
  - Average score
- Responsive design with Tailwind CSS
- Real-time data updates with refresh button

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- Supabase account and project

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd gamified-leaderboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database with the following tables:

### Users Table
```sql
create table users (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null
);
```

### Attempts Table
```sql
create table attempts (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  email text references users(email) not null,
  score integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000/leaderboard](http://localhost:3000/leaderboard) in your browser.

## Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.io/) - Backend and database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel](https://vercel.com/) - Deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 