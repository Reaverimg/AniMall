import React, { useState } from 'react';
import { Button, Checkbox } from '@mui/material';

function BackgroundColorChange() {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleApplyClick = () => {
    
    if (selectedColors.includes('#32a852')) {
      document.body.style.backgroundColor = '#32a852';
    }
    if (selectedColors.includes('#FAF1E4')) {
      document.body.style.backgroundColor = '#FAF1E4';
    }
    if (selectedColors.includes('#a4a832')) {
      document.body.style.backgroundColor = '#a4a832';
    }
    localStorage.setItem("BACKGROUND_COLOR",selectedColors );
    window.location.reload()
  };

  return (
    <div>
      <Checkbox
        checked={selectedColors.includes('#32a852')}
        onChange={() => handleColorChange('#32a852')}
        style={{ color: '#32a852' }}
      />
      <label >Color 1</label>
      <Checkbox
        checked={selectedColors.includes('#FAF1E4')}
        onChange={() => handleColorChange('#FAF1E4')}
        style={{ color: '#FAF1E4' }}
      />
      <label >Color 2</label>
      <Checkbox
        checked={selectedColors.includes('#a4a832')}
        onChange={() => handleColorChange('#a4a832')}
        style={{ color: '#a4a832' }}
      />
      <label >Color 3</label>
      <Button variant="contained" onClick={handleApplyClick}>
        Apply
      </Button>
    </div>
  );
}

export default BackgroundColorChange;


