import React from 'react';
import { Formik, Form, Field } from 'formik';
import { motion } from 'framer-motion';

async function updateScores(values) {
  await fetch('/.netlify/functions/updateScores', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

function AdminScoreAdjustment() {
  const initialValues = { teamId: '', points: 0 };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await updateScores(values);
      alert('Scores updated successfully');
    } catch (error) {
      alert('Failed to update scores');
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
      <h2 className="text-3xl font-mono text-green-400 mb-4">Adjust Scores</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="teamId" className="block text-green-400">Team ID</label>
              <Field type="text" name="teamId" className="w-full p-2 bg-gray-700 rounded text-white" />
            </div>
            <div>
              <label htmlFor="points" className="block text-green-400">Points to Add</label>
              <Field type="number" name="points" className="w-full p-2 bg-gray-700 rounded text-white" />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-black p-2 rounded hover:bg-green-400"
            >
              Update Scores
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default AdminScoreAdjustment;