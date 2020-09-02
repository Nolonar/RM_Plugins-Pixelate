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
// N_Pixelate
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Disables smoothing to make graphics look pixelated.
 * @author Nolonar
 * @url https://github.com/Nolonar/RM_Plugins-Pixelate
 * 
 * 
 * @help Version 1.0.0
 * This plugin does not provide plugin commands.
 */

(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerText = "#gameCanvas, #GameCanvas { image-rendering: pixelated; }";
    document.head.appendChild(style);

    Bitmap = class Bitmap_Pixelated extends Bitmap {
        initialize(width, height) {
            super.initialize(width, height);
            this.smooth = false;
        }
    }
})();
