'use client'
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

export default function App() {
  const qrRef = useRef();
  const [qrValue, setQrValue] = useState("https://www.example.com");
  const [qrHeight, setQrHeight] = useState(100);

  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg"); // Select the SVG element
    const svgData = new XMLSerializer().serializeToString(svg); // Serialize the SVG
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" }); // Create a Blob
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the Blob URL to free memory
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>QR Code Generator</h1>
      <div style={styles.form}>
        <label style={styles.label}>QR Code Value:</label>
        <input
          type="text"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
          style={styles.input}
          placeholder="Enter text or URL"
        />
        <label style={styles.label}>QR Code Size (Height):</label>
        <input
          type="number"
          value={qrHeight}
          onChange={(e) => setQrHeight(Number(e.target.value))}
          style={styles.input}
          placeholder="Enter size (e.g., 200)"
        />
        <button onClick={downloadQR} style={styles.button}>
          Download QR Code
        </button>
      </div>
      <div ref={qrRef} style={styles.qrContainer}>
        <QRCode size={qrHeight} value={qrValue} />
      </div>
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Sohaib Asghar. All rights reserved.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "5px",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  qrContainer: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  footer:{
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#777"
  }
};
