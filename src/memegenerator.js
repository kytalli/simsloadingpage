import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const MemeGenerator = () => {
  const [text, setText] = useState('sims loading page ass advice');
  const [selectedTemplate, setSelectedTemplate] = useState('sims4');
  const memeContainerRef = useRef(null);

  const memeTemplates = {
    sims4: `${process.env.PUBLIC_URL}/images/simsloadingpage.png`,
    sims3: `${process.env.PUBLIC_URL}/images/TS3LoadScreen.png`,
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const generateMeme = async () => {
    if (memeContainerRef.current) {
      const scale = 2; // Increase resolution
      const templateImg = memeContainerRef.current.querySelector('img');
      const canvas = await html2canvas(memeContainerRef.current, {
        width: templateImg.width,
        height: templateImg.height,
        x: templateImg.offsetLeft,
        y: templateImg.offsetTop,
        backgroundColor: null,
        scale: scale
      });
  
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'meme.png', { type: 'image/png' });
        const shareData = {
          title: 'Sims Loading Page Meme',
          text: 'Check out this Sims Loading Page Meme I created!',
          files: [file]
        };
  
        try {
          if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
          } else {
            // Fallback to download if Web Share API is not supported
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'generated-meme.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        } catch (err) {
          console.error('Error sharing:', err);
        }
      }, 'image/png');
    }
  };

  const getTextStyle = () => {
    const isMobile = window.innerWidth <= 768; // Define mobile breakpoint
  
    const commonStyles = {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: isMobile ? '80%' : '40%',
      padding: '10px',
      backgroundColor: 'transparent',
      textAlign: 'center',
      minHeight: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      wordWrap: 'break-word'
    };
  
    if (selectedTemplate === 'sims3') {
      return {
        ...commonStyles,
        top: isMobile ? '75%' : '90%',
        width: isMobile ? '90%' : '80%',
        fontFamily: "'Myriad Pro', 'Source Sans Pro', 'Segoe UI', sans-serif",
        fontSize: 'clamp(10px, 4vw, 24px)',
        fontWeight: '800',
        color: '#A1B7D5',
      };
    }
  
    // Default style for sims4
    return {
      ...commonStyles,
      top: isMobile ? '60%' : '65%',
      fontFamily: "'Archivo', sans-serif",
      fontSize: 'clamp(8px, 3vw, 18px)',
      fontWeight: '700',
      color: '#007BA7',
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