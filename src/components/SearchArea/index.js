import React, {useEffect, useState} from 'react';
import {
    fetchData,
    fetchDataAlternative,
    fetchHTMLPage,
    searchApp
} from "../../helpers/api";
import SearchInput from '../SearchInput';
import Loading from '../Loading';
import NoResults from '../NoResults';
import AppInfo from '../AppInfo';
import FirstView from "../FirstView";

const SearchArea = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [aptoideApps, setAptoideApps] = useState(null);

    useEffect(() => {
        if (!loading && aptoideApps && aptoideApps.length === 0) {
            setAptoideApps(null);
        }
    }, [value]);

    async function updateVersionInfoWithApkInfo(aptoideAppInfo, version) {
        // const cachedData = chrome.storage.local.get('aptoide-apk-downloader-extension-' + version.id);
        // if (cachedData) {
        //     const data = JSON.parse(cachedData);
        //     updateData(aptoideAppInfo, version, data.apk);
        //     return;
        // }

        const data = await fetchDataAlternative(version.id);
        // chrome.storage.local.set('aptoide-apk-downloader-extension-' + version.id, JSON.stringify(data));
        updateData(aptoideAppInfo, version, data.apk);
    }

    function updateData(aptoideAppInfo, version, apkInfo) {
        version.apkInfo = apkInfo;

        aptoideAppInfo.versionsData = aptoideAppInfo.versionsData.map((versionData) => {
            if (versionData.id === version.id) {
                return version;
            }
            return versionData;
        });

        // Update state for the specific app with version data
        setAptoideApps(prevApps => {
            return prevApps?.map(app => {
                if (app.id === aptoideAppInfo.id) {
                    return aptoideAppInfo;
                }
                return app;
            });
        });
    }

    const updateAptoideAppsWithVersions = async (aptoideAppInfo) => {
        let scriptElem, json;
        try {
            const html = await fetchHTMLPage(aptoideAppInfo.uname);
            scriptElem = html.getElementById('__NEXT_DATA__');
        } catch (error) {
            console.error(`Error fetching version data for app ${aptoideAppInfo.id}:`, error);
        }

        if (!scriptElem) {
            console.error(`No script element found for app ${aptoideAppInfo.id}`);
            return;
        }

        try {
            const scriptContent = scriptElem.innerHTML;
            json = JSON.parse(scriptContent);
        } catch (error) {
            console.error(`Error parsing JSON for app ${aptoideAppInfo.id}:`, error);
        }
        aptoideAppInfo.versionsData = json.props.versions;

        json.props.versions.forEach(version => {
            updateVersionInfoWithApkInfo(aptoideAppInfo, version);
        })

        // Update state for the specific app with version data
        setAptoideApps(prevApps => {
            return prevApps?.map(app => {
                if (app.id === aptoideAppInfo.id) {
                    return aptoideAppInfo;
                }
                return app;
            });
        });
    };

    const handleSearchClick = async (e) => {
        e.preventDefault();

        console.log('handleSearchClick')

        const value2 = value;
        if (value2.trim().length === 0) {
            setAptoideApps(null);
            return;
        }

        setLoading(true);

        try {
            const responseData = await searchApp(value);
            /** @var {Array} aptoideAppList */
            const aptoideAppList = responseData?.datalist?.list || [];
            setAptoideApps(aptoideAppList);

            aptoideAppList.forEach(aptoideAppInfo => {
                updateAptoideAppsWithVersions(aptoideAppInfo);
            });
        } catch (error) {
            console.error('Error searching for apps:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <SearchInput
                value={value}
                onChange={handleInputChange}
                onClick={handleSearchClick}
            />
            <div className="h-[calc(100vh_-_106px_-_56px)] overflow-y-auto">
                {loading && <Loading />}
                {!loading && aptoideApps === null && <FirstView />}
                {!loading && aptoideApps && aptoideApps.length === 0 && <NoResults value={value} />}
                {!loading && aptoideApps && aptoideApps.length > 0 && (
                    <div className="flex flex-col">
                        {aptoideApps.map((aptoideAppInfo) => (
                            <AppInfo key={aptoideAppInfo.id} aptoideAppInfo={aptoideAppInfo} />
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 text-center flex justify-center items-center">
                Have any issue? Report at
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github" className="h-6 w-6 inline-block" />
                <a href="https://github.com/faizananwerali/aptoide-apk-downloader-extension/issues"
                   className="text-blue-500 hover:text-blue-700 font-semibold"
                   target="_blank"
                   rel="noreferrer">faizananwerali/aptoide-apk-downloader-extension</a>
            </div>
        </div>
    );
};

export default SearchArea;
