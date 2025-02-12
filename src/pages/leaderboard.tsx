import { useState, useEffect } from 'react';
import Head from 'next/head';
import LeaderboardTable from '@/components/LeaderboardTable';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

type ValidationError = {
  minAttempts?: string;
  maxAttempts?: string;
};

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minAttempts, setMinAttempts] = useState('');
  const [maxAttempts, setMaxAttempts] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const validateInputs = (): boolean => {
    const newErrors: ValidationError = {};
    
    // Validate minimum attempts
    if (minAttempts && !(/^\d+$/.test(minAttempts))) {
      newErrors.minAttempts = 'Minimum attempts must be a positive number';
    }

    // Validate maximum attempts
    if (maxAttempts && !(/^\d+$/.test(maxAttempts))) {
      newErrors.maxAttempts = 'Maximum attempts must be a positive number';
    }

    // Validate range if both values are present
    if (minAttempts && maxAttempts && 
        Number(minAttempts) > Number(maxAttempts)) {
      newErrors.minAttempts = 'Minimum attempts cannot be greater than maximum attempts';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (minAttempts) params.append('minAttempts', minAttempts);
      if (maxAttempts) params.append('maxAttempts', maxAttempts);

      const response = await fetch(`/api/leaderboard?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const json = await response.json();
      setData(json);
      setLastRefresh(formatTime(new Date()));
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrors({ minAttempts: 'Failed to load leaderboard data' });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize lastRefresh on client-side only
  useEffect(() => {
    setLastRefresh(formatTime(new Date()));
  }, []);

  // Fetch data when search or filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500); // Debounce for 500ms

    return () => clearTimeout(debounceTimer);
  }, [search, minAttempts, maxAttempts]);

  const handleMinAttemptsChange = (value: string) => {
    if (value === '' || /^\d*$/.test(value)) {
      setMinAttempts(value);
      setErrors(prev => ({ ...prev, minAttempts: undefined }));
    }
  };

  const handleMaxAttemptsChange = (value: string) => {
    if (value === '' || /^\d*$/.test(value)) {
      setMaxAttempts(value);
      setErrors(prev => ({ ...prev, maxAttempts: undefined }));
    }
  };

  return (
    <>
      <Head>
        <title>Leaderboard - Gamified Educational Platform</title>
        <meta name="description" content="View and filter the leaderboard" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                {lastRefresh && `Last updated: ${lastRefresh}`}
              </p>
            </div>
            <button
              onClick={fetchData}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <ArrowPathIcon className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>

              {/* Min Attempts Filter */}
              <div>
                <input
                  type="text"
                  placeholder="Minimum attempts"
                  value={minAttempts}
                  onChange={(e) => handleMinAttemptsChange(e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm ${
                    errors.minAttempts ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.minAttempts && (
                  <p className="mt-1 text-sm text-red-600">{errors.minAttempts}</p>
                )}
              </div>

              {/* Max Attempts Filter */}
              <div>
                <input
                  type="text"
                  placeholder="Maximum attempts"
                  value={maxAttempts}
                  onChange={(e) => handleMaxAttemptsChange(e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm ${
                    errors.maxAttempts ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxAttempts && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxAttempts}</p>
                )}
              </div>
            </div>

            {/* Leaderboard Table */}
            <LeaderboardTable data={data} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </>
  );
} 