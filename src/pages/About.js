import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-mono text-green-400 mb-4">Welcome to the Hackathon!</h1>
      <p className="text-lg text-gray-300">
        Join us for an exciting event full of coding challenges, games, and more. Get ready to hack!
      </p>
    </motion.div>
  );
}

export default Home;