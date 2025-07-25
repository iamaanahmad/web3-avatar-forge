import React from 'react';

// Hair Styles
export const Hair1 = () => (
  <svg viewBox="0 0 100 100">
    <path d="M 30 35 Q 50 15, 70 35 L 75 50 L 25 50 Z" fill="#3b3b3b" />
  </svg>
);
export const Hair2 = () => (
  <svg viewBox="0 0 100 100">
    <path d="M 30 30 C 40 20, 60 20, 70 30 L 75 40 L 65 35 L 50 40 L 35 35 L 25 40 Z" fill="#d9a400" />
  </svg>
);
export const Hair3 = () => (
    <svg viewBox="0 0 100 100">
      <path d="M 50 20 C 25 20, 25 50, 50 50 C 75 50, 75 20, 50 20 Z" fill="#f275be"/>
      <path d="M 50 25 C 35 25, 35 45, 50 45 C 65 45, 65 25, 50 25 Z" fill="#fff"/>
    </svg>
);
export const Hair4 = () => (
    <svg viewBox="0 0 100 100">
       <rect x="25" y="30" width="50" height="20" rx="10" fill="#7DF9FF" />
    </svg>
);


// Eye Styles
export const Eyes1 = () => (
  <svg viewBox="0 0 100 100">
    <circle cx="40" cy="50" r="3" fill="black" />
    <circle cx="60" cy="50" r="3" fill="black" />
  </svg>
);
export const Eyes2 = () => (
  <svg viewBox="0 0 100 100">
    <rect x="37" y="48" width="6" height="4" fill="#0055d9" />
    <rect x="57" y="48" width="6" height="4" fill="#0055d9" />
  </svg>
);
export const Eyes3 = () => (
    <svg viewBox="0 0 100 100">
        <path d="M 35 52 L 45 48 L 35 48 Z" fill="#BE75F2"/>
        <path d="M 65 52 L 55 48 L 65 48 Z" fill="#BE75F2"/>
    </svg>
);
export const Eyes4 = () => (
    <svg viewBox="0 0 100 100">
        <circle cx="40" cy="50" r="4" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="60" cy="50" r="4" stroke="black" strokeWidth="1" fill="none" />
        <line x1="40" y1="50" x2="60" y2="50" stroke="black" strokeWidth="1"/>
    </svg>
);


// Accessories
export const Acc1 = () => (
  <svg viewBox="0 0 100 100">
    <rect x="35" y="45" width="30" height="5" fill="#3b3b3b" />
    <rect x="48" y="45" width="4" height="10" fill="#3b3b3b" />
  </svg>
);

export const Acc2 = () => (
  <svg viewBox="0 0 100 100">
     <circle cx="50" cy="50" r="10" stroke="#7DF9FF" strokeWidth="2" fill="none" />
  </svg>
);

export const Acc3 = () => (
    <svg viewBox="0 0 100 100">
        <path d="M 50 65 L 70 75 L 30 75 Z" fill="#BE75F2"/>
    </svg>
);

export const NoAccessory = () => <></>;
