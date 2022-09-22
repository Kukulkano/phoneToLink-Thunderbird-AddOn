
async function makeLinks() {
    // get protocol to use
    let setting = await browser.storage.sync.get("protocol");

    let proto = setting.protocol;
    
    if (!proto) {
        // Found no specific setting for phoneToLink AddOn. Using default.
        proto = "callto:";
    }

    // replace numbers
    let body = document.body.innerHTML;

    // HINT: Copy this to https://regex101.com for validation and testing
    const r = /[^\d"':#\>a-z](00|0|\+)\s?(\d{2,})(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)/ig;

    body = body.replace(r, '<a href="'+proto+'$1$2$3$4$5$6$7">$&</a>');

    document.body.innerHTML = body;
}

makeLinks()