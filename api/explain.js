export default function handler(req, res) {
  const { message } = req.body;

  res.status(200).json({
    explanation: "This is a simple explanation for: " + message
  });
}
