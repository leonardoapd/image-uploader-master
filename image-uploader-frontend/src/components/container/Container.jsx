/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './Container.css'
import LoadingBar from '../loading-bar/LoadingBar';
import ImageLoader from '../image-loader/ImageLoader';

export default function Container() {
    const [showLoadingBar, setShowLoadingBar] = useState(false); // [1
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const apiUrl = 'https://localhost:7070/api/File';

    const handleUpload = (formData) => {
        setShowLoadingBar(true);
        setIsLoading(true);
        setProgress(0);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);

                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                if (percent < 100) {
                    setProgress(percent);
                }
            },
        };

        axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }, ...options
        }).then((res) => {
            console.log(res);
            setIsLoading(false);
            setProgress(100);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });

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
