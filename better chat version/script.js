let chatHistory = [];

async function getAnswer() {
  const messageInput = document.getElementById('message');
  const userMessage = messageInput.value;
  if (!userMessage) return;

  // Display user's message
  displayMessage('user', userMessage);

  // Add user's message to chat history
  chatHistory.push({ role: 'user', content: userMessage });
  messageInput.value = '';

  // Prepare the conversation for the API request
  const conversation = chatHistory.map(turn => `${turn.role}: ${turn.content}`).join('\n');

  const apiKey = 'INSERT TOKEN HERE'; // Make sure to keep your API key secure
  const url = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: conversation
    })
  });

  const result = await response.json();
  const botMessage = result[0].generated_text;

  // Add bot's message to chat history
  chatHistory.push({ role: 'bot', content: botMessage });

  // Display bot's message
  displayMessage('bot', botMessage);
}

function displayMessage(role, message) {
  const chatbox = document.getElementById('chatbox');
  const messageDiv = document.createElement('div');
  messageDiv.className = role;
  messageDiv.innerText = message;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

