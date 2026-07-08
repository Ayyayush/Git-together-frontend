import React from 'react';

const TypingIndicator = ({ targetUser }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
      <span className="font-medium text-gray-400">{targetUser?.firstName || 'Someone'}</span> is typing...
    </div>
  );
};

export default TypingIndicator;