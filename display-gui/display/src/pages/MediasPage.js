import React from 'react'

function MediasPage({ media }) {
  
  const renderMedia = () => {
    // Vérifier si le type de média est une image
    if (media.type.includes('image')) {
      return <img style={{width:"480px", height:"240px"}} src={"file:///C:/Users/stage/Pictures/chat-gris.jpg"} alt={`Media ${media._id}`} />;
    }
    // Vérifier si le type de média est une vidéo
    else if (media.type.includes('video')) {
      return (
        <video style={{width:"480px", height:"240px"}} controls>
          <source src={media.path} type={media.type} />
        </video>
      );
    }
    // Si le type de média n'est ni une image ni une vidéo, retourner null
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