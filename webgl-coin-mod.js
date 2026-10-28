/**
 * SUBWAY SURFERS REAL WEBGL 3D TECH COIN MOD
 * Replaces in-game gold star coins with 90 realistic 3D programming language coins.
 */

(function () {
  'use strict';

  function remoteLog(msg) {
    try {
      fetch('/log?msg=' + encodeURIComponent(msg)).catch(() => {});
    } catch (e) {}
    console.log('[CoinMod]', msg);
  }

  remoteLog('Active! Initializing 90 Programming Languages Mod Engine...');

  // Fallback 90 Languages if languages.js is still loading
  const FALLBACK_LANGS = [
    { id: 'python', name: 'Python', symbol: '🐍', text: 'Py', bg: '#3776AB', sec: '#FFD43B' },
    { id: 'javascript', name: 'JavaScript', symbol: 'JS', text: 'JS', bg: '#F7DF1E', sec: '#000000' },
    { id: 'typescript', name: 'TypeScript', symbol: 'TS', text: 'TS', bg: '#3178C6', sec: '#FFFFFF' },
    { id: 'rust', name: 'Rust', symbol: '🦀', text: 'RUST', bg: '#CE412B', sec: '#FFFFFF' },
    { id: 'cpp', name: 'C++', symbol: 'C++', text: 'C++', bg: '#00599C', sec: '#FFFFFF' },
    { id: 'csharp', name: 'C#', symbol: 'C#', text: 'C#', bg: '#68217A', sec: '#FFFFFF' },
    { id: 'java', name: 'Java', symbol: '☕', text: 'JAVA', bg: '#ED8B00', sec: '#5382A1' },
    { id: 'golang', name: 'Go', symbol: '🐹', text: 'GO', bg: '#00ADD8', sec: '#FFFFFF' },
    { id: 'swift', name: 'Swift', symbol: '🦅', text: 'SWIFT', bg: '#F05138', sec: '#FFFFFF' },
    { id: 'kotlin', name: 'Kotlin', symbol: '🅺', text: 'KT', bg: '#7F52FF', sec: '#FFFFFF' },
    { id: 'ruby', name: 'Ruby', symbol: '💎', text: 'RUBY', bg: '#CC342D', sec: '#FFFFFF' },
    { id: 'php', name: 'PHP', symbol: '🐘', text: 'PHP', bg: '#777BB4', sec: '#FFFFFF' },
    { id: 'html5', name: 'HTML5', symbol: '🌐', text: 'HTML', bg: '#E34F26', sec: '#FFFFFF' },
    { id: 'css3', name: 'CSS3', symbol: '🎨', text: 'CSS', bg: '#1572B6', sec: '#FFFFFF' },
    { id: 'sql', name: 'SQL', symbol: '🐬', text: 'SQL', bg: '#4479A1', sec: '#FFFFFF' }
  ];

  const getLangs = () => (typeof PROGRAMMING_LANGUAGES !== 'undefined' ? PROGRAMMING_LANGUAGES : FALLBACK_LANGS);

  // Render high-resolution 3D coin canvas for any language and dimension
  function renderCoinCanvas(lang, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const cx = width / 2;
    const cy = height / 2;
    const r = (Math.min(width, height) / 2) - 2;

    // 1. Shiny Metallic Gold Coin Outer Rim
    const rimGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.2, cx, cy, r);
    rimGrad.addColorStop(0, '#fffbe0');
    rimGrad.addColorStop(0.5, '#ffd700');
    rimGrad.addColorStop(0.85, '#cc9900');
    rimGrad.addColorStop(1, '#885500');

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();

    // 2. Milled Ridges (Coin Reeding around perimeter)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = Math.max(1, Math.round(width / 64));
    const numNotches = 36;
    for (let i = 0; i < numNotches; i++) {
      const angle = (i / numNotches) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * (r - 1);
      const y1 = cy + Math.sin(angle) * (r - 1);
      const x2 = cx + Math.cos(angle) * (r - (width * 0.08));
      const y2 = cy + Math.sin(angle) * (r - (width * 0.08));
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 3. Inner Language Emblem Circle
    const innerR = r * 0.78;
    const centerGrad = ctx.createLinearGradient(cx - innerR, cy - innerR, cx + innerR, cy + innerR);
    centerGrad.addColorStop(0, lang.bg || '#333333');
    centerGrad.addColorStop(1, '#111122');

    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = centerGrad;
    ctx.fill();

    // Gold Bevel Border around inner circle
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(2, Math.round(width / 36));
    ctx.strokeStyle = '#ffd700';
    ctx.stroke();

    // 4. Official Language Logo / Symbol
    ctx.fillStyle = lang.sec || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Symbol / Emoji Icon
    const symSize = Math.round(width * 0.35);
    ctx.font = `bold ${symSize}px sans-serif`;
    ctx.fillText(lang.symbol || '⚡', cx, cy - (width * 0.08));

    // Language Name Text Underneath
    const txtSize = Math.round(width * 0.17);
    ctx.font = `900 ${txtSize}px "Russo One", sans-serif`;
    ctx.fillText((lang.text || lang.name || 'DEV').toUpperCase(), cx, cy + (width * 0.22));

    // 5. Specular Gloss Curved Sheen
    const sheen = ctx.createLinearGradient(cx, cy - innerR, cx, cy);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 2, Math.PI * 1.15, Math.PI * 1.85);
    ctx.closePath();
    ctx.fillStyle = sheen;
    ctx.fill();

    return canvas;
  }

  // Fast DXT1 4x4 block encoder
  function encodeDXT1Block(pixels16, out, outOffset) {
    let minLum = 999999, maxLum = -1;
    let minIdx = 0, maxIdx = 0;
    for (let i = 0; i < 16; i++) {
      const p = i * 4;
      const lum = pixels16[p] * 299 + pixels16[p + 1] * 587 + pixels16[p + 2] * 114;
      if (lum < minLum) { minLum = lum; minIdx = i; }
      if (lum > maxLum) { maxLum = lum; maxIdx = i; }
    }

    const r0 = pixels16[maxIdx * 4], g0 = pixels16[maxIdx * 4 + 1], b0 = pixels16[maxIdx * 4 + 2];
    const r1 = pixels16[minIdx * 4], g1 = pixels16[minIdx * 4 + 1], b1 = pixels16[minIdx * 4 + 2];

    const c0_565 = ((Math.min(31, Math.round(r0 * 31 / 255))) << 11) |
                   ((Math.min(63, Math.round(g0 * 63 / 255))) << 5) |
                    (Math.min(31, Math.round(b0 * 31 / 255)));
    const c1_565 = ((Math.min(31, Math.round(r1 * 31 / 255))) << 11) |
                   ((Math.min(63, Math.round(g1 * 63 / 255))) << 5) |
                    (Math.min(31, Math.round(b1 * 31 / 255)));

    let c0Val = c0_565, c1Val = c1_565;
    if (c0Val <= c1Val) {
      if (c0Val === c1Val) {
        out[outOffset] = c0Val & 0xff;
        out[outOffset + 1] = (c0Val >> 8) & 0xff;
        out[outOffset + 2] = c1Val & 0xff;
        out[outOffset + 3] = (c1Val >> 8) & 0xff;
        out[outOffset + 4] = 0;
        out[outOffset + 5] = 0;
        out[outOffset + 6] = 0;
        out[outOffset + 7] = 0;
        return;
      }
      c0Val = c1_565;
      c1Val = c0_565;
    }

    out[outOffset] = c0Val & 0xff;
    out[outOffset + 1] = (c0Val >> 8) & 0xff;
    out[outOffset + 2] = c1Val & 0xff;
    out[outOffset + 3] = (c1Val >> 8) & 0xff;

    let lookup = 0;
    const range = Math.max(1, maxLum - minLum);
    for (let i = 0; i < 16; i++) {
      const p = i * 4;
      const lum = pixels16[p] * 299 + pixels16[p + 1] * 587 + pixels16[p + 2] * 114;
      const factor = (lum - minLum) / range;
      let code = 0;
      if (factor > 0.75) code = 0;
      else if (factor > 0.5) code = 2;
      else if (factor > 0.25) code = 3;
      else code = 1;
      lookup |= (code << (i * 2));
    }
    out[outOffset + 4] = lookup & 0xff;
    out[outOffset + 5] = (lookup >> 8) & 0xff;
    out[outOffset + 6] = (lookup >> 16) & 0xff;
    out[outOffset + 7] = (lookup >> 24) & 0xff;
  }

  // Fast DXT5 4x4 block encoder
  function encodeDXT5Block(pixels16, out, outOffset) {
    let avgAlpha = 0;
    for (let i = 0; i < 16; i++) {
      avgAlpha += pixels16[i * 4 + 3];
    }
    avgAlpha = Math.round(avgAlpha / 16);

    out[outOffset] = avgAlpha;
    out[outOffset + 1] = avgAlpha;
    out[outOffset + 2] = 0;
    out[outOffset + 3] = 0;
    out[outOffset + 4] = 0;
    out[outOffset + 5] = 0;
    out[outOffset + 6] = 0;
    out[outOffset + 7] = 0;

    encodeDXT1Block(pixels16, out, outOffset + 8);
  }

  // Global Coin Mod Registry
  const CoinMod = {
    activeTextures: [],
    currentLangIdx: 0,
    currentGl: null,

    // Inspect texture buffer and replace coins
    inspectAndReplace(gl, target, level, internalFormat, width, height, heap, offset, isCompressed, imageSize) {
      if (!heap || width < 32 || height < 32) return false;
      this.currentGl = gl;

      try {
        const langs = getLangs();
        const currentLang = langs[this.currentLangIdx % langs.length];

        // 1. COMPRESSED DXT TEXTURE
        if (isCompressed) {
          const isDXT1 = (internalFormat === 0x83F0 || internalFormat === 0x83F1 || internalFormat === 0x8C4C || internalFormat === 0x8C4D);
          const isDXT5 = (internalFormat === 0x83F3 || internalFormat === 0x8C4F);
          if (!isDXT1 && !isDXT5) return false;

          const blockSize = isDXT5 ? 16 : 8;
          const colorOffset = isDXT5 ? 8 : 0;
          const numBlocksX = Math.ceil(width / 4);
          const numBlocksY = Math.ceil(height / 4);
          const totalBlocks = numBlocksX * numBlocksY;

          let goldBlocks = 0;
          let minBx = numBlocksX, maxBx = 0, minBy = numBlocksY, maxBy = 0;

          for (let by = 0; by < numBlocksY; by++) {
            for (let bx = 0; bx < numBlocksX; bx++) {
              const bIdx = offset + (by * numBlocksX + bx) * blockSize + colorOffset;
              if (bIdx + 2 > heap.length) continue;

              const c0 = heap[bIdx] | (heap[bIdx + 1] << 8);
              const r5 = (c0 >> 11) & 0x1f;
              const g6 = (c0 >> 5) & 0x3f;
              const b5 = c0 & 0x1f;

              // Gold color detection: high red, high green, low blue
              if (r5 >= 22 && g6 >= 30 && b5 <= 12 && r5 >= (g6 >> 1)) {
                goldBlocks++;
                if (bx < minBx) minBx = bx;
                if (bx > maxBx) maxBx = bx;
                if (by < minBy) minBy = by;
                if (by > maxBy) maxBy = by;
              }
            }
          }

          const goldRatio = totalBlocks > 0 ? (goldBlocks / totalBlocks) : 0;

          // A. Standalone Coin Texture
          if (goldRatio > 0.18 && width <= 512 && height <= 512) {
            remoteLog(`🪙 Standalone DXT Coin Texture Detected (${width}x${height}, ${(goldRatio*100).toFixed(1)}% gold)! Injecting ${currentLang.name}...`);
            const coinCanvas = renderCoinCanvas(currentLang, width, height);
            const ctx = coinCanvas.getContext('2d');
            const imgData = ctx.getImageData(0, 0, width, height).data;

            const blockBuf = new Uint8Array(64);
            for (let by = 0; by < numBlocksY; by++) {
              for (let bx = 0; bx < numBlocksX; bx++) {
                const bOffset = offset + (by * numBlocksX + bx) * blockSize;
                for (let py = 0; py < 4; py++) {
                  for (let px = 0; px < 4; px++) {
                    const pIdx = ((by * 4 + py) * width + (bx * 4 + px)) * 4;
                    const bIdx = (py * 4 + px) * 4;
                    blockBuf[bIdx] = imgData[pIdx];
                    blockBuf[bIdx + 1] = imgData[pIdx + 1];
                    blockBuf[bIdx + 2] = imgData[pIdx + 2];
                    blockBuf[bIdx + 3] = imgData[pIdx + 3];
                  }
                }
                if (isDXT5) encodeDXT5Block(blockBuf, heap, bOffset);
                else encodeDXT1Block(blockBuf, heap, bOffset);
              }
            }

            this.trackActiveTexture(gl, width, height, true, internalFormat);
            this.updateBadge(currentLang);
            return true;
          }

          // B. Coin inside Texture Atlas
          const boxW = (maxBx - minBx + 1) * 4;
          const boxH = (maxBy - minBy + 1) * 4;
          if (goldBlocks >= 12 && boxW >= 24 && boxH >= 24 && boxW <= 256 && boxH <= 256 && Math.abs(boxW - boxH) < 36) {
            remoteLog(`🪙 Atlas DXT Coin Patch Detected at [${minBx*4}, ${minBy*4}] (${boxW}x${boxH})! Injecting ${currentLang.name}...`);
            const coinSize = Math.max(boxW, boxH);
            const coinCanvas = renderCoinCanvas(currentLang, coinSize, coinSize);
            const ctx = coinCanvas.getContext('2d');
            const imgData = ctx.getImageData(0, 0, coinSize, coinSize).data;

            const pNumBx = Math.ceil(coinSize / 4);
            const pNumBy = Math.ceil(coinSize / 4);
            const blockBuf = new Uint8Array(64);

            for (let py = 0; py < pNumBy; py++) {
              const targetBy = minBy + py;
              if (targetBy >= numBlocksY) break;
              for (let px = 0; px < pNumBx; px++) {
                const targetBx = minBx + px;
                if (targetBx >= numBlocksX) break;

                const bOffset = offset + (targetBy * numBlocksX + targetBx) * blockSize;
                let hasAlpha = false;
                for (let suby = 0; suby < 4; suby++) {
                  for (let subx = 0; subx < 4; subx++) {
                    const imgX = px * 4 + subx;
                    const imgY = py * 4 + suby;
                    const pIdx = (imgY * coinSize + imgX) * 4;
                    const bIdx = (suby * 4 + subx) * 4;
                    blockBuf[bIdx] = imgData[pIdx];
                    blockBuf[bIdx + 1] = imgData[pIdx + 1];
                    blockBuf[bIdx + 2] = imgData[pIdx + 2];
                    blockBuf[bIdx + 3] = imgData[pIdx + 3];
                    if (imgData[pIdx + 3] > 30) hasAlpha = true;
                  }
                }
                if (hasAlpha) {
                  if (isDXT5) encodeDXT5Block(blockBuf, heap, bOffset);
                  else encodeDXT1Block(blockBuf, heap, bOffset);
                }
              }
            }

            this.trackActiveTexture(gl, width, height, true, internalFormat);
            this.updateBadge(currentLang);
            return true;
          }
        }

        // 2. UNCOMPRESSED RGBA TEXTURE
        else {
          const totalPixels = width * height;
          let goldPixels = 0;
          const step = Math.max(1, Math.floor(totalPixels / 150));
          let sampled = 0;

          for (let p = 0; p < totalPixels; p += step) {
            const idx = offset + p * 4;
            if (idx + 4 > heap.length) break;
            const r = heap[idx], g = heap[idx + 1], b = heap[idx + 2], a = heap[idx + 3];
            if (a > 100) {
              sampled++;
              if (r >= 180 && g >= 130 && b <= 80 && r >= g) {
                goldPixels++;
              }
            }
          }

          const goldRatio = sampled > 0 ? (goldPixels / sampled) : 0;

          if (goldRatio > 0.18 && width <= 512 && height <= 512) {
            remoteLog(`🪙 Standalone RGBA Coin Detected (${width}x${height})! Injecting ${currentLang.name}...`);
            const coinCanvas = renderCoinCanvas(currentLang, width, height);
            const ctx = coinCanvas.getContext('2d');
            const imgData = ctx.getImageData(0, 0, width, height).data;
            heap.set(imgData, offset);
            this.trackActiveTexture(gl, width, height, false, gl.RGBA);
            this.updateBadge(currentLang);
            return true;
          }
        }
      } catch (err) {
        remoteLog('inspectAndReplace error: ' + err);
      }
      return false;
    },

    trackActiveTexture(gl, width, height, isCompressed, format) {
      try {
        const boundTex = gl.getParameter(gl.TEXTURE_BINDING_2D);
        if (boundTex && !this.activeTextures.some(t => t.tex === boundTex)) {
          this.activeTextures.push({ tex: boundTex, width, height, isCompressed, format });
        }
      } catch (e) {}
    },

    updateBadge(lang) {
      try {
        const badge = document.getElementById('coin-status-badge');
        if (badge) {
          badge.innerHTML = `<span style="font-size:1.1rem">${lang.symbol}</span> <span>${lang.name.toUpperCase()} COIN ACTIVE</span>`;
          badge.style.borderColor = lang.bg || '#ffd700';
          badge.style.color = '#ffffff';
        }
      } catch (e) {}
    },

    // Cycle through languages live
    cycleLanguage() {
      const langs = getLangs();
      if (!this.currentGl || this.activeTextures.length === 0 || langs.length === 0) return;
      this.currentLangIdx = (this.currentLangIdx + 1) % langs.length;
      const nextLang = langs[this.currentLangIdx];

      this.activeTextures.forEach(({ tex, width, height, isCompressed }) => {
        try {
          this.currentGl.bindTexture(this.currentGl.TEXTURE_2D, tex);
          const canvas = renderCoinCanvas(nextLang, width, height);
          const ctx = canvas.getContext('2d');
          const imgData = ctx.getImageData(0, 0, width, height).data;

          if (!isCompressed) {
            this.currentGl.texSubImage2D(this.currentGl.TEXTURE_2D, 0, 0, 0, width, height, this.currentGl.RGBA, this.currentGl.UNSIGNED_BYTE, imgData);
          }
        } catch (e) {}
      });

      this.updateBadge(nextLang);
    }
  };

  window.CoinMod = CoinMod;

  // WebGL Prototype Interceptor
  function hookProto(proto) {
    if (!proto || proto.__coinModHooked) return;
    proto.__coinModHooked = true;

    // compressedTexImage2D
    const origCompressed = proto.compressedTexImage2D;
    proto.compressedTexImage2D = function (...args) {
      try {
        const target = args[0], level = args[1], internalFormat = args[2], width = args[3], height = args[4], border = args[5];
        let data = null, offset = 0, imageSize = 0;
        if (args.length >= 8 && typeof args[6] === 'object') {
          data = args[6];
          offset = args[7] || 0;
          imageSize = args[8] || (data ? data.byteLength : 0);
        } else if (args.length >= 7 && (args[6] instanceof ArrayBuffer || ArrayBuffer.isView(args[6]))) {
          data = args[6];
          imageSize = data.byteLength;
        }

        CoinMod.inspectAndReplace(this, target, level, internalFormat, width, height, data, offset, true, imageSize);
      } catch (e) {}
      return origCompressed.apply(this, args);
    };

    // texImage2D
    const origTexImage2D = proto.texImage2D;
    proto.texImage2D = function (...args) {
      try {
        if (args.length === 10) {
          const target = args[0], level = args[1], internalFormat = args[2], width = args[3], height = args[4], heap = args[8], offset = args[9];
          CoinMod.inspectAndReplace(this, target, level, internalFormat, width, height, heap, offset, false, width * height * 4);
        } else if (args.length === 9) {
          const target = args[0], level = args[1], internalFormat = args[2], width = args[3], height = args[4], pixels = args[8];
          if (pixels && pixels.buffer) {
            CoinMod.inspectAndReplace(this, target, level, internalFormat, width, height, new Uint8Array(pixels.buffer, pixels.byteOffset, pixels.byteLength), 0, false, pixels.byteLength);
          }
        }
      } catch (e) {}
      return origTexImage2D.apply(this, args);
    };
  }

  if (typeof WebGLRenderingContext !== 'undefined') hookProto(WebGLRenderingContext.prototype);
  if (typeof WebGL2RenderingContext !== 'undefined') hookProto(WebGL2RenderingContext.prototype);

  // Hook canvas getContext
  if (typeof HTMLCanvasElement !== 'undefined') {
    const origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, attrs) {
      const ctx = origGetContext.apply(this, arguments);
      if (ctx && (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl')) {
        CoinMod.currentGl = ctx;
        if (typeof WebGLRenderingContext !== 'undefined') hookProto(WebGLRenderingContext.prototype);
        if (typeof WebGL2RenderingContext !== 'undefined') hookProto(WebGL2RenderingContext.prototype);
      }
      return ctx;
    };
  }

  // Periodic language rotation every 3.5 seconds
  setInterval(() => {
    CoinMod.cycleLanguage();
  }, 3500);

  remoteLog('90 Tech Coins Mod Engine ready and armed!');
})();
