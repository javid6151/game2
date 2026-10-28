/**
 * 90 PROGRAMMING LANGUAGES & DEV TECH DATASET
 * Used to generate realistic 3D collectible coins in Subway Runner 3D
 */

const PROGRAMMING_LANGUAGES = [
  // 1-15: Top Tier & Major Languages
  { id: 'python', name: 'Python', symbol: '🐍', text: 'Py', bg: '#3776AB', sec: '#FFD43B', tier: 'legendary' },
  { id: 'javascript', name: 'JavaScript', symbol: 'JS', text: 'JS', bg: '#F7DF1E', sec: '#000000', tier: 'legendary' },
  { id: 'typescript', name: 'TypeScript', symbol: 'TS', text: 'TS', bg: '#3178C6', sec: '#FFFFFF', tier: 'legendary' },
  { id: 'rust', name: 'Rust', symbol: '🦀', text: 'RUST', bg: '#CE412B', sec: '#000000', tier: 'legendary' },
  { id: 'cpp', name: 'C++', symbol: 'C++', text: 'C++', bg: '#00599C', sec: '#FFFFFF', tier: 'legendary' },
  { id: 'csharp', name: 'C#', symbol: 'C#', text: 'C#', bg: '#68217A', sec: '#FFFFFF', tier: 'legendary' },
  { id: 'c', name: 'C', symbol: 'C', text: 'C', bg: '#A8B9CC', sec: '#1B365D', tier: 'rare' },
  { id: 'java', name: 'Java', symbol: '☕', text: 'JAVA', bg: '#ED8B00', sec: '#5382A1', tier: 'legendary' },
  { id: 'golang', name: 'Go', symbol: '🐹', text: 'GO', bg: '#00ADD8', sec: '#FFFFFF', tier: 'legendary' },
  { id: 'php', name: 'PHP', symbol: '🐘', text: 'PHP', bg: '#777BB4', sec: '#FFFFFF', tier: 'rare' },
  { id: 'ruby', name: 'Ruby', symbol: '💎', text: 'RUBY', bg: '#CC342D', sec: '#FFFFFF', tier: 'rare' },
  { id: 'swift', name: 'Swift', symbol: '🦅', text: 'SWIFT', bg: '#F05138', sec: '#FFFFFF', tier: 'rare' },
  { id: 'kotlin', name: 'Kotlin', symbol: '🅺', text: 'KT', bg: '#7F52FF', sec: '#C711E1', tier: 'rare' },
  { id: 'dart', name: 'Dart', symbol: '🎯', text: 'DART', bg: '#0175C2', sec: '#00B4AB', tier: 'rare' },
  { id: 'html5', name: 'HTML5', symbol: '🌐', text: 'HTML', bg: '#E34F26', sec: '#FFFFFF', tier: 'rare' },

  // 16-30: Core Web, Systems & Functional
  { id: 'css3', name: 'CSS3', symbol: '🎨', text: 'CSS', bg: '#1572B6', sec: '#FFFFFF', tier: 'rare' },
  { id: 'sql', name: 'SQL', symbol: '🐬', text: 'SQL', bg: '#4479A1', sec: '#FFFFFF', tier: 'rare' },
  { id: 'r', name: 'R', symbol: '📊', text: 'R', bg: '#276DC3', sec: '#FFFFFF', tier: 'rare' },
  { id: 'lua', name: 'Lua', symbol: '🌙', text: 'LUA', bg: '#000080', sec: '#0000ED', tier: 'rare' },
  { id: 'perl', name: 'Perl', symbol: '🐪', text: 'PERL', bg: '#39457E', sec: '#FFFFFF', tier: 'rare' },
  { id: 'scala', name: 'Scala', symbol: '⚡', text: 'SCALA', bg: '#DC322F', sec: '#FFFFFF', tier: 'rare' },
  { id: 'haskell', name: 'Haskell', symbol: 'λ', text: 'λ', bg: '#5D4F85', sec: '#FFFFFF', tier: 'rare' },
  { id: 'elixir', name: 'Elixir', symbol: '💧', text: 'EX', bg: '#4B275F', sec: '#A45BBE', tier: 'rare' },
  { id: 'clojure', name: 'Clojure', symbol: '☯', text: 'CLJ', bg: '#5881D8', sec: '#91DC47', tier: 'rare' },
  { id: 'erlang', name: 'Erlang', symbol: '🔴', text: 'ERL', bg: '#A90533', sec: '#FFFFFF', tier: 'rare' },
  { id: 'elm', name: 'Elm', symbol: '🧩', text: 'ELM', bg: '#60B5CC', sec: '#FFFFFF', tier: 'rare' },
  { id: 'coffeescript', name: 'CoffeeScript', symbol: '☕', text: 'COFFEE', bg: '#2F2625', sec: '#FFFFFF', tier: 'common' },
  { id: 'objectivec', name: 'Objective-C', symbol: '🍏', text: 'Obj-C', bg: '#0B5A99', sec: '#FFFFFF', tier: 'common' },
  { id: 'julia', name: 'Julia', symbol: '🟣', text: 'JULIA', bg: '#9558B2', sec: '#389826', tier: 'rare' },
  { id: 'zig', name: 'Zig', symbol: '⚡', text: 'ZIG', bg: '#F7A41D', sec: '#000000', tier: 'rare' },

  // 31-45: Shell, Systems, Classical & Academic
  { id: 'bash', name: 'Bash', symbol: '$>', text: 'BASH', bg: '#4EAA25', sec: '#FFFFFF', tier: 'common' },
  { id: 'assembly', name: 'Assembly', symbol: '⚙️', text: 'ASM', bg: '#6E4C13', sec: '#E6A15C', tier: 'legendary' },
  { id: 'fortran', name: 'Fortran', symbol: '📐', text: 'FORT', bg: '#734F96', sec: '#FFFFFF', tier: 'common' },
  { id: 'cobol', name: 'COBOL', symbol: '🏛️', text: 'COBOL', bg: '#005A9C', sec: '#FFFFFF', tier: 'common' },
  { id: 'lisp', name: 'Lisp', symbol: '( )', text: 'LISP', bg: '#5F5F5F', sec: '#FFFFFF', tier: 'common' },
  { id: 'prolog', name: 'Prolog', symbol: '🦉', text: 'PROLOG', bg: '#EE3322', sec: '#FFFFFF', tier: 'common' },
  { id: 'fsharp', name: 'F#', symbol: 'F#', text: 'F#', bg: '#30B9DB', sec: '#FFFFFF', tier: 'rare' },
  { id: 'ocaml', name: 'OCaml', symbol: '🐫', text: 'OCAML', bg: '#EE6A1A', sec: '#FFFFFF', tier: 'rare' },
  { id: 'nim', name: 'Nim', symbol: '👑', text: 'NIM', bg: '#FFE953', sec: '#333333', tier: 'common' },
  { id: 'crystal', name: 'Crystal', symbol: '🔮', text: 'CRYST', bg: '#111111', sec: '#FFFFFF', tier: 'common' },
  { id: 'solidity', name: 'Solidity', symbol: '⛓️', text: 'SOLID', bg: '#363636', sec: '#00F0FF', tier: 'rare' },
  { id: 'vlang', name: 'V', symbol: '🅅', text: 'V', bg: '#5D87BF', sec: '#FFFFFF', tier: 'common' },
  { id: 'dlang', name: 'D', symbol: '🄳', text: 'D', bg: '#B03931', sec: '#FFFFFF', tier: 'common' },
  { id: 'pascal', name: 'Pascal', symbol: '📜', text: 'PASC', bg: '#E63946', sec: '#FFFFFF', tier: 'common' },
  { id: 'ada', name: 'Ada', symbol: '🅰️', text: 'ADA', bg: '#02569B', sec: '#FFFFFF', tier: 'common' },

  // 46-60: Enterprise, Scripting & Science
  { id: 'apex', name: 'Apex', symbol: '☁️', text: 'APEX', bg: '#00A1E0', sec: '#FFFFFF', tier: 'common' },
  { id: 'groovy', name: 'Groovy', symbol: '⭐', text: 'GROOVY', bg: '#4298B8', sec: '#FFFFFF', tier: 'common' },
  { id: 'vbnet', name: 'Visual Basic', symbol: '🔤', text: 'VB', bg: '#5C2D91', sec: '#FFFFFF', tier: 'common' },
  { id: 'smalltalk', name: 'Smalltalk', symbol: '🎈', text: 'ST', bg: '#1D70B8', sec: '#FFFFFF', tier: 'common' },
  { id: 'scheme', name: 'Scheme', symbol: 'λ', text: 'SCHM', bg: '#1E3799', sec: '#FFFFFF', tier: 'common' },
  { id: 'racket', name: 'Racket', symbol: '🎾', text: 'RCKT', bg: '#962237', sec: '#FFFFFF', tier: 'common' },
  { id: 'wasm', name: 'WebAssembly', symbol: '🕸️', text: 'WASM', bg: '#654FF0', sec: '#FFFFFF', tier: 'rare' },
  { id: 'hack', name: 'Hack', symbol: '⚡', text: 'HACK', bg: '#808080', sec: '#00f0ff', tier: 'common' },
  { id: 'tcl', name: 'Tcl', symbol: '🪶', text: 'TCL', bg: '#125D7E', sec: '#FFFFFF', tier: 'common' },
  { id: 'awk', name: 'AWK', symbol: '📄', text: 'AWK', bg: '#222222', sec: '#00ff66', tier: 'common' },
  { id: 'powershell', name: 'PowerShell', symbol: '>_', text: 'PWSH', bg: '#012456', sec: '#5391FE', tier: 'common' },
  { id: 'matlab', name: 'MATLAB', symbol: '📈', text: 'MATLAB', bg: '#E16737', sec: '#FFFFFF', tier: 'rare' },
  { id: 'labview', name: 'LabVIEW', symbol: '🔬', text: 'LV', bg: '#FFD100', sec: '#000000', tier: 'common' },
  { id: 'scratch', name: 'Scratch', symbol: '🐱', text: 'SCRTCH', bg: '#4D97FF', sec: '#FFAB19', tier: 'common' },
  { id: 'graphql', name: 'GraphQL', symbol: '◈', text: 'GQL', bg: '#E10098', sec: '#FFFFFF', tier: 'rare' },

  // 61-75: Frameworks, Platforms & Engines
  { id: 'react', name: 'React', symbol: '⚛️', text: 'REACT', bg: '#20232A', sec: '#61DAFB', tier: 'legendary' },
  { id: 'vue', name: 'Vue', symbol: '🖖', text: 'VUE', bg: '#42B883', sec: '#35495E', tier: 'rare' },
  { id: 'angular', name: 'Angular', symbol: '🅰️', text: 'NG', bg: '#DD0031', sec: '#C3002F', tier: 'rare' },
  { id: 'svelte', name: 'Svelte', symbol: '🔥', text: 'SVELTE', bg: '#FF3E00', sec: '#FFFFFF', tier: 'rare' },
  { id: 'nextjs', name: 'Next.js', symbol: '▲', text: 'NEXT', bg: '#000000', sec: '#FFFFFF', tier: 'rare' },
  { id: 'nodejs', name: 'Node.js', symbol: '🌿', text: 'NODE', bg: '#339933', sec: '#FFFFFF', tier: 'legendary' },
  { id: 'android', name: 'Android', symbol: '🤖', text: 'DROID', bg: '#3DDC84', sec: '#073042', tier: 'rare' },
  { id: 'dotnet', name: '.NET', symbol: '🔷', text: '.NET', bg: '#512BD4', sec: '#FFFFFF', tier: 'rare' },
  { id: 'docker', name: 'Docker', symbol: '🐳', text: 'DOCKER', bg: '#2496ED', sec: '#FFFFFF', tier: 'rare' },
  { id: 'kubernetes', name: 'Kubernetes', symbol: '☸️', text: 'K8S', bg: '#326CE5', sec: '#FFFFFF', tier: 'rare' },
  { id: 'git', name: 'Git', symbol: '🌿', text: 'GIT', bg: '#F05032', sec: '#FFFFFF', tier: 'rare' },
  { id: 'linux', name: 'Linux', symbol: '🐧', text: 'LINUX', bg: '#FCC624', sec: '#000000', tier: 'rare' },
  { id: 'django', name: 'Django', symbol: '🎸', text: 'DJ', bg: '#092E20', sec: '#44B78B', tier: 'common' },
  { id: 'flask', name: 'Flask', symbol: '🧪', text: 'FLASK', bg: '#000000', sec: '#00f0ff', tier: 'common' },
  { id: 'spring', name: 'Spring', symbol: '🍃', text: 'SPRING', bg: '#6DB33F', sec: '#FFFFFF', tier: 'common' },

  // 76-90: Modern Runtimes, DBs & Tools
  { id: 'redis', name: 'Redis', symbol: '🟥', text: 'REDIS', bg: '#DC382D', sec: '#FFFFFF', tier: 'common' },
  { id: 'postgres', name: 'Postgres', symbol: '🐘', text: 'PG', bg: '#336791', sec: '#FFFFFF', tier: 'rare' },
  { id: 'mongodb', name: 'MongoDB', symbol: '🍃', text: 'MONGO', bg: '#47A248', sec: '#FFFFFF', tier: 'rare' },
  { id: 'sqlite', name: 'SQLite', symbol: '🪶', text: 'SQLITE', bg: '#003B57', sec: '#00B4D8', tier: 'common' },
  { id: 'tailwind', name: 'Tailwind', symbol: '🌊', text: 'TW', bg: '#06B6D4', sec: '#FFFFFF', tier: 'rare' },
  { id: 'electron', name: 'Electron', symbol: '⚛', text: 'ELECTR', bg: '#47848F', sec: '#2B2E3A', tier: 'common' },
  { id: 'tauri', name: 'Tauri', symbol: '♉', text: 'TAURI', bg: '#FFC131', sec: '#24C8DB', tier: 'common' },
  { id: 'redux', name: 'Redux', symbol: '🟣', text: 'REDUX', bg: '#764ABC', sec: '#FFFFFF', tier: 'common' },
  { id: 'apache', name: 'Apache', symbol: '🪶', text: 'APACHE', bg: '#D22128', sec: '#FFFFFF', tier: 'common' },
  { id: 'vite', name: 'Vite', symbol: '⚡', text: 'VITE', bg: '#646CFF', sec: '#BD34FE', tier: 'rare' },
  { id: 'bun', name: 'Bun', symbol: '🥟', text: 'BUN', bg: '#FBF0DF', sec: '#F472B6', tier: 'rare' },
  { id: 'deno', name: 'Deno', symbol: '🦕', text: 'DENO', bg: '#000000', sec: '#70FFEB', tier: 'rare' },
  { id: 'json', name: 'JSON', symbol: '{ }', text: 'JSON', bg: '#292929', sec: '#FFAA00', tier: 'common' },
  { id: 'markdown', name: 'Markdown', symbol: 'Ⓜ️', text: 'MD', bg: '#083FA1', sec: '#FFFFFF', tier: 'common' },
  { id: 'cuda', name: 'CUDA', symbol: '🟢', text: 'CUDA', bg: '#76B900', sec: '#000000', tier: 'legendary' }
];

