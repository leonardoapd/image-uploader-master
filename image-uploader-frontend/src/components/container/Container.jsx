/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './Container.css'
import LoadingBar from '../loading-bar/LoadingBar';
import ImageUploadForm from '../image-upload-form/ImageUploadForm';
import UploadedView from '../uploaded-view/UploadedView';
import ErrorView from '../error-view/ErrorView';

export default function Container() {

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgLoadedSrc, setImgLoadedSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const apiUrl = import.meta.env.VITE_API_URL;

    const renderComponents = () => {
        if (isLoading) {
            return (
                <LoadingBar progress={progress} />
            )
        } else if (isLoaded) {
            return (
                <UploadedView imgLoadedSrc={imgLoadedSrc} />
            )
        } else if (isError) {
            return (
                <ErrorView />
            )
        } else {
            return (
                <ImageUploadForm onUpload={handleUpload} />
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
            setIsError(false);

        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setProgress(0);
            setIsLoaded(false);
            setIsError(true);
        });

    }

    return (
        <div className='container'>
            {renderComponents()}
        </div>
    )
}
