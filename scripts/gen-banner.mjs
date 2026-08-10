import fs from 'fs';
import path from 'path';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 562" width="100%" height="100%">
<defs>
<style>
.main-title{font-family:'Yatra One','Rozha One','Teko',Arial,sans-serif;fill:#FFF;font-size:110px;font-weight:900;text-anchor:middle;letter-spacing:2px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4))}
.sub-title{font-family:'Yatra One','Rozha One','Teko',Arial,sans-serif;fill:#FFF;font-size:130px;font-weight:900;text-anchor:middle;letter-spacing:4px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4))}
.sky-bg{fill:url(#skyGradient)}
.ground-bg{fill:url(#groundGradient)}
</style>
<linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#E8A87C"/>
<stop offset="50%" stop-color="#F3C998"/>
<stop offset="100%" stop-color="#E0A96D"/>
</linearGradient>
<linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#B8734A"/>
<stop offset="100%" stop-color="#8B4826"/>
</linearGradient>
<linearGradient id="truckBody" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stop-color="#AD2E18"/>
<stop offset="100%" stop-color="#D94325"/>
</linearGradient>
<linearGradient id="truckCab" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#3A6B88"/>
<stop offset="100%" stop-color="#1E3D52"/>
</linearGradient>
</defs>
<rect width="1200" height="380" class="sky-bg"/>
<circle cx="950" cy="180" r="110" fill="#FFE5B4" opacity="0.6"/>
<g opacity="0.35" fill="#5E3019">
<path d="M60,380Q70,250,40,160Q55,165,75,185M40,160Q10,140-20,150M40,160Q45,130,65,120M40,160Q10,170,5,200"/>
<path d="M60,380L75,380L65,165Z"/>
<path d="M1120,380Q1110,230,1150,130Q1130,140,1100,160M1150,130Q1180,120,1210,135M1150,130Q1160,100,1140,90"/>
<path d="M1120,380L1132,380L1150,135Z"/>
</g>
<rect y="360" width="1200" height="202" class="ground-bg"/>
<path d="M0,360Q600,350,1200,360L1200,380,0,380Z" fill="#9C5933"/>
<g fill="#4A2511" opacity="0.4">
<polygon points="10,360,10,290,140,270,140,360"/>
<polygon points="0,295,150,265,150,275,0,305"/>
<polygon points="1000,360,1000,240,1180,240,1180,360"/>
<polygon points="980,245,1200,235,1200,245,980,255"/>
</g>
<g id="truck" transform="translate(180,110)">
<ellipse cx="420" cy="275" rx="430" ry="18" fill="#401B0B" opacity="0.6"/>
<rect x="50" y="30" width="520" height="210" rx="4" fill="url(#truckBody)" stroke="#781D0D" stroke-width="4"/>
<line x1="50" y1="70" x2="570" y2="70" stroke="#781D0D" stroke-width="3"/>
<line x1="50" y1="110" x2="570" y2="110" stroke="#781D0D" stroke-width="3"/>
<line x1="50" y1="150" x2="570" y2="150" stroke="#781D0D" stroke-width="3"/>
<line x1="50" y1="190" x2="570" y2="190" stroke="#781D0D" stroke-width="3"/>
<rect x="130" y="30" width="12" height="210" fill="#781D0D"/>
<rect x="230" y="30" width="12" height="210" fill="#781D0D"/>
<rect x="330" y="30" width="12" height="210" fill="#781D0D"/>
<rect x="430" y="30" width="12" height="210" fill="#781D0D"/>
<path d="M570,70L680,70,730,120,730,240,570,240Z" fill="url(#truckCab)" stroke="#112533" stroke-width="4"/>
<path d="M620,85L675,85,710,120,620,120Z" fill="#A8DADC" stroke="#112533" stroke-width="3"/>
<path d="M570,70,570,35,680,35,680,70Z" fill="#E9C46A" stroke="#B8860B" stroke-width="2"/>
<polygon points="580,45,600,45,590,58" fill="#E76F51"/>
<polygon points="610,45,630,45,620,58" fill="#2A9D8F"/>
<polygon points="640,45,660,45,650,58" fill="#E76F51"/>
<g transform="translate(140,240)">
<circle cx="0" cy="0" r="38" fill="#1A1A1A"/>
<circle cx="0" cy="0" r="22" fill="#888" stroke="#333" stroke-width="3"/>
<circle cx="0" cy="0" r="8" fill="#1A1A1A"/>
</g>
<g transform="translate(260,240)">
<circle cx="0" cy="0" r="38" fill="#1A1A1A"/>
<circle cx="0" cy="0" r="22" fill="#888" stroke="#333" stroke-width="3"/>
<circle cx="0" cy="0" r="8" fill="#1A1A1A"/>
</g>
<g transform="translate(660,240)">
<circle cx="0" cy="0" r="38" fill="#1A1A1A"/>
<circle cx="0" cy="0" r="22" fill="#888" stroke="#333" stroke-width="3"/>
<circle cx="0" cy="0" r="8" fill="#1A1A1A"/>
</g>
</g>
<g transform="translate(100,420)" stroke="#3D2314" stroke-width="3" fill="none">
<line x1="10" y1="20" x2="5" y2="55" stroke-width="5"/>
<line x1="170" y1="20" x2="165" y2="55" stroke-width="5"/>
<line x1="40" y1="10" x2="35" y2="40" stroke-width="4"/>
<line x1="190" y1="10" x2="185" y2="40" stroke-width="4"/>
<polygon points="10,20,170,20,190,10,30,10" fill="#8C5230"/>
<line x1="30" y1="20" x2="45" y2="10" stroke="#D4A373"/>
<line x1="50" y1="20" x2="65" y2="10" stroke="#D4A373"/>
<line x1="70" y1="20" x2="85" y2="10" stroke="#D4A373"/>
<line x1="90" y1="20" x2="105" y2="10" stroke="#D4A373"/>
<line x1="110" y1="20" x2="125" y2="10" stroke="#D4A373"/>
<line x1="130" y1="20" x2="145" y2="10" stroke="#D4A373"/>
<line x1="150" y1="20" x2="165" y2="10" stroke="#D4A373"/>
</g>
<g fill="#2B1704" opacity="0.85">
<circle cx="980" cy="385" r="10"/>
<path d="M970,420C970,398,990,398,990,420Z"/>
<rect x="965" y="420" width="8" height="35"/>
<rect x="980" y="420" width="8" height="35"/>
<rect x="1030" y="400" width="110" height="60" fill="#42220F" rx="2"/>
<rect x="1050" y="380" width="18" height="20" fill="#888" rx="2"/>
<path d="M1068,390,1075,385" stroke="#888" stroke-width="3"/>
<rect x="1080" y="390" width="6" height="10" fill="#FFF" opacity="0.8"/>
<rect x="1090" y="390" width="6" height="10" fill="#FFF" opacity="0.8"/>
</g>
<g transform="translate(600,240)">
<text x="0" y="0" class="main-title">शानदार</text>
<text x="0" y="120" class="sub-title">लॉरी</text>
</g>
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'banner.svg'), svg);
console.log('Banner updated!');
