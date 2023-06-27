/* eslint-disable react/prop-types */
import image from '../../assets/image.svg'
import './DragAndDropUploader.css'

export default function DragAndDropUploader({ onUpload }) {


    const handleDrop = (e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        // Prevent bubbling
        e.stopPropagation();

        const selectedFile = e.dataTransfer.files[0];

        onUpload(e, selectedFile);
               
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <>
            <div className="image-loader"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <img src={image} alt="upload" />
                <p>Drag & Drop your Image here</p>

            </div>
        </>
    );
}