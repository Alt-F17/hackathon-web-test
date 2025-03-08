import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { registerParticipant } from '../services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  teamName: Yup.string().required('Required'),
  skillset: Yup.string().required('Required'),
});

function RegistrationForm() {
  const initialValues = { name: '', email: '', teamName: '', skillset: '' };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await registerParticipant(values);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-green-400">Name</label>
            <Field type="text" name="name" className="w-full p-2 bg-gray-700 rounded text-white" />
            <ErrorMessage name="name" component="div" className="text-red-400" />
          </div>
          <div>
            <label htmlFor="email" className="block text-green-400">Email</label>
            <Field type="email" name="email" className="w-full p-2 bg-gray-700 rounded text-white" />
            <ErrorMessage name="email" component="div" className="text-red-400" />
          </div>
          <div>
            <label htmlFor="teamName" className="block text-green-400">Team Name</label>
            <Field type="text" name="teamName" className="w-full p-2 bg-gray-700 rounded text-white" />
            <ErrorMessage name="teamName" component="div" className="text-red-400" />
          </div>
          <div>
            <label htmlFor="skillset" className="block text-green-400">Skillset</label>
            <Field type="text" name="skillset" className="w-full p-2 bg-gray-700 rounded text-white" />
            <ErrorMessage name="skillset" component="div" className="text-red-400" />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-black p-2 rounded hover:bg-green-400"
          >
            Register
          </motion.button>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;