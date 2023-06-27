/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ImageLoader.css'
import DragNDropImage from '../drag-n-drop-image/DragNDropImage';

export default function ImageLoader({ onUpload }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');


    const handleChange = (e, file) => {
        const selectedFile = file === undefined ? e.target.files[0] : file;

        // Validate file type and size
        if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png') {
            setError('File type not supported');
            return;
        }

        if (selectedFile.size > 1000000) {
            setError('File size cannot exceed more than 1MB');
            return;
        }

        setError('');
        setFile(selectedFile);
        handleSubmit(selectedFile);
    }

    const handleSubmit = async (selectedFile) => {

        if (!selectedFile) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append(
            'file',
            selectedFile,
        );
        formData.append('FileName', selectedFile.name);
        formData.append('FileType', selectedFile.type);
        formData.append('FolderName', 'MyPictures');


        onUpload(formData);
    }

    return (
        <>
            <header className='header-container'>
                <h1>Upload your image</h1>
                <p>File should be jpeg, png...</p>
            </header>


            <form
                id='image-loader-form'
                className='image-loader__form'
                onSubmit={handleSubmit}
            >
                <DragNDropImage onUpload={handleChange} />
                <input
                    title='file'
                    className='image-loader__input'
                    name='file'
                    type="file"
                    id="image-loader"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                />

                {error && <p className='error'>{error}</p>}

                <p>Or</p>

                <label
                    htmlFor="image-loader"
                    className='btn'
                >
                    Choose a file
                </label>
            </form>
        </>
    )
}