/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './Container.css'
import LoadingBar from '../loading-bar/LoadingBar';
import ImageLoader from '../image-loader/ImageLoader';
import LoadingOutcome from '../loading-outcome/LoadingOutcome';

export default function Container() {

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgLoadedSrc, setImgLoadedSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const apiUrl = 'https://localhost:7070/api/File';

    const renderComponents = () => {
        if (isLoading) {
            return (
                <LoadingBar progress={progress} />
            )
        } else if (isLoaded) {
            return (
                <LoadingOutcome imgLoadedSrc={imgLoadedSrc} />
            )
        } else {
            return (
                <ImageLoader onUpload={handleUpload} />
            )
        }
    }

    const handleUpload = (formData) => {
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
            setImgLoadedSrc(res.data);
            setIsLoaded(true);

        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setProgress(0);
            setIsLoaded(false);
        });

    }

    return (
        <div className='container'>
            {renderComponents()}
        </div>
    )
}
