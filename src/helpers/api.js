/**
 * GET request
 *
 * Sample URL: https://webservices.aptoide.com/webservices/3/getApkInfo/id:66444852/json
 *
 * @param appId
 * @returns {Promise<any>}
 */
async function fetchData(appId) {
    const response = await fetch(`https://webservices.aptoide.com/webservices/3/getApkInfo/id:${appId}/json`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

/**
 * POST request
 *
 * @param appId
 * @returns {Promise<any>}
 */
async function fetchDataAlternative(appId) {
    const myHeaders = new Headers();
    myHeaders.append("User-Agent", "Android");

    const formData = new FormData();
    formData.append("identif", "id:" + appId);
    formData.append("mode", "json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    const response = await fetch("https://webservices.aptoide.com/webservices/3/getApkInfo", requestOptions)
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

/**
 *
 * Info regarding this API.
 * https://ws2.aptoide.com/api/7/app/getMeta?info=1
 *
 * Sample URL: https://ws2.aptoide.com/api/7/app/getMeta?app_id=66444852
 *
 * @param appId
 * @returns {Promise<any>}
 */
async function fetchDataAlternative2(appId) {
    const response = await fetch(`https://ws2.aptoide.com/api/7/app/getMeta?app_id=${appId}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

/**
 * Sample URL: https://web-api-cache.aptoide.com/search?query=com.facebook.katana
 *
 * @param pkg
 * @returns {Promise<any>}
 */
async function searchApp(pkg) {
    const response = await fetch(`https://web-api-cache.aptoide.com/search?query=${pkg}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

/**
 * Info regarding this API.
 * https://ws75.aptoide.com/api/7/apps/search?info=1
 *
 * Sample URL: https://ws75.aptoide.com/api/7/apps/search?query=com.facebook.katana
 *
 * @param pkg
 * @returns {Promise<any>}
 */
async function searchAppAlternative(pkg) {
    const response = await fetch(`https://ws75.aptoide.com/api/7/apps/search?query=${pkg}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

/**
 * Sample URL: https://facebook.en.aptoide.com/app
 * @param uname
 * @returns {Promise<Document>}
 */
async function fetchHTMLPage(uname) {
    const response = await fetch(`https://${uname}.en.aptoide.com/app`);
    if (response.ok) {
        const htmlString = await response.text(); // Get the HTML response as text
        const parser = new DOMParser();
        // Parse HTML string to a Document object
        return parser.parseFromString(htmlString, 'text/html');
    } else {
        throw new Error('Network response was not ok.');
    }
}

export {
    fetchData,
    fetchDataAlternative,
    fetchDataAlternative2,
    searchApp,
    searchAppAlternative,
    fetchHTMLPage
}
