/* eslint-disable react/prop-types */
import './LoadingBar.css';

export default function LoadingBar({ progress }) {


    return (
        <>
            <div className="loading-bar">
                <div className='progress-bar__fill' style={{ width: `${progress}%` }}></div>
            </div>
        </>
    );
}