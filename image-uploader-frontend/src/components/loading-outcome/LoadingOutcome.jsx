/* eslint-disable react/prop-types */
import { useState } from 'react';
import { images } from "../../constants/images";
import './LoadingOutcome.css';

export default function LoadingOutcome({ imgLoadedSrc }) {

    const [isCopied, setIsCopied] = useState(false);
    const [link] = useState(imgLoadedSrc);

    const handleClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(imgLoadedSrc);
        setIsCopied(true);
    }

    return (
        <>
            <header className="header-container">
                <img className="info-img" src={images.success} alt="success" />
                <h1 className="title">Uploaded Succesfully!</h1>
            </header>
            <img
                className="uploaded-img"
                src={imgLoadedSrc}
                loading={"lazy"}
                alt="uploaded"
            />

            <form className="link-container">
                <input
                    className="link-container__input"
                    type="text"
                    value={link}
                    readOnly
                />
                <button
                    className="link-container__btn"
                    onClick={handleClick}
                >
                    Copy Link
                </button>

            </form>
            {isCopied && <p className="link-container__copied">Copied!</p>}
        </>
    )
}