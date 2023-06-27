import { images } from "../../constants/images";

export default function ErrorView() {

    const handleGoBack = () => {
        window.location.href = '/';
    }

    return (
        <>
            <header className="header-container">
                <img className="info-img" src={images.error} alt="success" />
                <h1 className="title">Something went wrong!</h1>
            </header>

            <p>Cannot upload your image</p>

            {/* Go back */}
            <button
                className="btn"
                onClick={handleGoBack}
            >
                Go back
            </button>
        </>
    );
}
