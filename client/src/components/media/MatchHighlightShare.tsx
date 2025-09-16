import React, { useState } from 'react';
import SocialShareButtons from '@/components/shared/SocialShareButtons';
import { FaShareAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MatchHighlightShareProps {
  videoId: number;
  title: string;
  description: string;
  thumbnail: string;
}

const MatchHighlightShare: React.FC<MatchHighlightShareProps> = ({
  videoId,
  title,
  description,
  thumbnail
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Create share URL for the specific match highlight
  const shareUrl = `/media/video/${videoId}`;
  
  // Create hashtags relevant to football content
  const hashtags = ['SerieA', 'Football', 'Highlights', 'Soccer'];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-serie-light-blue hover:bg-serie-blue text-white"
        >
          <FaShareAlt className="mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share This Match Highlight</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            {thumbnail && (
              <img 
                src={thumbnail} 
                alt={title} 
                className="w-20 h-20 object-cover rounded-md" 
              />
            )}
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            </div>
          </div>
          
          <SocialShareButtons 
            url={shareUrl}
            title={title}
            description={description}
            imageUrl={thumbnail}
            hashtags={hashtags}
            buttonSize="md"
            showLabel={true}
            className="justify-center flex-wrap gap-3"
          />
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Share this amazing match highlight with your friends!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchHighlightShare;