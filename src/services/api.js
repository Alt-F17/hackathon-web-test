export const registerParticipant = async (data) => {
    const response = await fetch('/.netlify/functions/registerParticipant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  export const submitProject = async (formData) => {
    // Add your project submission logic here, e.g., an API call or Firebase interaction
    console.log('Submitting project:', formData);
    return { success: true }; // Example return value
  };