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
