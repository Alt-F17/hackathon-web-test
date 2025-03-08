import React from 'react';
import { motion } from 'framer-motion';

function TriviaQuiz() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Trivia Quiz</h2>
      <p className="text-gray-300 mb-4">
        Test your tech knowledge! Enter the Kahoot game below using the provided code.
      </p>
      {/* Replace with your Kahoot embed code */}
      <iframe
        src="https://kahoot.it/challenge/1234567?challenge-id=abcdefg" // Example URL
        title="Kahoot Quiz"
        width="100%"
        height="500px"
        className="border-0"
      ></iframe>
    </motion.div>
  );
}

export default TriviaQuiz;