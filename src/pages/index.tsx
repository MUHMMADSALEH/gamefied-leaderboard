import { useRouter } from 'next/router';
import Head from 'next/head';
import { TrophyIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Gamified Educational Platform</title>
        <meta name="description" content="Welcome to our Gamified Educational Platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to Our Gamified Educational Platform
          </h1>
          
          <p className="text-xl text-gray-600">
            Track your progress and compete with others on our interactive leaderboard.
          </p>

          <button
            onClick={() => router.push('/leaderboard')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <TrophyIcon className="h-6 w-6 mr-2" />
            View Leaderboard
          </button>
        </div>
      </div>
    </>
  );
} 