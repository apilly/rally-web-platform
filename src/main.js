import runStudy from "./study.js";
import auth from "./auth.js";

// Listen for login messages from the options UI.
chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(async message => {
        const initialState = await auth.initialize();
        if (initialState._isLoggedIn) {
            console.debug("already logged in:", initialState);
            const result = JSON.stringify(initialState);
            port.postMessage({ result });
        } else {
            try {
                if ("email" in message && "password" in message) {
                    const result = await auth.loginWithEmailAndPassword(message);
                    port.postMessage({ result });
                } else if ("provider" in message && message.provider === "google") {
                    const result = await auth.loginWithGoogle();
                    console.debug("logged in via google:", result);
                    port.postMessage({ result });
                }
            } catch (ex) {
                console.error(ex);
                port.postMessage({ error: ex.message });
            }
        }
    });
});

// FIXME - our webextension polyfill doesn't seem to be working, getting errors about `browser.*` missing in Chrome?!
// runStudy(__ENABLE_DEVELOPER_MODE__);

chrome.runtime.openOptionsPage();