/**
 * Generates a high-resolution, realistic 3D metallic coin texture
 * featuring the programming language's branding, embossed logo, and coin reeding.
 */
function createCoinCanvas(lang) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const cx = 128;
  const cy = 128;
  const r = 120;

  // 1. Outer Metallic Gold Beveled Rim
  const rimGrad = ctx.createRadialGradient(cx - 20, cy - 20, 40, cx, cy, r);
  if (lang.tier === 'legendary') {
    rimGrad.addColorStop(0, '#fff4b8');
    rimGrad.addColorStop(0.6, '#ffd700');
    rimGrad.addColorStop(0.85, '#cca000');
    rimGrad.addColorStop(1, '#664d00');
  } else if (lang.tier === 'rare') {
    rimGrad.addColorStop(0, '#f0f5ff');
    rimGrad.addColorStop(0.6, '#00d4ff');
    rimGrad.addColorStop(0.85, '#0077b6');
    rimGrad.addColorStop(1, '#023e8a');
  } else {
    rimGrad.addColorStop(0, '#ffe5d9');
    rimGrad.addColorStop(0.6, '#d4a373');
    rimGrad.addColorStop(0.85, '#a98467');
    rimGrad.addColorStop(1, '#6c584c');
  }

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = rimGrad;
  ctx.fill();

  // 2. Milled Coin Edges (Micro notches / reeding around perimeter)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 2;
  const numNotches = 48;
  for (let i = 0; i < numNotches; i++) {
    const angle = (i / numNotches) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * (r - 1);
    const y1 = cy + Math.sin(angle) * (r - 1);
    const x2 = cx + Math.cos(angle) * (r - 9);
    const y2 = cy + Math.sin(angle) * (r - 9);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // 3. Inner Bevel Ring
  ctx.beginPath();
  ctx.arc(cx, cy, r - 10, 0, Math.PI * 2);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.stroke();

  // 4. Center Brand Face Circle
  const centerGrad = ctx.createLinearGradient(cx - 50, cy - 50, cx + 50, cy + 50);
  centerGrad.addColorStop(0, lang.bg);
  centerGrad.addColorStop(1, adjustColor(lang.bg, -30));

  ctx.beginPath();
  ctx.arc(cx, cy, r - 15, 0, Math.PI * 2);
  ctx.fillStyle = centerGrad;
  ctx.fill();

  // Concentric engraved ring
  ctx.beginPath();
  ctx.arc(cx, cy, r - 22, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.stroke();

  // 5. Official Language Logo / Symbol
  ctx.fillStyle = lang.sec;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw Emoji/Symbol icon on top
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(lang.symbol, cx, cy - 14);

  // Draw Text / Name underneath
  ctx.font = '900 24px "Russo One", sans-serif';
  ctx.fillText(lang.text, cx, cy + 32);

  // 6. Name banner along top curve
  ctx.font = '800 12px "Outfit", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.letterSpacing = '1px';
  ctx.fillText(lang.name.toUpperCase(), cx, cy - 65);

  // 7. Shiny Specular Glass Sheen across top quadrant
  const sheen = ctx.createLinearGradient(cx, cy - r, cx, cy);
  sheen.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
  sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
  sheen.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  ctx.beginPath();
  ctx.arc(cx, cy, r - 16, Math.PI * 1.1, Math.PI * 1.9);
  ctx.closePath();
  ctx.fillStyle = sheen;
  ctx.fill();

  return canvas;
}

// Utility to darken/lighten hex color
function adjustColor(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  let rgb = '#';
  for (let i = 0; i < 3; i++) {
    let c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
}
