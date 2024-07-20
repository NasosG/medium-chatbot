async function getAnswer() {
  const question = document.getElementById('question').value;
  const apiKey = 'INSERT KEY HERE'; // Make sure to keep your API key secure
  const url = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';

  try {
    // Prepare the request body
    const requestBody = {
      inputs: question
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      document.getElementById('answer').innerText = `Error: ${error.error || 'Unknown error'}`;
      return;
    }

    const result = await response.json();
    console.log(result); // For debugging purposes
    const botMessage = result[0]?.generated_text?.trim() || 'No answer found';
    document.getElementById('answer').innerText = `Bot said: ${botMessage}`;

  } catch (error) {
    document.getElementById('answer').innerText = `Network Error: ${error.message}`;
  }
}