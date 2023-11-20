import React from 'react'

function MediasPage({ media }) {
  
  const renderMedia = () => {
    // Vérifier si le type de média est une image
    if (media.type.includes('image')) {
      return <img src={"../../../../frontend/build" + media.path} alt={`Media ${media._id}`} />;
    }
    // Vérifier si le type de média est une vidéo
    else if (media.type.includes('video')) {
      return (
        <video controls>
          <source src={media.path} type={media.type} />
          Your browser does not support the video tag.
        </video>
      );
    }
    // Si le type de média n'est ni une image ni une vidéo, retourner null
    else {
      return null;
    }
  }

  return (
    <div>
      {renderMedia()}
    </div>
  );
}

export default MediasPage;