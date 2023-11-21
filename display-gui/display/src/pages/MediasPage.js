import React from 'react'

function MediasPage({ media }) {
  
  const renderMedia = () => {
    if (media.type.includes('image')) {
      return <img style={{width:"480px", height:"240px"}} src={process.env.REACT_APP_MEDIA_DISPLAY_PATH + media.path} alt={`Media ${media._id}`} />;
    }
    else if (media.type.includes('video')) {
      return (
        <video style={{width:"480px", height:"240px"}} controls>
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