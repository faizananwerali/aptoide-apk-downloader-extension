chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
        if (changeInfo.status === 'loading') {
            const aptoideURLPattern = /https:\/\/.*\.en\.aptoide\.com\/app/gm;
            const regexTest = aptoideURLPattern.test(tab.url);
            if (regexTest) {
                chrome.action.setIcon({ path: '../../icons/normal_48.png', tabId: tabId });
            } else {
                chrome.action.setIcon({ path: '../../icons/grayed_out_48.png', tabId: tabId });
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});
