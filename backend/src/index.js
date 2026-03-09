import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const hasApiKey = Boolean(process.env.OPENAI_API_KEY);

const openai = hasApiKey
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: hasApiKey });
});

app.post('/api/explain', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!openai) {
    return res.status(500).json({
      error:
        'OPENAI_API_KEY is not configured. Add it to backend/.env before calling this endpoint.'
    });
  }

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content:
            'You explain incoming text messages simply and detect scam risk. Return only valid JSON with keys: explanation (string), riskLevel (low|medium|high), reasons (array of short strings), and safetyTips (array of short strings).'
        },
        {
          role: 'user',
          content: `Analyze this message:\n\n${message}`
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'message_analysis',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              explanation: { type: 'string' },
              riskLevel: {
                type: 'string',
                enum: ['low', 'medium', 'high']
              },
              reasons: {
                type: 'array',
                items: { type: 'string' }
              },
              safetyTips: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['explanation', 'riskLevel', 'reasons', 'safetyTips']
          },
          strict: true
        }
      }
    });

    const raw = response.output_text;
    const parsed = JSON.parse(raw);

    return res.json(parsed);
  } catch (error) {
    console.error('Explain endpoint error:', error);
    return res.status(500).json({ error: 'Failed to analyze message.' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
