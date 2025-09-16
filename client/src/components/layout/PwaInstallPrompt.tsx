import React, { useEffect, useState } from 'react';
import { FaDownload, FaWindowClose } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PwaInstallPrompt: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Store the install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Check if we should show the prompt
      const hasBeenShown = localStorage.getItem('pwaPromptShown');
      if (!hasBeenShown) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;

    // Show the install prompt
    installPrompt.prompt();

    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // We've used the prompt, and can't use it again
      setInstallPrompt(null);
      setShowPrompt(false);
      
      // Mark that we've shown the prompt
      localStorage.setItem('pwaPromptShown', 'true');
    });
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    // Mark that we've shown the prompt, even if dismissed
    localStorage.setItem('pwaPromptShown', 'true');
  };

  if (!showPrompt || !isMobile) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between border border-serie-light-blue">
      <div className="flex-1">
        <h3 className="font-bold text-serie-blue">Install Serie A Insider App</h3>
        <p className="text-sm text-gray-600">Install our app for a better experience</p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={handleInstallClick}
          className="bg-serie-blue text-white px-3 py-1 rounded-md mr-2 flex items-center"
        >
          <FaDownload className="mr-1" />
          Install
        </button>
        <button 
          onClick={dismissPrompt}
          className="text-gray-500 p-1"
          aria-label="Dismiss"
        >
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;