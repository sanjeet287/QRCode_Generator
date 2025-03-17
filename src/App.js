import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const qrRef = useRef(null); 

  const generateQRCode = () => {
    if (!url) {
      setError("Enter The URL");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      new URL(url); 
      setQrCode(url);
    } catch {
      setQrCode("invalid");
    }
  };

  const clearQRCode = () => {
    setUrl("");
    setQrCode("");
    setError("");
  };


  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      generateQRCode();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="container">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"        
        onKeyDown={handleKeyDown}
      />
      <button onClick={generateQRCode} className="generate-btn">
        Generate
      </button>
      <button onClick={clearQRCode} className="clear-btn">
        Clear
      </button>
      </div>
    

      

      
      {qrCode && qrCode !== "invalid" && (
        <div ref={qrRef} className="qr-container">
        <QRCodeCanvas value={qrCode} />
        <button onClick={downloadQRCode} className="download-btn">
          Download
        </button>
        {qrCode && qrCode === "invalid" && <p className="error-msg">Invalid URL</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>       
      )}



      

      
      </header>
    </div>
  );
}

export default App;
