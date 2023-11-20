import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import ReplaceAnchorWithDownloadButtons from "../ReplaceAnchorWithDownloadButtons";

function ModifiedAnchors() {
    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="https://en.aptoide.com/download?app_id="]');

        anchors.forEach((anchor) => {
            setAnchor(anchor);
        });
    }, []);

    const setAnchor = (anchor) => {
        ReactDOM.render(
            <ReplaceAnchorWithDownloadButtons href={anchor.href} />,
            anchor.parentElement
        );
    };

    return null;
}

export default ModifiedAnchors;
