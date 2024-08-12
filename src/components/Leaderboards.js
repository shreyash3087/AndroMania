"use client"
import React, { useEffect, useState } from 'react';

function Leaderboards() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/userdata');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        const sortedUsers = data.sort((a, b) => b.score - a.score);

        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#879bb8] to-[#ceddf5] p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#879bb8] to-[#536f99] text-white">
          <h1 className="text-3xl font-bold text-center">Leaderboards</h1>
        </div>
        <div className="p-6">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2">Rank</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2">Team Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.teamName} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{user.teamName}</td>
                  <td className="py-3 px-4 border-b">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboards;
