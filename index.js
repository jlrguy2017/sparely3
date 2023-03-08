require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');

// Load OpenAI API credentials
const secrets = {
  api_key: process.env.OPENAI_API_KEY,
};
const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions";

// Define function to generate project ideas
async function generateProjectIdeas(spareParts) {
  // Set up prompt
  const prompt = `Please create 3 electronics project ideas based solely on the items contained in the spare_parts variable:

  spare_parts = [${spareParts.map(part => `"${part}"`).join(", ")}]

  Project 1:
  Project 2:
  Project 3:`;

  // Send prompt to OpenAI API
  const response = await axios({
    method: 'post',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${secrets.api_key}`,
    },
    data: {
      prompt,
      max_tokens: 2048,
      n: 1,
      stop: null,
      temperature: 0.5,
    },
  });

  // Extract project ideas from response
  const projects = response.data.choices[0].text.match(/Project \d: (.*)/g).map(match => match.slice(10));
  return projects;
}
