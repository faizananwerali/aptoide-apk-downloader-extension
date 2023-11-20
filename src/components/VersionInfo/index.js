import React from 'react';
import DownloadButton from '../DownloadButton';
import Icon from '../Icon';
import Title from '../Title';

const VersionInfo = ({ version }) => {
    return (
        <div className="flex pl-8 py-4 pr-4 gap-2.5">
            <Icon src={version.icon} alt="" />
            <Title className="max-w-[234px]"
                   name={version.name}
                   vername={version.vername} />
            {version.apkInfo && (
                <div className="download_btn_parent">
                    {version.apkInfo.path && (
                        <DownloadButton path={version.apkInfo.path} buttonText="Download" />
                    )}
                    {version.apkInfo.altpath && (
                        <DownloadButton path={version.apkInfo.altpath} buttonText="Download Alt" />
                    )}
                </div>
            )}
        </div>
    );
};

export default VersionInfo;
