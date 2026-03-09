export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Temporary demo response
    res.status(200).json({
      explanation: "This message asks you to click a link because a delivery supposedly failed.",
      riskLevel: "medium",
      reasons: [
        "Unexpected delivery notification",
        "Requests clicking an external link",
        "Common scam pattern"
      ],
      safetyTips: [
        "Do not click unknown links",
        "Check delivery status on the official website",
        "Ignore messages from unknown senders"
      ]
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
