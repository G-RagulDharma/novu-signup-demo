import { useState } from "react";

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!fname || !email) {
      setMsg("Please fill in your name and email.");
      setMsgType("error");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("https://novu-signup-demo.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${fname} ${lname}`.trim(),
          email,
          phone
        }),
      });

      const data = await res.json();
      setMsg(data.message);
      setMsgType(res.ok ? "success" : "error");
    } catch (err) {
      setMsg("Server error. Is the backend running?");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 6,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f9fafb" }}>
      <div style={{ width: 400, padding: 36, border: "1px solid #e5e7eb",
        borderRadius: 16, background: "#fff" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#534AB7",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 600, fontSize: 16 }}>R</div>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Ragul App</span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Create account</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          You'll receive a welcome email after signup.
        </p>

        {/* Name Row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First name</label>
            <input style={inputStyle} placeholder="First Name"
              onChange={(e) => setFname(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last name</label>
            <input style={inputStyle} placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)} />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email address</label>
          <input style={inputStyle} type="email" placeholder="ragul@example.com"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Phone</label>
          <input
            style={inputStyle}
            placeholder="+919876543210"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button onClick={signup} disabled={loading}
          style={{ width: "100%", padding: "11px 0", background: loading ? "#a5a0d9" : "#534AB7",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 15,
            fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", marginTop: 4 }}>
          {loading ? "Sending..." : "Create account"}
        </button>

        {/* Message */}
        {msg && (
          <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, fontSize: 14,
            background: msgType === "success" ? "#f0fdf4" : "#fef2f2",
            color: msgType === "success" ? "#15803d" : "#dc2626",
            border: `1px solid ${msgType === "success" ? "#bbf7d0" : "#fecaca"}` }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;