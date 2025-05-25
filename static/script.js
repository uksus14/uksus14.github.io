const flag = '&'.repeat(2);
const devUnfinishedWarning = document.getElementById('devUnfinishedWarning');
const normalize = str => str.toLowerCase().trim()
function highlightUnfinished(node) {
    if (node.nodeType === Node.TEXT_NODE || !node.innerText.includes(flag)) return true;
    if (Array.from(node.childNodes).map(child => highlightUnfinished(child)).every(r=>r)) {
        devUnfinishedWarning.style.display = 'block';
        node.style.color = 'red';
    }return false;
}function fullTranslate(lang) {
    // changing the font of the page
    [...document.getElementsByClassName('en-font')].forEach(el => el.classList.replace('en-font', `${lang}-font`));
    fetch(`static/${lang}.json`).then(response => response.json()).then(data => {
        const dict = Object.fromEntries(Object.entries(data).map(([key, value]) => [normalize(key), value]));
        translate(document.body, dict)
    }).catch(error => console.error(`Error fetching dictionary ${lang}:`, error));
}function translate(node, dict) {
    const text = normalize(node.textContent);
    if (!text)return;
    if (node.nodeType === Node.TEXT_NODE) {
        if (dict[text]) node.textContent = dict[text];
        else if (!text.includes(flag)) console.warn(`Translation not found for: ${node.textContent}`);
    }node.childNodes.forEach(child => translate(child, dict));
}