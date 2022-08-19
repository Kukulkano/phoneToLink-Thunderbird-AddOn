function saveOptions(e) {
    e.preventDefault();
    let val = document.querySelector("#protocol").value;
    if (!val) {
        val = "callto:";
    }
    browser.storage.sync.set({
        protocol: val
    });
}
  
function restoreOptions() {
  
    function setCurrentChoice(result) {
        document.querySelector("#protocol").value = result.protocol || "callto:";
    }
  
    function onError(error) {
        console.error(error);
    }
  
    let getting = browser.storage.sync.get("protocol");
    getting.then(setCurrentChoice, onError);
}

// restore already saved options
document.addEventListener("DOMContentLoaded", restoreOptions);

// catch submit button and save settings
document.querySelector("form").addEventListener("submit", saveOptions);