async function fetchData(appId) {
    // https://webservices.aptoide.com/webservices/3/getApkInfo/id:66444852/json
    const response = await fetch(`https://webservices.aptoide.com/webservices/3/getApkInfo/id:${appId}/json`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

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

async function fetchDataAlternative2(appId) {
    // https://ws75.aptoide.com/api/7/app/getMeta?app_id=66444852
    const response = await fetch(`https://ws75.aptoide.com/api/7/app/getMeta?app_id=${appId}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

async function searchApp(pkg) {
    // https://web-api-cache.aptoide.com/search?query=com.facebook.katana
    const response = await fetch(`https://web-api-cache.aptoide.com/search?query=${pkg}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

async function searchAppAlternative(pkg) {
    // https://ws75.aptoide.com/api/7/apps/search?query=com.facebook.katana
    const response = await fetch(`https://ws75.aptoide.com/api/7/apps/search?query=${pkg}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok.');
    }
}

// Set anchor
function setAnchor(anchor, apkInfo) {
    anchor.parentElement.innerHTML = `
        <div class="download_btn_parent">
            <a class="download_btn" href="${apkInfo.path || ''}" download>
                <div class="download_btn_text">Download</div>
            </a>
            <a class="download_btn" href="${apkInfo.altpath || ''}" download>
                <div class="download_btn_text">Download Alt</div>
            </a>
        </div>
    `;
}

// Function to modify anchor elements
function modifyAnchors() {
    const anchors = document.querySelectorAll('a[href^="https://en.aptoide.com/download?app_id="]');
    const fetchPromises = [];

    anchors.forEach((anchor) => {
        try {
            const url = new URL(anchor.href);
            const appId = url.searchParams.get('app_id');

            if (appId) {
                // Check if data is already cached
                const cachedData = sessionStorage.getItem('aptoide-apk-downloader-extension-' + appId);
                if (cachedData) {
                    const { apk } = JSON.parse(cachedData);
                    setAnchor(anchor, apk);
                } else {
                    fetchPromises.push(
                        fetchData(appId)
                            .then((responseData) => {
                                // Cache the response
                                sessionStorage.setItem('aptoide-apk-downloader-extension-' + appId, JSON.stringify(responseData));
                                const { apk } = responseData;
                                setAnchor(anchor, apk);
                            })
                            .catch((error) => {
                                console.error('Error fetching data:', error);
                            })
                    );
                }
            }
        } catch (error) {
            console.error('Error parsing URL:', error);
        }
    });

    // Execute all fetch requests in parallel
    Promise.all(fetchPromises)
        .then(() => {
            console.log('All fetch requests completed.');
        })
        .catch((error) => {
            console.error('Error in Promise.all:', error);
        });
}

// Execute the modification on page load
modifyAnchors();
