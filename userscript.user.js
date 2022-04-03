// ==UserScript==
// @name         r/httyd Logo template
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the canvas!
// @author       oralekin, exdeejay (xDJ_), 101arrowz
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_xmlhttpRequest
// @connect      dotwildcard.com
// ==/UserScript==
const DATA_SOURCE = 'https://dotwildcard.com/img/toothless_template.png';
const getToothlessImg = async () => {
  const toothlessBlob = new Blob([new Uint8Array(await new Promise(resolve => {
      GM_xmlhttpRequest({ method: 'GET', url: DATA_SOURCE, responseType: 'arraybuffer', onload: function(response) { resolve(response.response); } });
  }))], { type: 'image/png' });
  const toothlessDataURL = await new Promise(resolve => {
      const fr = new FileReader();
      fr.onload = () => { resolve(fr.result); }
      fr.readAsDataURL(toothlessBlob);
  });
  const tmpImg = document.createElement('img');
  tmpImg.src = toothlessDataURL;
  await new Promise(resolve => tmpImg.onload = resolve);
  tmpImg.style = `position: absolute;left: 0;top: 0;image-rendering: pixelated;width: ${tmpImg.width / 3}px;height: ${tmpImg.height / 3}px;`;
  return tmpImg;
};

let oldToothlessImg;

const addToothlessImg = async () => {
  if (oldToothlessImg) oldToothlessImg.remove();
  document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0].appendChild(
    oldToothlessImg = await getToothlessImg()
  );
};

if (window.top !== window.self) {
  window.addEventListener('load', () => {
    addToothlessImg();
    setInterval(addToothlessImg, 60 * 1000);
  }, false);

}