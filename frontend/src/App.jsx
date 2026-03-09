import { useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const riskClassMap = {
  low: 'risk-low',
  medium: 'risk-medium',
  high: 'risk-high'
};

export default function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const riskClass = useMemo(() => {
    if (!result?.riskLevel) return '';
    return riskClassMap[result.riskLevel] || '';
  }, [result]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      setError('Please paste a message first.');
      return;
    }

    setError('');
    setResult(null);
diff --git a/src/App.jsx b/src/App.jsx
index c8168a3dc0db3ee11f59696481820fd0e0bb011d..3ec455f0fea2f038a90cc9d333e444e625f2ce8e 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -32,51 +32,56 @@ export default function App() {
     setLoading(true);
 
     try {
       const response = await fetch(`${API_BASE_URL}/api/explain`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ message })
       });
 
       // Read response as text first
       const text = await response.text();
 
       let payload;
       try {
         payload = JSON.parse(text);
       } catch {
         throw new Error("Server didn't return JSON. API route may not be deployed.");
       }
 
       if (!response.ok) {
         throw new Error(payload.error || 'Could not explain the message.');
       }
 
-      setResult(payload);
+      setResult({
+        explanation: payload.explanation || 'No explanation returned.',
+        riskLevel: payload.riskLevel || 'medium',
+        reasons: Array.isArray(payload.reasons) ? payload.reasons : [],
+        safetyTips: Array.isArray(payload.safetyTips) ? payload.safetyTips : []
+      });
 
     } catch (requestError) {
       setError(requestError.message);
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <main className="app-shell">
       <section className="card">
         <h1>Explain This Message</h1>
         <p className="intro">
           Paste an SMS or WhatsApp message. AI will explain it in simple language and
           check if it may be a scam.
         </p>
 
         <form onSubmit={handleSubmit}>
           <label htmlFor="messageInput">Message</label>
           <textarea
             id="messageInput"
             value={message}
             onChange={(event) => setMessage(event.target.value)}
             placeholder="Example: Your package is on hold. Click here to pay a small fee..."
             rows={6}
          />

          <button disabled={loading} type="submit">
            {loading ? 'Explaining...' : 'Explain'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <article className="result">
            <h2>Explanation</h2>
            <p>{result.explanation}</p>

            <h3>Risk level</h3>
            <p className={`risk-pill ${riskClass}`}>{result.riskLevel.toUpperCase()}</p>

            <h3>Why this risk was selected</h3>
            <ul>
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>

            <h3>What to do next</h3>
            <ul>
              {result.safetyTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        )}
      </section>
    </main>
  );
}
