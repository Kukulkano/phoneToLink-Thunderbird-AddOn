let currentTab = undefined;

let myPromise = messenger.messageDisplayScripts.register({
    js: [{
        file: "/phoneToLink.js",
    }],
});