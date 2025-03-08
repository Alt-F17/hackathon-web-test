import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <div>
      <h1 className="text-3xl font-mono text-green-400 mb-4">Register for the Hackathon</h1>
      <RegistrationForm />
    </div>
  );
}

export default Registration;