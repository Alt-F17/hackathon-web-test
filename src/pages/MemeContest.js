import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth'; // Assumes an authentication hook exists

function MemeContest() {
  const { user } = useAuth();
  const [memes, setMemes] = useState([]);

  // Fetch memes from Firebase in real-time
  useEffect(() => {
    const unsubscribe = db.collection('memes').onSnapshot((snapshot) => {
      const memeData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMemes(memeData);
    });
    return () => unsubscribe();
  }, []);

  // Form setup for meme submission
  const initialValues = { memeUrl: '' };
  const validationSchema = Yup.object({
    memeUrl: Yup.string().url('Invalid URL').required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await db.collection('memes').add({
        url: values.memeUrl,
        votes: 0,
        submittedBy: user.uid,
      });
      alert('Meme submitted successfully!');
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
    setSubmitting(false);
  };

  // Handle voting
  const handleVote = async (memeId) => {
    try {
      await db.collection('memes').doc(memeId).update({
        votes: admin.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Meme-Making Contest</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4 mb-8">
            <div>
              <label htmlFor="memeUrl" className="block text-green-400">Meme URL</label>
              <Field type="text" name="memeUrl" className="w-full p-2 bg-gray-700 rounded text-white" />
              <ErrorMessage name="memeUrl" component="div" className="text-red-400" />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-black p-2 rounded hover:bg-green-400"
            >
              Submit Meme
            </motion.button>
          </Form>
        )}
      </Formik>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <div key={meme.id} className="bg-gray-800 p-4 rounded">
            <img src={meme.url} alt="Meme" className="w-full h-64 object-cover mb-2" />
            <p className="text-gray-300">Votes: {meme.votes}</p>
            <motion.button
              onClick={() => handleVote(meme.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-black p-2 rounded hover:bg-green-400 mt-2"
            >
              Vote
            </motion.button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default MemeContest;