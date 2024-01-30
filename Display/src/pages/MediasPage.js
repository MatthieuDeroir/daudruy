import React from 'react'

const width = process.env.REACT_APP_WIDTH;
const height = process.env.REACT_APP_HEIGHT;

function MediasPage({ media }) {
  
  const renderMedia = () => {
    if (media.type.includes('image')) {
      return <img style={{width: width + "px", height:height + "px"}} src={process.env.REACT_APP_MEDIA_DISPLAY_PATH + media.path} alt={`Media ${media._id}`} />;
    }
    else if (media.type.includes('video')) {
      return (
        <video style={{width:width + "px", height:width + "px"}} controls>
          <source src={process.env.REACT_APP_MEDIA_DISPLAY_PATH + media.path} type={media.type} />
        </video>
      );
    }
    else {
      return null;
    }
  }

  return (
    <>
      {renderMedia()}
    </>
  );
}

export default MediasPage;