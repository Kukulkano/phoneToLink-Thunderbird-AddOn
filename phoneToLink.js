var proto = undefined; // global held protocol

async function makeLinks() {
    // get protocol to use
    let setting = await browser.storage.sync.get("protocol");

    proto = setting.protocol;
    
    if (!proto) {
        // Found no specific setting for phoneToLink AddOn. Using default.
        proto = "callto:";
    }

    // replace numbers
    let body = document.body.innerHTML;

    // HINT: Copy this to https://regex101.com for validation and testing
    const r = /(\<a .*?a\>|[$\s\()]{1}(00|0|\+|&#43;|&plus;)\s?(\d{2,})(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*))/igs;

    body = body.replace(r, telReplace);

    document.body.innerHTML = body;
}

function telReplace(m, f1, f2, f3, f4, f5, f6, f7, f8) {
    // console.log(m, f1, f2, f3, f4, f5, f6, f7, f8);

    if (f1.substr(0, 1) === "<") {
        // keep found links like they are
        return m;
    }
    let number = f2+f3+f4+f5+f6+f7+f8;
    return ' <a href="'+proto+number.trim()+'">'+m.trim()+'</a>';
}

makeLinks()