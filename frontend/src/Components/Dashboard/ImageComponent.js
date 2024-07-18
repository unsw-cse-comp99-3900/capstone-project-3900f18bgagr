import React, { useState, useEffect } from 'react';

const ImageComponent = ({ endpoint, altText }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:5000/${endpoint}`);
                const data = await response.json();
                setImage(data.image);
            } catch (error) {
                console.error("There was an error fetching the image!", error);
            }
        };

        fetchImage();
    }, [endpoint]);

    return (
        <div>
            {image && <img src={image} alt={altText} style={{ width: '100%', height: 'auto' }} />}
        </div>
    );
};

export default ImageComponent;
