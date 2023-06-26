/* eslint-disable react/prop-types */
import './LoadingBar.css';

export default function LoadingBar({ progress }) {


    return (
        <>
            {
                progress !== 100 ? (
                    <h1 className='loading-text'>Uploading...</h1>
                ) : (
                    <h1 className='loading-text'>Uploaded ✅</h1>
                )
            }
            <div className="loading-bar">
                <div className='progress' style={{ width: `${progress}%` }}></div>
            </div>
        </>
    );
}