import fs from 'fs';
import path from 'path';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#0a0a1a"/>
<stop offset="50%" stop-color="#111128"/>
<stop offset="100%" stop-color="#0d1b2a"/>
</linearGradient>
<radialGradient id="glow1" cx="20%" cy="40%" r="35%">
<stop offset="0%" stop-color="#00a1e0" stop-opacity="0.15"/>
<stop offset="100%" stop-color="#00a1e0" stop-opacity="0"/>
</radialGradient>
<radialGradient id="glow2" cx="80%" cy="50%" r="30%">
<stop offset="0%" stop-color="#7c3aed" stop-opacity="0.12"/>
<stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
</radialGradient>
<radialGradient id="glow3" cx="50%" cy="70%" r="40%">
<stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.08"/>
<stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
</radialGradient>
<linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stop-color="#00a1e0" stop-opacity="0"/>
<stop offset="30%" stop-color="#00a1e0" stop-opacity="0.5"/>
<stop offset="70%" stop-color="#7c3aed" stop-opacity="0.5"/>
<stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
</linearGradient>
<linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stop-color="#0ea5e9" stop-opacity="0"/>
<stop offset="40%" stop-color="#0ea5e9" stop-opacity="0.3"/>
<stop offset="60%" stop-color="#a855f7" stop-opacity="0.3"/>
<stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
</linearGradient>
<linearGradient id="vinyl" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#1a1a2e"/>
<stop offset="50%" stop-color="#16213e"/>
<stop offset="100%" stop-color="#0f0f23"/>
</linearGradient>
<filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
<feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
</filter>
<filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
<feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
</filter>
</defs>

<!-- Deep space background -->
<rect width="1400" height="600" fill="url(#bg)"/>

<!-- Ambient glows -->
<rect width="1400" height="600" fill="url(#glow1)"/>
<rect width="1400" height="600" fill="url(#glow2)"/>
<rect width="1400" height="600" fill="url(#glow3)"/>

<!-- Subtle noise texture (dots) -->
<g opacity="0.03" fill="white">
<circle cx="50" cy="80" r="1"/><circle cx="150" cy="40" r="0.8"/><circle cx="250" cy="120" r="1.2"/>
<circle cx="350" cy="60" r="0.7"/><circle cx="450" cy="140" r="1"/><circle cx="550" cy="30" r="0.9"/>
<circle cx="650" cy="100" r="1.1"/><circle cx="750" cy="50" r="0.8"/><circle cx="850" cy="130" r="1"/>
<circle cx="950" cy="70" r="0.7"/><circle cx="1050" cy="110" r="1.2"/><circle cx="1150" cy="45" r="0.9"/>
<circle cx="1250" cy="90" r="1"/><circle cx="1350" cy="65" r="0.8"/>
<circle cx="100" cy="200" r="0.9"/><circle cx="300" cy="250" r="1.1"/><circle cx="500" cy="180" r="0.7"/>
<circle cx="700" cy="220" r="1"/><circle cx="900" cy="190" r="0.8"/><circle cx="1100" cy="240" r="1.2"/>
<circle cx="1300" cy="210" r="0.9"/><circle cx="200" cy="320" r="1"/><circle cx="400" cy="350" r="0.7"/>
<circle cx="600" cy="300" r="1.1"/><circle cx="800" cy="340" r="0.9"/><circle cx="1000" cy="310" r="1"/>
<circle cx="1200" cy="360" r="0.8"/><circle cx="150" cy="420" r="1.2"/><circle cx="350" cy="450" r="0.7"/>
<circle cx="550" cy="400" r="1"/><circle cx="750" cy="440" r="0.9"/><circle cx="950" cy="410" r="1.1"/>
<circle cx="1150" cy="460" r="0.8"/><circle cx="1350" cy="430" r="1"/>
</g>

<!-- Sound wave ribbons - flowing curves -->
<path d="M0,350 Q200,280 400,320 T800,300 T1200,340 T1400,310" fill="none" stroke="url(#wave1)" stroke-width="1.5" opacity="0.4"/>
<path d="M0,370 Q250,310 500,350 T1000,320 T1400,360" fill="none" stroke="url(#wave2)" stroke-width="1" opacity="0.3"/>
<path d="M0,330 Q300,260 600,300 T1100,280 T1400,320" fill="none" stroke="url(#wave1)" stroke-width="0.8" opacity="0.25"/>

