// ==UserScript==
// @name         bebe template
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the canvas!
// @author       oralekin, LittleEndu, ekgame, paoda
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

const OVERLAY_URL = "https://cdn.discordapp.com/attachments/959883192951779390/960067040851402762/template.png";

if (window.top !== window.self) {
    window.addEventListener('load', () => {
        // Load the image
        const image = document.createElement("img");
        image.id = "overlay";
        image.src = OVERLAY_URL;
        image.onload = () => {
            image.style = `position: absolute; left: 0; top: 0; width: ${image.width / 3}px; height: ${image.height / 3}px; image-rendering: pixelated; z-index: 1`;
        };

        // Add the image as overlay
        const camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
        const canvas = camera.querySelector("mona-lisa-canvas");
        canvas.shadowRoot.querySelector('.container').appendChild(image);

        // Add a style to put a hole in the pixel preview (to see the current or desired color)
        const waitForPreview = setInterval(() => {
            const preview = camera.querySelector("mona-lisa-pixel-preview");
            if (preview) {
                clearInterval(waitForPreview);
                const style = document.createElement('style')
                style.innerHTML = '.pixel { clip-path: polygon(-20% -20%, -20% 120%, 37% 120%, 37% 37%, 62% 37%, 62% 62%, 37% 62%, 37% 120%, 120% 120%, 120% -20%); }'
                preview.shadowRoot.appendChild(style);
            }
        }, 100);

        // Toggle Overlay with Right Click
        document.querySelector("mona-lisa-embed").addEventListener("auxclick", e => {
            const img = canvas.shadowRoot.getElementById("overlay");
            img.hidden = !img.hidden;
        });

    }, false);
}