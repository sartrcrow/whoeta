import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ number }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [number]);

  return (
    <span key={key} className="animated-number">
      {number}
    </span>
  );
};

export default AnimatedNumber; 