// Function to make GET request using Fetch API
async function fetchData(url) {
    const response = await fetch(url);
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

 // https://calculator-panatech-apps.en.aptoide.com/app
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
                        fetchData(`https://webservices.aptoide.com/webservices/2/getApkInfo/id:${appId}/json`)
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
