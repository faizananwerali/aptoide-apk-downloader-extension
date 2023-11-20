import React from "react";

function DownloadButton({ path, buttonText }) {
    return (
        <a
            href={path}
            className="download_btn"
            download
        >
            <div className="download_btn_text">{buttonText}</div>
        </a>
    );
}

export default DownloadButton;
