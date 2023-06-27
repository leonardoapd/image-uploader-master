/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { images } from "../../constants/images";
import './LoadingOutcome.css';
import Skeleton from '@mui/material/Skeleton'

export default function LoadingOutcome({ imgLoadedSrc }) {
    const [isCopied, setIsCopied] = useState(false);
    const [link] = useState(imgLoadedSrc);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setIsLoading(false);
        };
        image.src = imgLoadedSrc;
    }, [imgLoadedSrc]);

    const handleClick = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(imgLoadedSrc);
        setIsCopied(true);
    }

    return (
        <>
            <header className="header-container">
                <img className="info-img" src={images.success} alt="success" />
                <h1 className="title">Uploaded Successfully!</h1>
            </header>

            <div className="img-container">
                {isLoading ? (
                    <Skeleton
                        variant="rectangular"
                        width={338}
                        height={224}
                        sx={{
                            borderRadius: '12px',
                            backgroundImage: 'url("' + images.image + '")', // Reemplaza "ruta_de_la_imagen" con la ruta de tu imagen de fondo
                            backgroundWidth: '116px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    />
                ) : (
                    <img className="uploaded-img" src={imgLoadedSrc} alt="uploaded" />
                )}
            </div>

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
