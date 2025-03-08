import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { submitProject } from '../services/api'; // Placeholder for an API utility

const validationSchema = Yup.object({
  projectName: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  file: Yup.mixed().required('File is required'),
});

function Submissions() {
  const initialValues = { projectName: '', description: '', file: null };

  const onSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('projectName', values.projectName);
    formData.append('description', values.description);
    formData.append('file', values.file);

    try {
      await submitProject(formData);
      alert('Project submitted successfully!');
    } catch (error) {
      alert('Submission failed. Please try again.');
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
      <h2 className="text-3xl font-mono text-green-400 mb-4">Submit Your Project</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-green-400">Project Name</label>
              <Field type="text" name="projectName" className="w-full p-2 bg-gray-700 rounded text-white" />
              <ErrorMessage name="projectName" component="div" className="text-red-400" />
            </div>
            <div>
              <label htmlFor="description" className="block text-green-400">Description</label>
              <Field as="textarea" name="description" className="w-full p-2 bg-gray-700 rounded text-white" />
              <ErrorMessage name="description" component="div" className="text-red-400" />
            </div>
            <div>
              <label htmlFor="file" className="block text-green-400">Upload File</label>
              <input
                type="file"
                name="file"
                onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
              <ErrorMessage name="file" component="div" className="text-red-400" />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-black p-2 rounded hover:bg-green-400"
            >
              Submit Project
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default Submissions;