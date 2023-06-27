/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Container.css'
import LoadingBar from '../loading-bar/LoadingBar';
import ImageLoader from '../image-loader/ImageLoader';

export default function Container() {
    const [showLoadingBar, setShowLoadingBar] = useState(false); // [1
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = (formData) => {
        console.log(formData.get('file'));
    }





    return (
        <div className='container'>
            {showLoadingBar ? (
                <LoadingBar progress={progress} />
            ) : (
                <ImageLoader onUpload={handleUpload} />
            )}
        </div>
    )
}
