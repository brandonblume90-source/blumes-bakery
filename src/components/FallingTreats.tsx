import React, { useEffect, useState } from 'react';

const CookieIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="#D3985A" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <circle cx="12" cy="12" r="10" fill="#D3985A" />
    <circle cx="7" cy="10" r="1.5" fill="#5C3818" />
    <circle cx="11" cy="15" r="1.8" fill="#5C3818" />
    <circle cx="16" cy="9" r="1.5" fill="#5C3818" />
    <circle cx="15" cy="14" r="1.2" fill="#5C3818" />
    <circle cx="10" cy="7" r="1.2" fill="#5C3818" />
  </svg>
);

const CinnamonRollIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <circle cx="12" cy="12" r="10" fill="#E8D5B5" />
    <path d="M12 12C12 12 11.5 12 11.5 11.5C11.5 11 12.5 11 13 11.5C13.5 12 13 13.5 12 14C10.5 14.5 9 13.5 8.5 12C7.5 9.5 11 7 14 7.5C17.5 8 19 12.5 17.5 16C15.5 19.5 9 19.5 6 16.5C2.5 13 3.5 6 8.5 3.5C13 1.5 19 3.5 20.5 8" stroke="#B87E4B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TREATS = [CookieIcon, CinnamonRollIcon];

interface TreatItem {
  id: number;
  Icon: React.FC;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: number;
  rotationDirection: number;
}

export default function FallingTreats() {
  const [items, setItems] = useState<TreatItem[]>([]);

  useEffect(() => {
    // Generate static list of treats to animate
    const newItems = Array.from({ length: 12 }).map((_, i) => {
      // Alternate placing items on left and right sides
      const isLeft = i % 2 === 0;
      // Keep items within the edge 15% of the screen
      const leftPosition = isLeft 
        ? `${Math.random() * 10 + 2}%` // 2% to 12% 
        : `${Math.random() * 10 + 88}%`; // 88% to 98%
        
      return {
        id: i,
        Icon: TREATS[Math.floor(Math.random() * TREATS.length)],
        left: leftPosition,
        animationDuration: `${Math.random() * 10 + 15}s`, // Between 15s and 25s
        animationDelay: `-${Math.random() * 20}s`, // Negative delay so they start already on screen
        size: Math.random() * 0.6 + 0.8, // scale 0.8 to 1.4
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-[-100px]"
          style={{
            left: item.left,
            animation: `fall ${item.animationDuration} linear infinite`,
            animationDelay: item.animationDelay,
            transformOrigin: 'center center',
          }}
        >
          <div style={{ transform: `scale(${item.size}) scaleX(${item.rotationDirection})` }}>
            <item.Icon />
          </div>
        </div>
      ))}
    </div>
  );
}
