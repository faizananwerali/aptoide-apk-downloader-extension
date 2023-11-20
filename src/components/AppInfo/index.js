import React, {useState} from 'react';
import DownloadButton from '../DownloadButton';
import VersionInfo from "../VersionInfo";
import Icon from '../Icon';
import Title from '../Title';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import { faChevronUp } from '@fortawesome/fontawesome-free-solid';

const AppInfo = ({ aptoideAppInfo }) => {
    const [isHidden, setHidden] = useState(true);

    const onClick = () => setHidden(!isHidden);

    return (
        <div className="flex flex-col">
            <div className="flex p-4 gap-2.5">
                <Icon src={aptoideAppInfo.icon} alt="" />
                <Title className="max-w-[250px]"
                       name={aptoideAppInfo.name}
                       packageName={aptoideAppInfo.package}
                       vername={aptoideAppInfo.file.vername} />
                {aptoideAppInfo.file && (
                    <div className="download_btn_parent">
                        {aptoideAppInfo.file.path && (
                            <DownloadButton path={aptoideAppInfo.file.path} buttonText="Download" />
                        )}
                        {aptoideAppInfo.file.path_alt && (
                            <DownloadButton path={aptoideAppInfo.file.path_alt} buttonText="Download Alt" />
                        )}
                    </div>
                )}
            </div>
            {aptoideAppInfo.versionsData && (
                <>
                    <div className="text-[10px] bg-orange-500 text-gray-200 mx-4 p-0.5 text-center cursor-pointer" onClick={onClick}>Versions {
                        isHidden ? <FontAwesomeIcon icon={faChevronDown} className="text-gray-200" /> : <FontAwesomeIcon icon={faChevronUp} className="text-gray-200" />
                    }</div>
                    {!isHidden && (
                        <div className="max-h-[200px] overflow-y-auto">
                            {aptoideAppInfo.versionsData.map((version) => (
                                <VersionInfo key={version.id} version={version} />
                            ))}
                        </div>
                    )}
                </>
            )}
            <hr className="h-px my-2 bg-gray-200 border-0 " />
        </div>
    );
};

export default AppInfo;
