"use client";
import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch('/api/contest',{method:"GET"});
        if (!res.ok) {
          throw new Error('Failed to fetch contests');
        }
        const data = await res.json();
        setContests(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContests();
  }, []);

  const startContest = async (contestid) => {
    try {
      const res = await fetch('/api/contest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contestid, isStarted: true }),
      });

      if (!res.ok) {
        throw new Error('Failed to start contest');
      }

      const updatedContestsRes = await fetch('/api/contest');
      if (!updatedContestsRes.ok) {
        throw new Error('Failed to fetch updated contests');
      }
      const updatedContests = await updatedContestsRes.json();
      setContests(updatedContests);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="divide-y divide-gray-200">
          {contests.map((contest) => (
            <li key={contest._id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Contest ID: {contest.contestid}</p>
                <p className={`text-sm ${contest.isStarted ? 'text-green-600' : 'text-gray-600'}`}>
                  {contest.isStarted ? 'Started' : 'Not Started'}
                </p>
              </div>
              {!contest.isStarted && (
                <button 
                  onClick={() => startContest(contest.contestid)} 
                  className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition"
                >
                  Start Contest
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
