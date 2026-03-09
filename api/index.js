export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body ?? {};

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: 'Message required' });
  }

  return res.status(200).json({
    explanation:
      'This message uses urgency about a failed delivery to push you into clicking a link quickly.',
    riskLevel: 'high',
    reasons: [
      'Unexpected delivery problem claims are a common phishing tactic.',
      'The message tries to create urgency so you act before verifying.',
      'Clicking unknown links can lead to fake login or payment pages.'
    ],
    safetyTips: [
      'Do not click the link in the message.',
      'Check delivery status using the courier app or official website you type manually.',
      'If unsure, contact the courier using a trusted phone number.'
    ]
  });
}
