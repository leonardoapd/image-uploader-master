/* eslint-disable react/prop-types */
import './Container.css'

export default function Container({ children }) {
    return (
        <div className="container">
            {children}
        </div>
    )
}
