import React, {useEffect, useState} from "react";
import {fetchData} from "../../helpers/api";
import DownloadButton from "../DownloadButton";

function ReplaceAnchorWithDownloadButtons({ href }) {
    const [apkInfo, setApkInfo] = useState({});

    useEffect(() => {
        let url, appId;
        try {
            url = new URL(href);
            appId = url.searchParams.get('app_id');
        } catch (error) {
            console.error('Error parsing URL:', error);
            return;
        }

        if (appId === undefined || appId == null || appId === '') {
            console.error('App ID is undefined, null or empty.');
            return;
        }

        const cachedData = sessionStorage.getItem('aptoide-apk-downloader-extension-' + appId);
        if (cachedData) {
            const { apk } = JSON.parse(cachedData);
            setApkInfo(apk);
            return;
        }

        fetchData(appId)
            .then((responseData) => {
                sessionStorage.setItem('aptoide-apk-downloader-extension-' + appId, JSON.stringify(responseData));
                const { apk } = responseData;
                setApkInfo(apk);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [href]);

    return (
        <div className="download_btn_parent">
            {apkInfo.path && (
                <DownloadButton path={apkInfo.path} buttonText="Download" />
            )}
            {apkInfo.altpath && (
                <DownloadButton path={apkInfo.altpath} buttonText="Download Alt" />
            )}
        </div>
    );
}

export default ReplaceAnchorWithDownloadButtons;
