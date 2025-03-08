// src/pages/TeamDashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Custom hook for Firebase Authentication
import { db } from '../services/firebase';
import { motion } from 'framer-motion';

function TeamDashboard() {
  const { user } = useAuth();
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    if (user) {
      db.collection('teams').doc(user.teamId).get().then((doc) => {
        if (doc.exists) {
          setTeamData(doc.data());
        }
      });
    }
  }, [user]);

  if (!teamData) return <p className="text-gray-300">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Team Dashboard</h2>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl text-green-400">Team Points</h3>
          <p className="text-gray-300">{teamData.points} points</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl text-green-400">Completed Challenges</h3>
          <ul className="list-disc list-inside text-gray-300">
            {teamData.completedChallenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl text-green-400">Tasks</h3>
          <ul className="list-disc list-inside text-gray-300">
            {teamData.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default TeamDashboard;