import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { motion } from 'framer-motion';

function CodeGolf() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [charCount, setCharCount] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
    setCharCount(value.length);
    // Placeholder for memory usage; actual calculation would come from backend
    setMemoryUsage(value.length * 2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/submitCodeGolf', {
        method: 'POST',
        body: JSON.stringify({ code, language }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-4"
    >
      <h2 className="text-3xl font-mono text-green-400 mb-4">Code Golf Challenge</h2>
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-xl text-green-400">Exercise Description</h3>
        <p className="text-gray-300">
          Write the shortest possible code to reverse a string. Example: "hello" → "olleh".
        </p>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <MonacoEditor
            height="400px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
          />
        </div>
        <div className="w-64 space-y-4">
          <div>
            <label htmlFor="language" className="block text-green-400">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div>
            <p className="text-green-400">Character Count: {charCount}</p>
            <p className="text-green-400">Memory Usage: {memoryUsage} bytes</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-500 text-black p-2 rounded hover:bg-green-400 w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CodeGolf;