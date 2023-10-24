import React, { useState } from 'react';
import { Button, Checkbox } from '@mui/material';

function ColorChangeComponent() {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleApplyClick = () => {
    // Thực hiện các hành động tương ứng với các màu đã chọn
    if (selectedColors.includes('#32a852')) {
      document.body.style.backgroundColor = '#32a852';
    }
    if (selectedColors.includes('#32a8a4')) {
      document.body.style.backgroundColor = '#32a8a4';
    }
    if (selectedColors.includes('#a4a832')) {
      document.body.style.backgroundColor = '#a4a832';
    }
  };

  return (
    <div>
      <Checkbox
        checked={selectedColors.includes('#32a852')}
        onChange={() => handleColorChange('#32a852')}
        style={{ color: '#32a852' }}
      />
      <label style={{ color: '#32a852' }}>Color 1</label>
      <Checkbox
        checked={selectedColors.includes('#32a8a4')}
        onChange={() => handleColorChange('#32a8a4')}
        style={{ color: '#32a8a4' }}
      />
      <label style={{ color: '#32a8a4' }}>Color 2</label>
      <Checkbox
        checked={selectedColors.includes('#a4a832')}
        onChange={() => handleColorChange('#a4a832')}
        style={{ color: '#a4a832' }}
      />
      <label style={{ color: '#a4a832' }}>Color 3</label>
      <Button variant="contained" onClick={handleApplyClick}>
        Apply
      </Button>
    </div>
  );
}

export default ColorChangeComponent;