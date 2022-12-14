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

    // cleanup weird linebreaks that hinder number detection
    if (body.search("content=\"text/html") != -1 || body.search("class=\"moz-text-html") != -1) {
        // html bodies
        // console.log("replace", body);
        body = body.replace(/[\r|\n]{1}\s{0,40}/g, " ");
        body = body.replace(/\s{2,40}/g, " ");
    } else {
        // plain text bodies
        // console.log("no replace", body);
    }

    // HINT: Copy this to https://regex101.com for validation and testing
    const r = /(\<a .*?a\>|\<style.*?style\>|\<pre.*?pre\>|{.*?}|style=".*?"|[\s>\(]{1}(00|0|\+|&#43;|&plus;){1}\s?(\d{2,})(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*)(?:[ -\/\\\(\)]){0,2}(\d*))/igs;

    body = body.replace(r, telReplace);

    document.body.innerHTML = body;
}

function telReplace(m, f1, f2, f3, f4, f5, f6, f7, f8) {
    // console.log(m, f1, f2, f3, f4, f5, f6, f7, f8);

    if (f1.substr(0, 1) === "<" || 
        f1.substr(0, 1) === "{" || 
        f1.substr(0, 5) === "style" || 
        f1.substr(0, 6) === "<style" ||
        f1.substr(0, 4) === "<pre") {
        // keep found links, curlys, pre and style tags like they are
        return m;
    }

    m = m.trim();

    let number = (f2+f3+f4+f5+f6+f7+f8).trim();
    if (m.substr(0,1) == ">") {
        m = m.substr(1); // cut pre >
        return '><a href="'+proto+number+'">'+m+'</a>';
    }
    if (m.slice(-1) == "&") {
        m = m.slice(0, -1); // cut pre >
        return '<a href="'+proto+number+'">'+m+'</a>&';
    }
    console.log("use", m, number);
    return ' <a href="'+proto+number+'">'+m+'</a>';
}

makeLinks()