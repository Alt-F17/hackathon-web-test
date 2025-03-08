const axios = require('axios');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { quizId } = JSON.parse(event.body);

  try {
    const response = await axios.get(`https://kahoot.it/rest/challenges/${quizId}/answers`, {
      headers: { 'Authorization': `Bearer ${process.env.KAHOOT_API_TOKEN}` },
    });

    const scores = response.data; // Adjust based on Kahoot API response

    for (const score of scores) {
      await db.collection('scores').doc(score.teamId).update({
        points: admin.firestore.FieldValue.increment(score.points),
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Scores updated successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch scores', error: error.message }),
    };
  }
};