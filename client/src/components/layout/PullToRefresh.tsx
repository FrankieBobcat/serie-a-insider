import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useIsMobile } from '@/hooks/use-mobile';

const PullToRefresh: React.FC = () => {
  const [isPulling, setIsPulling] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let refreshThreshold = 80;
    let refreshing = false;
    
    const touchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    };
    
    const touchMove = (e: TouchEvent) => {
      if (refreshing) return;
      
      // Only activate when at the top of the page
      if (window.scrollY <= 0) {
        const currentY = e.touches[0].clientY;
        const distance = currentY - startY;
        
        if (distance > 0) {
          setIsPulling(true);
          e.preventDefault();
        }
      }
    };
    
    const touchEnd = (e: TouchEvent) => {
      if (!isPulling) return;
      
      const currentY = e.changedTouches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > refreshThreshold) {
        // Trigger refresh
        refreshing = true;
        setIsPulling(false);
        window.location.reload();
      } else {
        setIsPulling(false);
      }
    };
    
    document.addEventListener('touchstart', touchStart, { passive: false });
    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', touchStart);
      document.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', touchEnd);
    };
  }, [isMobile, isPulling]);
  
  if (!isPulling || !isMobile) return null;
  
  return (
    <div className="pull-indicator text-serie-light-blue">
      <FiRefreshCw className="text-3xl" />
    </div>
  );
};

export default PullToRefresh;