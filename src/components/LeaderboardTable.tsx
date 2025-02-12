import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

type LeaderboardEntry = {
  name: string;
  email: string;
  attempts: number;
};

type Props = {
  data: LeaderboardEntry[];
  isLoading: boolean;
};

export default function LeaderboardTable({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          Loading...
        </div>
      </div>
    );
  }

  const entries = Array.isArray(data) ? data : [];

  if (entries.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 flex items-center gap-2">
          <AcademicCapIcon className="h-6 w-6" />
          No results found
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Attempts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {entries.map((entry) => (
              <tr 
                key={entry.email}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{entry.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{entry.attempts}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 