const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Route to handle chat
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Error processing your message' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
