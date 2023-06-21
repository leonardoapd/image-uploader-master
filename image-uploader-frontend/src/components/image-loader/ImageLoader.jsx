/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './ImageLoader.css'
import image from '../../assets/image.svg'

export default function ImageLoader({ src, alt, ...props }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const imageLoader = new Image()
        imageLoader.src = src
        imageLoader.onload = () => {
            setImageSrc(src)
        }
    }, [src]);

    const imageCollector =
        <div className="image-loader">
            
            <img src={image} alt="upload" />
            <p>Drag & Drop your Image here</p>

        </div>;


    return (
        <>
            <h1>Upload your image</h1>
            <p>File should be jpeg, png...</p>


            {imageSrc ? (
                <img src={imageSrc} alt={alt} {...props} />
            ) : (imageCollector)}

            <p>Or</p>

            <button className="btn">Choose a file</button>

        </>
    )

}

