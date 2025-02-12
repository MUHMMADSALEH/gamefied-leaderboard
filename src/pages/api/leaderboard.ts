import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { search, minAttempts, maxAttempts } = req.query;

    // Get users with their attempts
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        name,
        email,
        attempts (
          score
        )
      `);

    if (userError) throw userError;

    // Process the data to get the statistics per user
    const leaderboardData = userData.map(user => {
      const attempts = user.attempts || [];
      const attemptsCount = attempts.length;

      return {
        name: user.name,
        email: user.email,
        attempts: attemptsCount
      };
    });

    // Apply filters
    let filteredData = [...leaderboardData];

    // Search by name
    if (search) {
      const searchLower = search.toString().toLowerCase();
      filteredData = filteredData.filter(entry => 
        entry.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by minimum attempts
    if (minAttempts) {
      filteredData = filteredData.filter(entry => 
        entry.attempts >= parseInt(minAttempts.toString())
      );
    }

    // Filter by maximum attempts
    if (maxAttempts) {
      filteredData = filteredData.filter(entry => 
        entry.attempts <= parseInt(maxAttempts.toString())
      );
    }

    return res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 