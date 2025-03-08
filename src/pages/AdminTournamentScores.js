import React from 'react';
import { Formik, Form, Field } from 'formik';
import { motion } from 'framer-motion';

async function updateTournamentScores(values) {
  await fetch('/.netlify/functions/updateTournamentScores', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

function AdminTournamentScores() {
  const initialValues = { tournamentType: '', winnerTeamId: '', loserTeamId: '', points: 0 };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await updateTournamentScores(values);
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
      <h2 className="text-3xl font-mono text-green-400 mb-4">Update Tournament Scores</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="tournamentType" className="block text-green-400">Tournament Type</label>
              <Field as="select" name="tournamentType" className="w-full p-2 bg-gray-700 rounded text-white">
                <option value="">Select Type</option>
                <option value="pingpong">Ping Pong</option>
                <option value="chess">Chess</option>
              </Field>
            </div>
            <div>
              <label htmlFor="winnerTeamId" className="block text-green-400">Winner Team ID</label>
              <Field type="text" name="winnerTeamId" className="w-full p-2 bg-gray-700 rounded text-white" />
            </div>
            <div>
              <label htmlFor="loserTeamId" className="block text-green-400">Loser Team ID</label>
              <Field type="text" name="loserTeamId" className="w-full p-2 bg-gray-700 rounded text-white" />
            </div>
            <div>
              <label htmlFor="points" className="block text-green-400">Points for Winner</label>
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

export default AdminTournamentScores;