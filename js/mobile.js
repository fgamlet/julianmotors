(function() {
if (window.innerWidth > 768) return;
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/css/mobile.css';
document.head.appendChild(link);
var LANGS = [
{ code: 'RU', path: '/ru/' },
{ code: 'UK', path: '/uk/' },
{ code: 'PL', path: '/pl/' }
];
function getCurrentLang() {
var path = window.location.pathname;
if (path.indexOf('/ru/') === 0 || path === '/ru') return 'RU';
if (path.indexOf('/uk/') === 0 || path === '/uk') return 'UK';
if (path.indexOf('/pl/') === 0 || path === '/pl') return 'PL';
if (path.indexOf('/12345/') === 0) return 'RU';
return 'UK';
}
function initMobileNav() {
if (document.getElementById('julian-drawer')) return;
var drawer = document.createElement('div');
drawer.id = 'julian-drawer';
var closeBtn = document.createElement('button');
closeBtn.id = 'julian-drawer-close';
closeBtn.setAttribute('aria-label', 'Close menu');
closeBtn.innerHTML = '&times;';
var navList = document.createElement('nav');
navList.id = 'julian-drawer-nav';
var navSource = document.getElementById('comp-ifgtula7itemsContainer');
if (navSource) {
navSource.querySelectorAll('li').forEach(function(li) {
var link = li.querySelector('a');
var label = li.querySelector('p');
if (!link || !label) return;
var a = document.createElement('a');
a.href = link.href;
a.textContent = label.textContent.trim();
a.addEventListener('click', closeDrawer);
navList.appendChild(a);
});
} else {
var g9Nav = document.getElementById('g9-nav');
if (g9Nav) {
g9Nav.querySelectorAll('a').forEach(function(navLink) {
var a = document.createElement('a');
a.href = navLink.href;
a.textContent = navLink.textContent.trim();
a.addEventListener('click', closeDrawer);
navList.appendChild(a);
});
}
}
drawer.appendChild(closeBtn);
drawer.appendChild(navList);
var overlay = document.createElement('div');
overlay.id = 'julian-overlay';
overlay.addEventListener('click', closeDrawer);
document.body.appendChild(overlay);
document.body.appendChild(drawer);
closeBtn.addEventListener('click', closeDrawer);
var hamburger = document.createElement('button');
hamburger.id = 'julian-hamburger-btn';
hamburger.setAttribute('aria-label', 'Open menu');
hamburger.innerHTML = '<span></span><span></span><span></span>';
hamburger.addEventListener('click', openDrawer);
document.body.appendChild(hamburger);
var currentLang = getCurrentLang();
var widget = document.createElement('div');
widget.id = 'julian-lang-widget';
widget.innerHTML = currentLang + ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.283 4.898"><path d="M4.641 4.898a.5.5 0 0 1-.343-.136L.158.864A.5.5 0 0 1 .842.136L4.64 3.712 8.44.136a.5.5 0 0 1 .686.729L4.984 4.762a.5.5 0 0 1-.343.136Z"></path></svg>';
var dropdown = document.createElement('div');
dropdown.id = 'julian-lang-dropdown';
LANGS.forEach(function(lang) {
if (lang.code === currentLang) return;
var a = document.createElement('a');
var curPath = window.location.pathname;
var subPage = '';
var match = curPath.match(/\/(general-9|12345)(\/|$)/);
if (match) subPage = match[1] + '/';
a.href = lang.path + subPage;
a.textContent = lang.code;
dropdown.appendChild(a);
});
widget.addEventListener('click', function(e) {
e.stopPropagation();
dropdown.classList.toggle('lang-open');
});
document.addEventListener('click', function() {
dropdown.classList.remove('lang-open');
});
document.body.appendChild(widget);
document.body.appendChild(dropdown);
}
function openDrawer() {
var drawer = document.getElementById('julian-drawer');
var overlay = document.getElementById('julian-overlay');
if (drawer) drawer.classList.add('open');
if (overlay) overlay.classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeDrawer() {
var drawer = document.getElementById('julian-drawer');
var overlay = document.getElementById('julian-overlay');
if (drawer) drawer.classList.remove('open');
if (overlay) overlay.classList.remove('open');
document.body.style.overflow = '';
}
function fixServiceCards() {
var s = function(el, prop, val) {
if (el) el.style.setProperty(prop, val, 'important');
};
var sf = function(el, props) {
if (!el) return;
for (var p in props) s(el, p, props[p]);
};
['#comp-ki62maow .TmK0x', '#comp-ki62maow .Exmq9'].forEach(function(sel) {
var el = document.querySelector(sel);
if (el) { s(el, 'display', 'flex'); s(el, 'flex-direction', 'column'); s(el, 'width', '100%'); }
});
var priceFs = 'clamp(16px, 5vw, 22px)';
var descFs = 'clamp(11px, 3.2vw, 14px)';
document.querySelectorAll('[id^="comp-ki62mart__item"]').forEach(function(item) {
if (item.id.indexOf('inlineContent') !== -1) return;
sf(item, { width:'100%', 'min-width':'0', 'max-width':'100vw', position:'relative', left:'0', margin:'0 0 2px 0' });
var p1 = item.parentElement;
if (p1) {
sf(p1, { margin:'0', width:'100%', 'max-width':'100vw' });
var p2 = p1.parentElement;
if (p2) { sf(p2, { margin:'0', width:'100%', 'max-width':'100vw' }); }
var p3 = p2 && p2.parentElement;
if (p3) { sf(p3, { margin:'0', width:'100%', 'max-width':'100vw' }); }
}
var grid = item.querySelector('[data-mesh-id$="inlineContent-gridContainer"]');
sf(grid, {
display:'grid',
'grid-template-columns':'auto 1fr clamp(70px, 23vw, 110px)',
'grid-template-rows':'auto auto auto auto auto auto',
padding:'8px 3vw',
'column-gap':'clamp(4px, 1.5vw, 10px)',
'row-gap':'3px',
'align-items':'center',
width:'100%',
overflow:'visible',
'box-sizing':'border-box',
position:'relative'
});
var titleEl = item.querySelector('[id*="ki62mau6"]');
sf(titleEl, { 'grid-column':'1 / 3', 'grid-row':'1', position:'relative', left:'0', top:'0', margin:'0 0 10px 0', padding:'0', width:'100%', 'box-sizing':'border-box' });
if (titleEl) {
titleEl.querySelectorAll('p,h1,h2,h3,h4,h5,h6').forEach(function(t){
s(t,'margin','0'); s(t,'padding','0'); s(t,'line-height','1.15');
});
titleEl.querySelectorAll('span').forEach(function(t){
s(t,'font-size','clamp(16px,4.5vw,20px)');
s(t,'line-height','1.2');
});
}
var iconEl = item.querySelector('[id*="ki63mfpy"]');
var iconSize = 'clamp(70px, 23vw, 110px)';
sf(iconEl, { 'grid-column':'3', 'grid-row':'1', position:'relative', left:'0', top:'0', margin:'0 0 30px 0', width:iconSize, height:iconSize, 'min-width':'0', 'z-index':'1', 'justify-self':'end', 'align-self':'start' });
if (iconEl) {
iconEl.querySelectorAll('div,[data-mesh-id]').forEach(function(w){
s(w,'position','relative'); s(w,'left','0'); s(w,'top','0'); s(w,'margin','0'); s(w,'padding','0');
});
var img = iconEl.querySelector('img');
sf(img, { width:'100%', height:'100%', 'object-fit':'cover', 'border-radius':'12px', display:'block' });
}
function setPrice(el, row) {
if (!el) return;
el.style.setProperty('--min-height', '0', 'important');
sf(el, { 'grid-column':'1', 'grid-row':row, position:'relative', left:'0', margin:'0', padding:'0 0 0 20px', width:'100%', 'min-height':'0', 'align-self':'center', 'text-align':'left', 'box-sizing':'border-box' });
el.querySelectorAll('span,p,h1,h2,h3,h4').forEach(function(t){
s(t,'font-size',priceFs); s(t,'font-weight','700'); s(t,'line-height','1.2');
s(t,'text-align','left'); s(t,'margin','0'); s(t,'padding','0');
});
}
function setDesc(el, row) {
if (!el) return;
el.style.setProperty('--min-height', '0', 'important');
sf(el, { 'grid-column':'2 / 4', 'grid-row':row, position:'relative', left:'0', margin:'0', padding:'0 0 0 45%', width:'100%', 'min-height':'0', 'align-self':'center', 'text-align':'center', 'box-sizing':'border-box' });
el.querySelectorAll('span,p,h1,h2,h3,h4').forEach(function(t){
s(t,'font-size',descFs); s(t,'font-weight','700'); s(t,'line-height','1.2'); s(t,'text-align','center');
s(t,'margin','0'); s(t,'padding','0');
});
}
setPrice(item.querySelector('[id*="ki62maus"]'), '2');
setDesc( item.querySelector('[id*="l5pxlp1b"]'), '2');
setPrice(item.querySelector('[id*="l5pxggj0"]'), '3');
setDesc( item.querySelector('[id*="l5pxlp3c"]'), '3');
setPrice(item.querySelector('[id*="l5pxgyhq"]'), '4');
setDesc( item.querySelector('[id*="l5pxlp5a"]'), '4');
setPrice(item.querySelector('[id*="m09gpb9x"]'), '5');
setDesc( item.querySelector('[id*="m09gr3uz"]'), '5');
var bull = item.querySelector('[id*="ki62mav0"]');
if (bull) {
bull.style.setProperty('--min-height', '0', 'important');
sf(bull, { 'grid-column':'1 / 4', 'grid-row':'6', position:'relative', left:'0', margin:'6px 0 30px 0', width:'100%', 'min-height':'0', height:'auto' });
bull.querySelectorAll('span,p,li').forEach(function(t){ s(t,'font-size',descFs); s(t,'line-height','1.4'); });
}
var card = item;
s(card, 'margin-bottom', '0');
if (card.children[0] && card.children[0].children[0]) {
s(card.children[0].children[0], 'padding-bottom', '0');
}
});
}
function fixSpinningWheel() {
var force = function(el, styles) {
if (!el) return;
Object.keys(styles).forEach(function(prop) {
el.style.setProperty(prop, styles[prop], 'important');
});
};
var strip = document.getElementById('comp-ifmbz7m3');
force(strip, {
'width': '100vw', 'min-width': '0', 'max-width': '100vw',
'margin-left': '0', 'margin-right': '0', 'left': '0'
});
if (strip) {
var cols = strip.querySelector('[data-testid="columns"]');
force(cols, { 'width': '100%', 'min-width': '0', 'padding': '0' });
}
var col = document.getElementById('mediajca9p32y7');
force(col, { 'width': '100%', 'min-width': '0', 'max-width': '100vw' });
var innerGrid = document.querySelector('[data-mesh-id="mediajca9p32y7inlineContent-gridContainer"]');
force(innerGrid, { 'min-height': '0', 'grid-template-rows': 'repeat(10, auto)', 'row-gap': '0' });
if (innerGrid) innerGrid.style.cssText += 'grid-template-rows: repeat(10, auto) !important; row-gap: 0px !important;';
var sectionGrid = document.querySelector('[data-mesh-id="comp-ifmbz7m3inlineContent-gridContainer"]');
force(sectionGrid, { 'min-height': '0', 'grid-template-rows': 'auto' });
var sec = document.getElementById('comp-ifmbz7m3');
force(sec, { 'min-height': '0', 'padding-bottom': '0' });
if (innerGrid) {
for (var i = 0; i < innerGrid.children.length; i++) {
var ch = innerGrid.children[i];
force(ch, { 'margin-top': '0', 'margin-bottom': '0' });
}
}
var vyezd = document.getElementById('comp-ki68484k');
force(vyezd, { 'margin-top': '-3px' });
var sec2 = document.getElementById('comp-lddi5052');
force(sec2, { 'min-height': '0' });
var repeater = document.getElementById('comp-ki62maow');
force(repeater, {
'width': '100%', 'min-width': '0', 'max-width': '100vw',
'margin-left': '0', 'left': '0', 'margin-bottom': '0'
});
var parentGrid = document.querySelector('[data-mesh-id="comp-lddi5052inlineContent-gridContainer"]');
if (parentGrid && strip) {
strip.style.setProperty('margin-left', '0', 'important');
strip.style.setProperty('width', '100%', 'important');
}
}
function fixHeadings() {
var checkH = document.getElementById('comp-ifmduswa');
if (checkH) {
checkH.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p').forEach(function(el) {
el.style.setProperty('font-size', '24px', 'important');
el.style.setProperty('line-height', '1.2', 'important');
});
}
var servH = document.getElementById('comp-mjfw2ks6');
if (servH) {
servH.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p').forEach(function(el) {
el.style.setProperty('font-size', '32px', 'important');
el.style.setProperty('line-height', '1.2', 'important');
});
}
}
function fixCheckSection() {
var s = function(el, prop, val) { if (el) el.style.setProperty(prop, val, 'important'); };
var ctr = document.getElementById('comp-ifmdjb8q');
if (ctr) { s(ctr,'position','relative'); s(ctr,'left','0'); s(ctr,'margin','0'); s(ctr,'width','100%'); }
var grid = document.querySelector('[data-mesh-id="comp-ifmdjb8qinlineContent-gridContainer"]');
if (grid) {
s(grid,'display','grid');
s(grid,'grid-template-columns','70px 1fr');
s(grid,'grid-template-rows','auto ' + new Array(17).join('auto ').trim());
s(grid,'width','100%');
s(grid,'padding','10px 10px');
s(grid,'row-gap','0px');
s(grid,'column-gap','10px');
s(grid,'align-items','center');
s(grid,'box-sizing','border-box');
s(grid,'overflow','hidden');
}
var h = document.getElementById('comp-ifmduswa');
if (h) { s(h,'grid-column','1 / 3'); s(h,'grid-row','1'); s(h,'position','relative'); s(h,'left','0'); s(h,'width','100%'); s(h,'margin','0 0 4px 0'); }
var iconIds = ['comp-khp0nb6y','comp-khp0nb7m','comp-khp0nb6e','comp-khp0nb6a','comp-khp0nb6w',
'comp-khp0nb78','comp-khp0nb7d','comp-khp0nb71','comp-khp0nb7a','comp-khp0nb76',
'comp-khp0nb6h','comp-khp0nb6j','comp-khp0nb73','comp-khp0nb7i','comp-khp0nb7j','comp-khp0nb7f'];
iconIds.forEach(function(id, i) {
var el = document.getElementById(id);
if (!el) return;
s(el,'grid-column','1'); s(el,'grid-row',String(i+2));
s(el,'position','relative'); s(el,'left','0');
s(el,'width','70px'); s(el,'height','70px'); s(el,'min-width','0');
s(el,'display','flex'); s(el,'align-items','center'); s(el,'justify-content','center');
s(el,'align-self','center'); s(el,'overflow','hidden');
el.querySelectorAll('div,[data-mesh-id],[data-testid]').forEach(function(w) {
s(w,'width','70px'); s(w,'height','70px'); s(w,'position','relative');
s(w,'left','0'); s(w,'top','0'); s(w,'margin','0'); s(w,'padding','0');
});
var img = el.querySelector('img,svg,canvas');
if (img) { s(img,'width','70px'); s(img,'height','70px'); s(img,'object-fit','contain'); s(img,'display','block'); }
});
var textIds = ['comp-khp2x6ch','comp-khp2zpi4','comp-khp31o0p','comp-khp33yjl','comp-khp3ajgm',
'comp-khp3bjvv','comp-khp3ckkm','comp-khp3drtd','comp-khp3fahl','comp-khp3kbgb',
'comp-khp3kkfz','comp-khp3lmrg','comp-khp3ngv2','comp-khp3o2y7','comp-khp3qksl','comp-khp3sb7n'];
textIds.forEach(function(id, i) {
var el = document.getElementById(id);
if (!el) return;
s(el,'grid-column','2'); s(el,'grid-row',String(i+2));
s(el,'position','relative'); s(el,'left','0'); s(el,'width','100%');
s(el,'display','flex'); s(el,'align-items','center'); s(el,'align-self','center');
s(el,'min-height','70px'); s(el,'padding','0'); s(el,'margin','0');
el.querySelectorAll('span,p,h1,h2,h3,h4,h5,h6').forEach(function(t) {
s(t,'font-size','clamp(12px,3.5vw,14px)');
s(t,'line-height','1.2');
s(t,'text-align','left');
s(t,'margin','0'); s(t,'padding','0');
});
});
}
function fixGallery() {
var gallery = document.getElementById('comp-kkohl36g');
if (!gallery) return;
if (gallery.dataset.replaced) return;
var s = function(el,p,v){if(el)el.style.setProperty(p,v,'important');};
var slideH = 260;
var GAP = 8;
var imgs = gallery.querySelectorAll('.slick-slide:not(.slick-cloned) img');
if (imgs.length === 0) return;
var slides = [];
imgs.forEach(function(img) {
var src = img.currentSrc || img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy');
if (!src) return;
var found = false;
for (var k = 0; k < slides.length; k++) { if (slides[k].src === src) { found = true; break; } }
if (found) return;
var nw = img.naturalWidth || 1;
var nh = img.naturalHeight || 1;
var w = Math.round(slideH * (nw / nh));
slides.push({ src: src, w: w });
});
if (slides.length === 0) return;
gallery.dataset.replaced = '1';
gallery.innerHTML = '';
gallery.style.cssText = 'width:100%!important;max-width:100vw!important;height:' + (slideH + 20) + 'px!important;min-height:0!important;overflow:hidden!important;position:relative!important;padding:0!important;margin:0 auto!important;';
gallery.style.setProperty('--min-height', '0', 'important');
var track = document.createElement('div');
track.className = 'julian-gallery-track';
var totalSlides = slides.length;
var CLONES = 4;
function makeItem(slideObj) {
var img = document.createElement('img');
img.src = slideObj.src;
img.decoding = 'async';
img.style.cssText = 'height:' + slideH + 'px !important;width:auto !important;display:block !important;border-radius:8px !important;cursor:pointer;flex-shrink:0 !important;flex-grow:0 !important;';
img.addEventListener('click', function() {
if (Math.abs(swipeDist) < 8) openLightbox(this.src);
});
return img;
}
var allSlideData = [];
for (var c1 = totalSlides - CLONES; c1 < totalSlides; c1++) {
allSlideData.push(slides[((c1 % totalSlides) + totalSlides) % totalSlides]);
}
for (var c2 = 0; c2 < totalSlides; c2++) {
allSlideData.push(slides[c2]);
}
for (var c3 = 0; c3 < CLONES; c3++) {
allSlideData.push(slides[c3 % totalSlides]);
}
var totalTrackW = 0;
allSlideData.forEach(function(sd) { totalTrackW += sd.w + GAP; });
totalTrackW -= GAP;
track.style.cssText = 'display:flex !important;gap:' + GAP + 'px !important;height:' + slideH + 'px !important;align-items:center !important;will-change:transform;width:' + totalTrackW + 'px !important;min-width:' + totalTrackW + 'px !important;overflow:visible !important;position:relative !important;';
allSlideData.forEach(function(sd) {
track.appendChild(makeItem(sd));
});
gallery.appendChild(track);
var positions = [];
function calcPositions() {
positions = [];
var x = 0;
for (var i = 0; i < allSlideData.length; i++) {
var w = allSlideData[i].w;
positions.push({ left: x, width: w, center: x + w / 2 });
x += w + GAP;
}
}
calcPositions();
var currentIndex = CLONES;
var offsetX = 0;
var swipeDist = 0;
var startX = 0;
var startY = 0;
var isDragging = false;
var isHorizontal = null;
var animating = false;
function setTransform(x, animate) {
if (animate) {
track.style.transition = 'transform 0.3s ease';
} else {
track.style.transition = 'none';
}
track.style.transform = 'translateX(' + x + 'px)';
offsetX = x;
}
function centerOn(idx, animate) {
if (idx < 0 || idx >= positions.length) return;
var galW = gallery.getBoundingClientRect().width;
var target = -(positions[idx].center - galW / 2);
setTransform(target, animate);
currentIndex = idx;
}
function checkBounds() {
if (currentIndex < CLONES) {
currentIndex += totalSlides;
centerOn(currentIndex, false);
} else if (currentIndex >= CLONES + totalSlides) {
currentIndex -= totalSlides;
centerOn(currentIndex, false);
}
}
centerOn(currentIndex, false);
gallery.addEventListener('touchstart', function(e) {
if (animating) return;
startX = e.touches[0].clientX;
startY = e.touches[0].clientY;
isDragging = true;
isHorizontal = null;
swipeDist = 0;
track.style.transition = 'none';
}, { passive: true });
gallery.addEventListener('touchmove', function(e) {
if (!isDragging) return;
var dx = e.touches[0].clientX - startX;
var dy = e.touches[0].clientY - startY;
if (isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
isHorizontal = Math.abs(dx) > Math.abs(dy);
}
if (!isHorizontal) return;
e.preventDefault();
swipeDist = dx;
track.style.transform = 'translateX(' + (offsetX + dx) + 'px)';
}, { passive: false });
gallery.addEventListener('touchend', function() {
if (!isDragging) return;
isDragging = false;
if (!isHorizontal) return;
animating = true;
if (swipeDist < -40) currentIndex++;
else if (swipeDist > 40) currentIndex--;
centerOn(currentIndex, true);
setTimeout(function() {
animating = false;
checkBounds();
}, 350);
}, { passive: true });
var parentSec = document.getElementById('comp-lddi50531');
if (parentSec) {
s(parentSec, 'height', 'auto');
s(parentSec, 'min-height', '0');
parentSec.style.setProperty('--min-height', '0', 'important');
s(parentSec, 'overflow', 'hidden');
s(parentSec, 'padding-bottom', '10px');
var parentGrid = parentSec.querySelector('[data-mesh-id$="inlineContent-gridContainer"]');
if (parentGrid) {
s(parentGrid, 'min-height', '0');
s(parentGrid, 'height', 'auto');
parentGrid.style.cssText += 'grid-template-rows: auto auto auto !important; row-gap: 5px !important;';
}
}
var formSec = document.getElementById('comp-lddi50532');
if (formSec) {
s(formSec, 'height', 'auto');
s(formSec, 'min-height', '0');
formSec.style.setProperty('--min-height', '0', 'important');
s(formSec, 'padding-top', '10px');
var formGrid = formSec.querySelector('[data-mesh-id$="inlineContent-gridContainer"]');
if (formGrid) {
s(formGrid, 'min-height', '0');
s(formGrid, 'height', 'auto');
formGrid.style.cssText += 'grid-template-rows: auto !important;';
}
var formEl = document.getElementById('comp-ifqtfs8a');
if (formEl) s(formEl, 'margin-top', '0');
}
}
function openLightbox(src) {
if (document.getElementById('julian-lightbox')) return;
var overlay = document.createElement('div');
overlay.id = 'julian-lightbox';
overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;';
var img = document.createElement('img');
img.src = src;
img.style.cssText = 'max-width:95%;max-height:90%;object-fit:contain;border-radius:8px;';
img.addEventListener('click', function(e) { e.stopPropagation(); });
overlay.appendChild(img);
var closeBtn = document.createElement('div');
closeBtn.textContent = '\u2715';
closeBtn.style.cssText = 'position:absolute;top:15px;right:20px;color:white;font-size:30px;cursor:pointer;z-index:100000;';
overlay.appendChild(closeBtn);
function closeLightbox() {
overlay.remove();
document.body.style.overflow = '';
document.removeEventListener('keydown', onKey);
}
function onKey(e) { if (e.key === 'Escape') closeLightbox(); }
overlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', onKey);
document.body.style.overflow = 'hidden';
document.body.appendChild(overlay);
}
function fixContactSection() {
var container = document.getElementById('comp-ifqtfs8k');
if (!container) return;
if (container.dataset.contactFixed) return;
var grid = container.querySelector('[data-mesh-id$="inlineContent-gridContainer"]');
if (!grid) return;
var form = document.getElementById('comp-ka9q2827');
if (!form) return;
container.dataset.contactFixed = '1';
var s = function(el, p, v) { if (el) el.style.setProperty(p, v, 'important'); };
s(container, 'padding', '0');
s(container, 'margin', '0 auto');
s(container, 'width', '100%');
s(container, 'box-sizing', 'border-box');
var titleEl = document.getElementById('comp-ki66v6a7');
var phoneIcon = document.getElementById('comp-ki67dtks');
var phoneIconImg = document.getElementById('img_comp-ki67dtks');
var phoneText = document.getElementById('comp-ki67ga2p');
var emailIcon = document.getElementById('comp-ki67kwsu');
var emailIconImg = document.getElementById('img_comp-ki67kwsu');
var emailText = document.getElementById('comp-ki67lqh6');
var igIcon = document.getElementById('comp-igw7v8qw');
var igText = document.getElementById('comp-l1nyffrg');
var fbIcon = document.getElementById('comp-l1nyz7tu');
var fbText = document.getElementById('comp-l1nz5o27');
var titleBlock = document.getElementById('comp-ki66uq3q');
var wrapper = document.createElement('div');
wrapper.style.cssText = 'display:flex !important;flex-direction:column !important;align-items:stretch !important;gap:0 !important;width:100% !important;padding:0 15px !important;box-sizing:border-box !important;margin:0 !important;';
var titleAndContactsPad = '14px';
var titleContactStyle = 'padding-left:' + titleAndContactsPad + ' !important;box-sizing:border-box !important;';
if (titleEl) {
s(titleEl, 'height', 'auto');
s(titleEl, 'min-height', '0');
s(titleEl, 'position', 'relative');
s(titleEl, 'margin-bottom', '14px');
s(titleEl, 'width', '100%');
s(titleEl, 'padding-left', titleAndContactsPad);
s(titleEl, 'box-sizing', 'border-box');
var h2El = titleEl.querySelector('h2');
if (h2El) {
s(h2El, 'line-height', '1.2');
s(h2El, 'font-weight', '700');
s(h2El, 'font-family', '"Courier Prime", "Courier New", monospace');
}
if (h2El) {
var h2Text = h2El.textContent.trim();
if (h2Text.indexOf('Zostaw') !== -1 && h2Text.length > 40) {
h2El.innerHTML = '';
var titleSpan = document.createElement('span');
titleSpan.textContent = 'Zostaw zg\u0142oszenie';
titleSpan.style.cssText = 'font-size:34px !important;line-height:1.1 !important;display:block !important;font-weight:700 !important;font-family:"Courier Prime","Courier New",monospace !important;color:white !important;';
var subSpan = document.createElement('span');
subSpan.textContent = 'a skontaktujemy si\u0119 z Tob\u0105 w mo\u017Cliwie najkr\u00F3tszym czasie';
subSpan.style.cssText = 'font-size:24px !important;line-height:1.2 !important;display:block !important;margin-top:6px !important;font-weight:700 !important;font-family:"Courier Prime","Courier New",monospace !important;color:white !important;';
h2El.appendChild(titleSpan);
h2El.appendChild(subSpan);
h2El.style.setProperty('font-size', 'inherit', 'important');
} else {
var titleSpans = titleEl.querySelectorAll('span');
for (var t = 0; t < titleSpans.length; t++) {
var sp = titleSpans[t];
var spTxt = sp.textContent.trim();
s(sp, 'font-family', '"Courier Prime", "Courier New", monospace');
s(sp, 'font-weight', '700');
if (spTxt.indexOf('Оставьте') !== -1 || spTxt.indexOf('Залишіть') !== -1 || spTxt.indexOf('Залиште') !== -1) {
s(sp, 'font-size', '34px');
s(sp, 'line-height', '1.1');
} else {
s(sp, 'font-size', '24px');
s(sp, 'line-height', '1.2');
}
}
}
}
wrapper.appendChild(titleEl);
}
function makeRow(icon, iconImg, text, iconSize) {
var sz = iconSize || 36;
var row = document.createElement('div');
row.style.cssText = 'display:flex !important;align-items:center !important;gap:12px !important;width:100% !important;padding:4px 0 4px ' + titleAndContactsPad + ' !important;margin:0 !important;min-height:0 !important;align-self:stretch !important;box-sizing:border-box !important;';
if (icon) {
s(icon, 'width', sz + 'px');
s(icon, 'height', sz + 'px');
s(icon, 'min-width', sz + 'px');
s(icon, 'max-width', sz + 'px');
s(icon, 'min-height', sz + 'px');
s(icon, 'max-height', sz + 'px');
s(icon, 'flex-shrink', '0');
s(icon, 'position', 'relative');
s(icon, 'overflow', 'hidden');
s(icon, 'box-sizing', 'border-box');
s(icon, 'padding', '0');
s(icon, 'margin', '0');
s(icon, 'display', 'flex');
s(icon, 'align-items', 'center');
s(icon, 'justify-content', 'center');
if (iconImg) {
s(iconImg, 'width', sz + 'px');
s(iconImg, 'height', sz + 'px');
s(iconImg, 'max-width', sz + 'px');
s(iconImg, 'max-height', sz + 'px');
s(iconImg, 'object-fit', 'contain');
}
var svgEl = icon.querySelector('svg');
if (svgEl) {
s(svgEl, 'width', sz + 'px');
s(svgEl, 'height', sz + 'px');
}
row.appendChild(icon);
}
if (text) {
s(text, 'width', 'auto');
s(text, 'flex', '1');
s(text, 'position', 'relative');
s(text, 'height', 'auto');
s(text, 'min-height', '0');
s(text, 'margin', '0');
s(text, 'padding', '0');
var allTextEls = text.querySelectorAll('span, h3, h2, p, a, div');
for (var j = 0; j < allTextEls.length; j++) {
s(allTextEls[j], 'font-size', '18px');
s(allTextEls[j], 'line-height', '1.2');
s(allTextEls[j], 'margin', '0');
s(allTextEls[j], 'padding', '0');
s(allTextEls[j], 'min-height', '0');
s(allTextEls[j], 'height', 'auto');
}
s(text, 'font-size', '18px');
s(text, 'line-height', '1.2');
row.appendChild(text);
}
return row;
}
var ICON = 36;
if (phoneIconImg) {
s(phoneIconImg, 'width', '44px');
s(phoneIconImg, 'height', '44px');
s(phoneIconImg, 'max-width', '44px');
s(phoneIconImg, 'max-height', '44px');
s(phoneIconImg, 'position', 'absolute');
s(phoneIconImg, 'top', '50%');
s(phoneIconImg, 'left', '50%');
s(phoneIconImg, 'transform', 'translate(-50%, -50%)');
}
wrapper.appendChild(makeRow(phoneIcon, null, phoneText, ICON));
if (emailIconImg) {
s(emailIconImg, 'width', '56px');
s(emailIconImg, 'height', '56px');
s(emailIconImg, 'max-width', '56px');
s(emailIconImg, 'max-height', '56px');
s(emailIconImg, 'margin', '0');
s(emailIconImg, 'position', 'absolute');
s(emailIconImg, 'top', '50%');
s(emailIconImg, 'left', '50%');
s(emailIconImg, 'transform', 'translate(-50%, -50%)');
}
var emailIconSvg = emailIcon ? emailIcon.querySelector('svg') : null;
wrapper.appendChild(makeRow(emailIcon, null, emailText, ICON));
if (emailText) {
var eSpans = emailText.querySelectorAll('span, h3, p, a, div');
for (var ei = 0; ei < eSpans.length; ei++) {
s(eSpans[ei], 'font-size', '15px');
}
s(emailText, 'font-size', '15px');
}
var igIconImg = igIcon ? igIcon.querySelector('img') : null;
wrapper.appendChild(makeRow(igIcon, igIconImg, igText, ICON));
var fbIconImg = fbIcon ? fbIcon.querySelector('img') : null;
wrapper.appendChild(makeRow(fbIcon, fbIconImg, fbText, ICON));
s(form, 'height', 'auto');
s(form, 'min-height', '0');
s(form, 'width', '100%');
s(form, 'max-width', '100%');
s(form, 'position', 'relative');
s(form, 'margin-top', '10px');
s(form, 'margin-left', '0');
s(form, 'align-self', 'stretch');
s(form, 'box-sizing', 'border-box');
wrapper.appendChild(form);
grid.style.cssText += 'display:block !important;height:auto !important;min-height:0 !important;padding:0 !important;margin:0 !important;';
while (grid.firstChild) grid.removeChild(grid.firstChild);
grid.appendChild(wrapper);
var parentSection = document.getElementById('comp-ifqtfs8a');
if (parentSection) {
s(parentSection, 'height', 'auto');
s(parentSection, 'min-height', '0');
parentSection.style.setProperty('--min-height', '0', 'important');
}
var parentSection2 = document.getElementById('comp-lddi50532');
if (parentSection2) {
s(parentSection2, 'height', 'auto');
s(parentSection2, 'min-height', '0');
parentSection2.style.setProperty('--min-height', '0', 'important');
}
}
function fixTutButton() {
var tutBtn = document.getElementById('comp-kvig3o6s');
var textEl = document.getElementById('comp-kvig7cye');
if (!tutBtn || !textEl) return;
if (textEl.querySelector('.inline-tut-link')) return;
var link = tutBtn.querySelector('a');
var href = link ? link.getAttribute('href') : '/ru/general-9';
tutBtn.style.setProperty('display', 'none', 'important');
var inlineLink = document.createElement('a');
inlineLink.href = href;
inlineLink.className = 'inline-tut-link';
inlineLink.textContent = ' тут.';
inlineLink.style.cssText = 'color:white;text-decoration:underline;font-weight:700;cursor:pointer;';
var lastSpan = textEl.querySelectorAll('span');
var target = lastSpan.length > 0 ? lastSpan[lastSpan.length - 1] : textEl;
target.appendChild(inlineLink);
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
initMobileNav();
fixSpinningWheel();
fixServiceCards();
fixCheckSection();
fixHeadings();
fixTutButton();
fixGallery();
fixContactSection();
moveCompanyInfo();
});
} else {
initMobileNav();
fixSpinningWheel();
fixServiceCards();
fixCheckSection();
fixHeadings();
fixTutButton();
fixGallery();
fixContactSection();
moveCompanyInfo();
}
function moveCompanyInfo() {
if (document.getElementById('mobile-company-info')) return;
var tutEl = document.getElementById('comp-kvig3o6s');
if (!tutEl) return;
var ids = ['comp-ki68b2z3', 'comp-ki68c5pq', 'comp-ki68finn', 'comp-ki68g7ph'];
var texts = [];
ids.forEach(function(id) {
var el = document.getElementById(id);
if (el) {
texts.push(el.textContent.trim());
el.style.setProperty('display', 'none', 'important');
}
});
if (texts.length === 0) return;
var wrapper = document.createElement('div');
wrapper.id = 'mobile-company-info';
wrapper.style.cssText = 'width:100%;text-align:center;padding:20px 3vw 10px;box-sizing:border-box;color:white;';
texts.forEach(function(t) {
var p = document.createElement('p');
p.textContent = t;
p.style.cssText = 'margin:4px 0;font-size:14px;line-height:1.4;color:white;font-family:Jost,sans-serif;';
wrapper.appendChild(p);
});
tutEl.parentNode.insertBefore(wrapper, tutEl.nextSibling);
}
function fixGeneral9Page() {
if (window.location.pathname.indexOf('general-9') === -1) return;
if (document.getElementById('g9-nav')) return;
var mainGrid = document.querySelector('[data-mesh-id="ContainervdbrdinlineContent-gridContainer"]');
if (mainGrid) {
mainGrid.style.setProperty('display', 'flex', 'important');
mainGrid.style.setProperty('flex-direction', 'column', 'important');
mainGrid.style.setProperty('height', 'auto', 'important');
mainGrid.style.setProperty('min-height', 'auto', 'important');
}
var sections = document.querySelectorAll('.wixui-section');
for (var i = 0; i < sections.length; i++) {
var sec = sections[i];
sec.style.setProperty('min-height', 'auto', 'important');
sec.style.setProperty('height', 'auto', 'important');
sec.style.setProperty('overflow', 'visible', 'important');
sec.style.setProperty('position', 'relative', 'important');
sec.style.setProperty('margin', '0', 'important');
sec.style.setProperty('width', '100%', 'important');
sec.style.setProperty('min-width', 'unset', 'important');
sec.style.setProperty('left', 'auto', 'important');
}
var strips = document.querySelectorAll('.wixui-column-strip');
for (var j = 0; j < strips.length; j++) {
strips[j].style.setProperty('min-height', 'auto', 'important');
strips[j].style.setProperty('height', 'auto', 'important');
strips[j].style.setProperty('overflow', 'visible', 'important');
strips[j].style.setProperty('margin', '0', 'important');
strips[j].style.setProperty('padding', '0', 'important');
strips[j].style.setProperty('width', '100%', 'important');
strips[j].style.setProperty('min-width', 'unset', 'important');
}
var cols = document.querySelectorAll('.wixui-column-strip__column');
for (var k = 0; k < cols.length; k++) {
cols[k].style.setProperty('min-height', 'auto', 'important');
cols[k].style.setProperty('height', 'auto', 'important');
cols[k].style.setProperty('overflow', 'visible', 'important');
cols[k].style.setProperty('padding', '24px 16px', 'important');
cols[k].style.setProperty('width', '100%', 'important');
cols[k].style.setProperty('min-width', 'unset', 'important');
}
var meshes = document.querySelectorAll('[data-mesh-id*="inlineContent"], [data-mesh-id*="gridContainer"]');
for (var m = 0; m < meshes.length; m++) {
meshes[m].style.setProperty('display', 'flex', 'important');
meshes[m].style.setProperty('flex-direction', 'column', 'important');
meshes[m].style.setProperty('height', 'auto', 'important');
meshes[m].style.setProperty('min-height', 'auto', 'important');
meshes[m].style.setProperty('position', 'relative', 'important');
meshes[m].style.setProperty('width', '100%', 'important');
}
var skipIds = ['comp-mfeiy39i', 'comp-kvigrosn'];
var allComps = document.querySelectorAll('[id^="comp-"]');
for (var c = 0; c < allComps.length; c++) {
var el = allComps[c];
var id = el.id || '';
if (id.indexOf('HEADER') > -1 || id.indexOf('FOOTER') > -1 || id.indexOf('menu') > -1) continue;
if (id.indexOf('bgMedia') > -1) continue;
if (id.indexOf('ifgtula7') > -1) continue;
if (skipIds.indexOf(id) > -1) continue;
el.style.setProperty('position', 'relative', 'important');
el.style.setProperty('left', 'auto', 'important');
el.style.setProperty('top', 'auto', 'important');
el.style.setProperty('width', '100%', 'important');
el.style.setProperty('max-width', '100%', 'important');
el.style.setProperty('min-width', 'unset', 'important');
el.style.setProperty('min-height', 'auto', 'important');
el.style.setProperty('height', 'auto', 'important');
el.style.setProperty('margin-left', 'auto', 'important');
el.style.setProperty('margin-right', 'auto', 'important');
var mt = parseInt(getComputedStyle(el).marginTop);
if (mt > 100) el.style.setProperty('margin-top', '16px', 'important');
}
var fills = document.querySelectorAll('.YzqVVZ');
for (var f = 0; f < fills.length; f++) {
fills[f].style.setProperty('min-height', 'auto', 'important');
fills[f].style.setProperty('height', 'auto', 'important');
fills[f].style.setProperty('overflow', 'visible', 'important');
fills[f].style.setProperty('padding', '24px 16px', 'important');
}
var btnOrder = document.getElementById('comp-mfeiy39i');
if (btnOrder) {
btnOrder.style.setProperty('width', '280px', 'important');
btnOrder.style.setProperty('max-width', '85%', 'important');
btnOrder.style.setProperty('height', '60px', 'important');
btnOrder.style.setProperty('margin', '24px auto', 'important');
btnOrder.style.setProperty('left', 'auto', 'important');
btnOrder.style.setProperty('position', 'relative', 'important');
btnOrder.style.setProperty('display', 'block', 'important');
btnOrder.style.setProperty('overflow', 'hidden', 'important');
var artifacts1 = btnOrder.querySelectorAll('.i_JO53');
for (var a1 = 0; a1 < artifacts1.length; a1++) {
artifacts1[a1].style.setProperty('display', 'none', 'important');
}
var link1 = btnOrder.querySelector('.gGLsaS');
if (link1) {
link1.style.setProperty('background-color', 'rgb(85,113,161)', 'important');
link1.style.setProperty('border-radius', '30px', 'important');
link1.style.setProperty('box-shadow', 'none', 'important');
link1.style.setProperty('display', 'flex', 'important');
link1.style.setProperty('align-items', 'center', 'important');
link1.style.setProperty('justify-content', 'center', 'important');
link1.style.setProperty('width', '100%', 'important');
link1.style.setProperty('height', '100%', 'important');
link1.style.setProperty('text-decoration', 'none', 'important');
link1.addEventListener('touchstart', function() {
this.style.setProperty('background-color', 'rgb(186,218,85)', 'important');
var lbl = this.querySelector('.wixui-button__label');
if (lbl) lbl.style.setProperty('color', 'rgb(85,113,161)', 'important');
});
link1.addEventListener('touchend', function() {
this.style.setProperty('background-color', 'rgb(85,113,161)', 'important');
var lbl = this.querySelector('.wixui-button__label');
if (lbl) lbl.style.setProperty('color', 'white', 'important');
});
}
var label1 = btnOrder.querySelector('.wixui-button__label');
if (label1) {
label1.style.setProperty('font-size', '18px', 'important');
label1.style.setProperty('color', 'white', 'important');
label1.style.setProperty('font-family', 'Jura, sans-serif', 'important');
label1.style.setProperty('font-weight', '700', 'important');
}
}
var btnContact = document.getElementById('comp-kvigrosn');
if (btnContact) {
btnContact.style.setProperty('width', '240px', 'important');
btnContact.style.setProperty('max-width', '85%', 'important');
btnContact.style.setProperty('height', '42px', 'important');
btnContact.style.setProperty('margin', '16px auto', 'important');
btnContact.style.setProperty('left', 'auto', 'important');
btnContact.style.setProperty('position', 'relative', 'important');
btnContact.style.setProperty('display', 'block', 'important');
btnContact.style.setProperty('overflow', 'hidden', 'important');
var artifacts2 = btnContact.querySelectorAll('.i_JO53');
for (var a2 = 0; a2 < artifacts2.length; a2++) {
artifacts2[a2].style.setProperty('display', 'none', 'important');
}
var link2 = btnContact.querySelector('.gGLsaS');
if (link2) {
link2.style.setProperty('background-color', 'rgb(85,113,161)', 'important');
link2.style.setProperty('border-radius', '12px', 'important');
link2.style.setProperty('box-shadow', 'none', 'important');
link2.style.setProperty('display', 'flex', 'important');
link2.style.setProperty('align-items', 'center', 'important');
link2.style.setProperty('justify-content', 'center', 'important');
link2.style.setProperty('width', '100%', 'important');
link2.style.setProperty('height', '100%', 'important');
link2.style.setProperty('text-decoration', 'none', 'important');
link2.addEventListener('touchstart', function() {
this.style.setProperty('background-color', 'rgb(186,218,85)', 'important');
var lbl = this.querySelector('.wixui-button__label');
if (lbl) lbl.style.setProperty('color', 'rgb(85,113,161)', 'important');
});
link2.addEventListener('touchend', function() {
this.style.setProperty('background-color', 'rgb(85,113,161)', 'important');
var lbl = this.querySelector('.wixui-button__label');
if (lbl) lbl.style.setProperty('color', 'white', 'important');
});
}
var label2 = btnContact.querySelector('.wixui-button__label');
if (label2) {
label2.style.setProperty('font-size', '16px', 'important');
label2.style.setProperty('color', 'white', 'important');
}
}
var bgMedias = document.querySelectorAll('[id^="bgMedia_"]');
for (var bg = 0; bg < bgMedias.length; bg++) {
bgMedias[bg].style.setProperty('position', 'absolute', 'important');
bgMedias[bg].style.setProperty('height', '100%', 'important');
bgMedias[bg].style.setProperty('z-index', '-1', 'important');
}
}
setTimeout(fixGeneral9Page, 500);
setTimeout(fixGeneral9Page, 1500);
setTimeout(fixGeneral9Page, 3000);
setTimeout(fixSpinningWheel, 800);
setTimeout(fixSpinningWheel, 2000);
setTimeout(fixServiceCards, 800);
setTimeout(fixServiceCards, 2000);
setTimeout(fixCheckSection, 800);
setTimeout(fixCheckSection, 2000);
setTimeout(fixHeadings, 800);
setTimeout(fixHeadings, 2000);
setTimeout(fixTutButton, 800);
setTimeout(fixTutButton, 2000);
setTimeout(fixGallery, 800);
setTimeout(fixGallery, 2000);
setTimeout(fixContactSection, 800);
setTimeout(fixContactSection, 2000);
setTimeout(moveCompanyInfo, 800);
setTimeout(moveCompanyInfo, 2000);
})();
