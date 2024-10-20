import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', color = '#000' }) => {
  const sizeMap = {
    small: '30px',
    medium: '50px',
    large: '70px',
  };

  return (
    <div className="flex justify-center items-center h-full p-10">
      <div
        className="loading-spinner"
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderColor: color,
          borderTopColor: 'transparent',
        }}
      ></div>
    </div>
  );
};

export default Loading;