<!-- Floating music notes - scattered artistically -->
<g opacity="0.15" fill="none" stroke="#00a1e0" stroke-width="1.5">
<!-- Note 1 -->
<g transform="translate(120,160) scale(0.8)">
<ellipse cx="0" cy="12" rx="7" ry="5" transform="rotate(-20)" fill="#00a1e0"/>
<line x1="6" y1="10" x2="6" y2="-18" stroke-width="1.5"/>
<path d="M6,-18 Q16,-22 14,-10" fill="#00a1e0"/>
</g>
<!-- Note 2 -->
<g transform="translate(320,200) scale(0.6)">
<ellipse cx="0" cy="12" rx="7" ry="5" transform="rotate(-20)" fill="#7c3aed"/>
<line x1="6" y1="10" x2="6" y2="-18" stroke="#7c3aed" stroke-width="1.5"/>
<path d="M6,-18 Q16,-22 14,-10" fill="#7c3aed"/>
</g>
<!-- Note 3 - double -->
<g transform="translate(1100,180) scale(0.7)">
<ellipse cx="0" cy="12" rx="6" ry="4" transform="rotate(-15)" fill="#0ea5e9"/>
<ellipse cx="20" cy="10" rx="6" ry="4" transform="rotate(-15)" fill="#0ea5e9"/>
<line x1="5" y1="10" x2="5" y2="-16" stroke="#0ea5e9" stroke-width="1.5"/>
<line x1="25" y1="8" x2="25" y2="-18" stroke="#0ea5e9" stroke-width="1.5"/>
<line x1="5" y1="-16" x2="25" y2="-18" stroke="#0ea5e9" stroke-width="2"/>
</g>
</g>

<!-- Equalizer bars - left cluster -->
<g opacity="0.12" filter="url(#blur1)">
<rect x="60" y="380" width="4" height="40" rx="2" fill="#00a1e0"/>
<rect x="70" y="360" width="4" height="60" rx="2" fill="#00a1e0"/>
<rect x="80" y="340" width="4" height="80" rx="2" fill="#0ea5e9"/>
<rect x="90" y="355" width="4" height="65" rx="2" fill="#0ea5e9"/>
<rect x="100" y="370" width="4" height="50" rx="2" fill="#7c3aed"/>
</g>

<!-- Equalizer bars - right cluster -->
<g opacity="0.12" filter="url(#blur1)">
<rect x="1280" y="375" width="4" height="45" rx="2" fill="#7c3aed"/>
<rect x="1290" y="355" width="4" height="65" rx="2" fill="#a855f7"/>
<rect x="1300" y="345" width="4" height="75" rx="2" fill="#a855f7"/>
<rect x="1310" y="365" width="4" height="55" rx="2" fill="#7c3aed"/>
<rect x="1320" y="380" width="4" height="40" rx="2" fill="#0ea5e9"/>
</g>

<!-- Vinyl record - subtle, large, background element -->
<g transform="translate(1150, 300)" opacity="0.06">
<circle cx="0" cy="0" r="120" fill="none" stroke="white" stroke-width="0.5"/>
<circle cx="0" cy="0" r="100" fill="none" stroke="white" stroke-width="0.3"/>
<circle cx="0" cy="0" r="80" fill="none" stroke="white" stroke-width="0.5"/>
<circle cx="0" cy="0" r="60" fill="none" stroke="white" stroke-width="0.3"/>
<circle cx="0" cy="0" r="40" fill="none" stroke="white" stroke-width="0.5"/>
<circle cx="0" cy="0" r="15" fill="white" opacity="0.3"/>
<circle cx="0" cy="0" r="5" fill="white" opacity="0.5"/>
</g>

<!-- Headphone silhouette - center top -->
<g transform="translate(700, 80)" opacity="0.08" fill="none" stroke="white" stroke-width="2">
<path d="M-50,0 Q-55,-40 0,-50 Q55,-40 50,0"/>
<rect x="-58" y="-5" width="16" height="28" rx="8"/>
<rect x="42" y="-5" width="16" height="28" rx="8"/>
</g>

<!-- Gradient line at bottom -->
<rect x="0" y="520" width="1400" height="1" fill="url(#wave1)" opacity="0.3"/>

<!-- Subtle vignette -->
<rect width="1400" height="600" fill="url(#bg)" opacity="0.4"/>
<radialGradient id="vignette" cx="50%" cy="50%" r="60%">
<stop offset="0%" stop-color="transparent"/>
<stop offset="100%" stop-color="#0a0a1a" stop-opacity="0.5"/>
</radialGradient>
<rect width="1400" height="600" fill="url(#vignette)"/>
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'banner.svg'), svg);
console.log('Banner updated!');
