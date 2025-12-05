import React from 'react';
import './InstaPost.css';

interface InstaPostProps {
  imageSrc: string;
  caption: string;
  showDisclosure: boolean;
  disclosureText?: string;
}

const InstaPost: React.FC<InstaPostProps> = ({ 
  imageSrc, 
  caption, 
  showDisclosure, 
  disclosureText = 'Created with AI tools' 
}) => {
  return (
    <div className="insta-post">
      {/* Header */}
      <div className="insta-post-header">
        <div className="insta-avatar">SS</div>
        <div className="insta-header-text">
          <div className="insta-username">step_sense</div>
          {showDisclosure && (
            <div className="insta-sponsored">{disclosureText}</div>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="insta-image-container">
        <img src={imageSrc} alt="Advertisement" className="insta-image" />
      </div>

      {/* Icons Row */}
      <div className="insta-icons">
        <span className="insta-icon">❤️</span>
        <span className="insta-icon">💬</span>
        <span className="insta-icon">📤</span>
        <span className="insta-icon insta-icon-right">🔖</span>
      </div>

      {/* Caption */}
      <div className="insta-caption">
        <span className="insta-caption-username">step_sense</span>
        <span className="insta-caption-text">{caption}</span>
      </div>

      {/* Timestamp */}
      <div className="insta-timestamp">2 hours ago</div>
    </div>
  );
};

export default InstaPost;

