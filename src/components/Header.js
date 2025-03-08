import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <nav className="flex justify-between items-center container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-mono text-green-400"
        >
          Hackathon
        </motion.div>
        <ul className="flex space-x-4">
          {['/', '/about', '/register', '/submissions', '/leaderboard', '/codegolf', '/codeblitz', '/dashboard'].map((path, index) => (
            <motion.li
              key={path}
              whileHover={{ scale: 1.1, color: '#34D399' }}
              transition={{ duration: 0.2 }}
            >
              <Link to={path} className="hover:text-green-400">
                {['Home', 'About', 'Register', 'Submissions', 'Leaderboard', 'Code Golf', 'Code Blitz', 'Dashboard'][index]}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;