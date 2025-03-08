import React from 'react';
import { motion } from 'framer-motion';

function VirtualBadge({ participant }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-4 rounded shadow-lg text-center"
    >
      <h3 className="text-2xl font-mono text-green-400 mb-2">Participant Badge</h3>
      <p className="text-gray-300">Name: {participant.name}</p>
      <p className="text-gray-300">Team: {participant.teamName}</p>
      <p className="text-gray-300">Skillset: {participant.skillset}</p>
    </motion.div>
  );
}

export default VirtualBadge;


// ORIGINAL CODE

// src/components/VirtualBadge.js
// import React from 'react';
// import { motion } from 'framer-motion';

// function VirtualBadge({ participant }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gray-800 p-4 rounded shadow-lg text-center"
//     >
//       <h3 className="text-2xl font-mono text-green-400 mb-2">Participant Badge</h3>
//       <p className="text-gray-300">Name: {participant.name}</p>
//       <p className="text-gray-300">Team: {participant.teamName}</p>
//       <p className="text-gray-300">Skillset: {participant.skillset}</p>
//     </motion.div>
//   );
// }

// export default VirtualBadge;