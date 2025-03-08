const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { code, language, timeTaken } = JSON.parse(event.body);

  try {
    const judge0Response = await axios.post('https://judge0-ce.org/api/v1/submissions', {
      source_code: code,
      language_id: getLanguageId(language),
      stdin: '7\n4', // Test cases
      expected_output: 'true\nfalse',
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const submissionId = judge0Response.data.token;
    const result = await pollJudge0(submissionId);

    const isCorrect = result.status.id === 3; // Judge0 "Accepted" status
    const score = isCorrect ? calculateScore(timeTaken) : 0;

    // Placeholder for points system update
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
    javascript: 63,
    python: 71,
    java: 62,
  };
  return languageMap[language];
}

async function pollJudge0(submissionId) {
  const response = await axios.get(`https://judge0-ce.org/api/v1/submissions/${submissionId}`);
  return response.data;
}

function calculateScore(timeTaken) {
  return Math.max(100 - timeTaken, 0); // Faster completion = higher score
}