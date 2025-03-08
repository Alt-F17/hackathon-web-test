import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('scores')
      .orderBy('points', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setScores(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {scores.map((score, index) => (
          <motion.li
            key={score.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700 p-2 rounded flex justify-between"
          >
            <span>{score.teamName}</span>
            <span className="text-green-400">{score.points} points</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Leaderboard;