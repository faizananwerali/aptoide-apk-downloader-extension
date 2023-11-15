chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated:', tabId, changeInfo, tab);

    try {
        if (changeInfo.status === 'loading') {
            const aptoideURLPattern = /https:\/\/.*\.en\.aptoide\.com\/app/gm;
            const regexTest = aptoideURLPattern.test(tab.url);
            console.log('Match test result:', regexTest);
            if (regexTest) {
                console.log('Changing icon to normal');
                chrome.action.setIcon({ path: 'icons/normal_48.png', tabId: tabId });
            } else {
                console.log('Changing icon to grayed out');
                chrome.action.setIcon({ path: 'icons/grayed_out_48.png', tabId: tabId });
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});
