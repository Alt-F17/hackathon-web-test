const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { code, language } = JSON.parse(event.body);

  try {
    // Submit to Judge0 API for execution
    const judge0Response = await axios.post('https://judge0-ce.org/api/v1/submissions', {
      source_code: code,
      language_id: getLanguageId(language),
      stdin: 'hello', // Example input
      expected_output: 'olleh', // Example expected output
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const submissionId = judge0Response.data.token;

    // Poll for results (simplified)
    const result = await pollJudge0(submissionId);

    const lines = code.split('\n').length;
    const memory = result.memory || 1024; // Fallback if Judge0 doesn't provide memory
    const score = calculateScore(lines, memory);

    // Placeholder for updating points system (e.g., Firebase)
    console.log(`Score: ${score}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission successful', score }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Submission failed', error: error.message }),
    };
  }
};

function getLanguageId(language) {
  const languageMap = {
    javascript: 63, // Judge0 ID for JavaScript
    python: 71,
    java: 62,
  };
  return languageMap[language];
}

async function pollJudge0(submissionId) {
  // In practice, you'd poll until the status is final
  const response = await axios.get(`https://judge0-ce.org/api/v1/submissions/${submissionId}`);
  return response.data; // Simplified; assumes immediate result
}

function calculateScore(lines, memory) {
  return Math.max(100 - lines * 2 - memory / 1000, 0); // Example scoring
}