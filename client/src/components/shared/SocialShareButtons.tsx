import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaLinkedin, 
  FaCopy, 
  FaTelegram, 
  FaReddit
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  hashtags?: string[];
  className?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
  description = '',
  imageUrl = '',
  hashtags = [],
  className = '',
  buttonSize = 'md',
  showLabel = false,
}) => {
  const { toast } = useToast();
  
  // Ensure the URL is fully qualified
  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  
  // Create hashtag string for services that support it
  const hashtagString = hashtags.length > 0 ? hashtags.map(tag => `#${tag}`).join(',') : '';
  
  // For services that encode the URL in their share link
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = encodeURIComponent(hashtagString);
  
  // Generate the sharing links
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags.replace(/#/g, '')}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };
  
  // Button size classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  // Font size classes
  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  // Handle copy to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Share link has been copied to clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Copy failed",
          description: "Failed to copy link to clipboard",
          variant: "destructive",
        });
        console.error('Failed to copy: ', err);
      });
  };
  
  // Helper to handle sharing
  const handleShare = (platform: string, url: string) => {
    window.open(url, `share-${platform}`, 'width=600,height=400');
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Facebook */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#3b5998] hover:bg-[#2d4373] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('facebook', shareLinks.facebook)}
      >
        <FaFacebook />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>Facebook</span>}
      </Button>
      
      {/* Twitter */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#1da1f2] hover:bg-[#0c85d0] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('twitter', shareLinks.twitter)}
      >
        <FaTwitter />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>Twitter</span>}
      </Button>
      
      {/* WhatsApp */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#25d366] hover:bg-[#1da851] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
      >
        <FaWhatsapp />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>WhatsApp</span>}
      </Button>
      
      {/* LinkedIn */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#0077b5] hover:bg-[#005582] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('linkedin', shareLinks.linkedin)}
      >
        <FaLinkedin />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>LinkedIn</span>}
      </Button>
      
      {/* Telegram */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#0088cc] hover:bg-[#006699] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('telegram', shareLinks.telegram)}
      >
        <FaTelegram />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>Telegram</span>}
      </Button>
      
      {/* Reddit */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-[#ff4500] hover:bg-[#cc3700] text-white ${sizeClasses[buttonSize]}`}
        onClick={() => handleShare('reddit', shareLinks.reddit)}
      >
        <FaReddit />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>Reddit</span>}
      </Button>
      
      {/* Copy Link */}
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-gray-600 hover:bg-gray-700 text-white ${sizeClasses[buttonSize]}`}
        onClick={handleCopyLink}
      >
        <FaCopy />
        {showLabel && <span className={`ml-2 ${fontSizeClasses[buttonSize]}`}>Copy Link</span>}
      </Button>
    </div>
  );
};

export default SocialShareButtons;