import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-mono font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Hackathon 2023
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Code. Compete. Conquer. Join the ultimate coding showdown!
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Join Now
          </Link>
          <Link
            to="/about"
            className="bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Explore
          </Link>
        </motion.div>
      </motion.div>

      {/* Highlights Section */}
      <motion.div
        className="container mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-mono text-green-400 mb-4">Epic Challenges</h3>
          <p className="text-gray-300">
            Test your skills with Code Golf, Code Blitz, and custom puzzles.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-mono text-green-400 mb-4">Team Spirit</h3>
          <p className="text-gray-300">
            Collaborate or go solo—bring your A-game to the leaderboard!
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-mono text-green-400 mb-4">Big Prizes</h3>
          <p className="text-gray-300">
            Win swag, cash, and bragging rights for top performers.
          </p>
        </motion.div>
      </motion.div>

      {/* Optional Background Effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}

export default Home;