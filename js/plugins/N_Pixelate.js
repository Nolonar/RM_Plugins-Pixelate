/* 
 * MIT License
 * 
 * Copyright (c) 2020 Nolonar
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//=============================================================================
// Metadata
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Disables smoothing to make graphics look pixelated.
 * @author Nolonar
 * @url https://github.com/Nolonar/RM_Plugins
 * 
 * @param isHybridPixelateEnabled
 * @text Hybrid pixelate
 * @desc If ON, disables pixelation when window is smaller than the game's resolution.
 * @type boolean
 * @default false
 * 
 * 
 * @help Version 1.1.0
 * This plugin does not provide plugin commands.
 */

(() => {
    const PLUGIN_NAME = "N_Pixelate";

    const parameters = PluginManager.parameters(PLUGIN_NAME);
    parameters.isHybridPixelateEnabled = parameters.isHybridPixelateEnabled === "true";

    const pixelateClass = "pixelated";
    const style = document.head.appendChild(document.createElement("style"));
    style.innerText = `canvas.${pixelateClass} { image-rendering: pixelated; }`;

    if (!parameters.isHybridPixelateEnabled) {
        // override hybrid pixelation
        style.innerText = "#gameCanvas, #GameCanvas { image-rendering: pixelated; }";
    }

    function onResize() {
        // Canvas does not exist when plugin is loaded, and therefore must be accessed here.
        const canvas = document.getElementById("gameCanvas") || document.getElementById("GameCanvas");

        if (Graphics.height > window.innerHeight || Graphics.width > window.innerWidth) {
            canvas.classList.remove(pixelateClass);
        } else {
            canvas.classList.add(pixelateClass);
        }
    }

    window.addEventListener("resize", onResize);

    const Bitmap_initialize = Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function (width, height) {
        Bitmap_initialize.call(this, width, height);
        this.smooth = false;
    }

    const Scene_Boot_initialize = Scene_Boot.prototype.initialize;
    Scene_Boot.prototype.initialize = function () {
        Scene_Boot_initialize.call(this);

        // Canvas does not exist when plugin is loaded, and therefore must be accessed here.
        onResize();
    }
})();
