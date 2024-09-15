import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const MemeGenerator = () => {
  const [text, setText] = useState('sims loading page ass advice');
  const [selectedTemplate, setSelectedTemplate] = useState('sims4');
  const memeContainerRef = useRef(null);

  const memeTemplates = {
    sims4: '/images/simsloadingpage.png',
    sims3: '/images/TS3LoadScreen.png',
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const generateMeme = () => {
    if (memeContainerRef.current) {
      const templateImg = memeContainerRef.current.querySelector('img');
      html2canvas(memeContainerRef.current, {
        width: templateImg.width,
        height: templateImg.height,
        x: templateImg.offsetLeft,
        y: templateImg.offsetTop,
        backgroundColor: null,
        scale: 1
      }).then(canvas => {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'generated-meme.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/png');
      });
    }
  };

  const getTextStyle = () => {
    if (selectedTemplate === 'sims3') {
      return {
        position: 'absolute',
        top: '90%', // Different positioning for template2
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', // Wider text box for template2
        padding: '10px',
        backgroundColor: 'transparent',
        textAlign: 'center',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Myriad Pro', 'Source Sans Pro', 'Segoe UI', sans-serif", // Myriad Pro with fallbacks
        fontSize: '24px', // Larger font size for template2
        fontWeight: '800',
        color: '#A1B7D5', // Different color (OrangeRed) for template2
        boxSizing: 'border-box',
        wordWrap: 'break-word'
      };
    }
    // Default style for template1 and others
    return {
      position: 'absolute',
      top: '65%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40%',
      padding: '10px',
      backgroundColor: 'transparent',
      textAlign: 'center',
      minHeight: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Archivo', sans-serif",
      fontSize: '18px',
      fontWeight: '700',
      color: '#007BA7',
      boxSizing: 'border-box',
      wordWrap: 'break-word'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <select 
        onChange={handleTemplateChange}
        value={selectedTemplate}
        style={{ marginBottom: '5px', padding: '5px' }}
      >
        <option value="sims4">Sims 4</option>
        <option value="sims3">Sims 3</option>
      </select>
      <div ref={memeContainerRef} style={{ position: 'relative', width: '100%', textAlign: 'center', marginBottom: '10px' }}>
        <img 
          src={memeTemplates[selectedTemplate]} 
          alt="Selected template" 
          style={{ maxWidth: '100%' }} 
        />
        <div style={getTextStyle()}>
          {text}
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter your advice (1-2 sentences)"
        value={text}
        onChange={handleTextChange}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <button 
        onClick={generateMeme} 
        style={{ 
          padding: '10px', 
          backgroundColor: '#007BFF',
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        Download Image
      </button>
    </div>
  );
};

export default MemeGenerator;