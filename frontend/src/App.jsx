import { useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  const callBackend = async () => {
    const res = await fetch("https://explain-message-app.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello from frontend!" })
    });
    const data = await res.json();
    setResponse(JSON.stringify(data));
  };

  return (
    <div>
      <h1>Explain Message App</h1>
      <button onClick={callBackend}>Call Backend</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
