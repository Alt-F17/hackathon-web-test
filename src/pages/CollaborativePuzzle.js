import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

function CollaborativePuzzle() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);

  // Form setup for progress reporting
  const initialValues = { piecesCompleted: 0 };
  const validationSchema = Yup.object({
    piecesCompleted: Yup.number().min(0).required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await db.collection('puzzleProgress').doc(user.teamId).set({
        piecesCompleted: values.piecesCompleted,
      });
      setProgress(values.piecesCompleted);
      alert('Progress updated successfully!');
    } catch (error) {
      alert('Failed to update progress.');
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Collaborative Puzzle</h2>
      <p className="text-gray-300 mb-4">Report your team's puzzle progress below.</p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="piecesCompleted" className="block text-green-400">Pieces Completed</label>
              <Field type="number" name="piecesCompleted" className="w-full p-2 bg-gray-700 rounded text-white" />
              <ErrorMessage name="piecesCompleted" component="div" className="text-red-400" />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-black p-2 rounded hover:bg-green-400"
            >
              Update Progress
            </motion.button>
          </Form>
        )}
      </Formik>
      <div className="mt-8">
        <h3 className="text-xl text-green-400">Current Progress</h3>
        <p className="text-gray-300">{progress} pieces completed</p>
      </div>
    </motion.div>
  );
}

export default CollaborativePuzzle;

// ORIGINAL CODE:

// import React from 'react';
// import { motion } from 'framer-motion';

// function CollaborativePuzzle() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="p-4"
//     >
//       <h2 className="text-3xl font-mono text-green-400 mb-4">Collaborative Puzzle</h2>
//       <p className="text-gray-300 mb-4">Team up to complete the puzzle!</p>
//       <iframe
//         src="https://www.jigsawexplorer.com/" // Replace with actual puzzle URL
//         title="Collaborative Puzzle"
//         width="100%"
//         height="500px"
//         className="border-0"
//       ></iframe>
//     </motion.div>
//   );
// }

// export default CollaborativePuzzle;