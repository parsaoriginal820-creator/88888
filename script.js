// تقویم شمسی بدون نیاز به هیچ کتابخانه خارجی
function gregorianToJalali(gy, gm, gd) {
    let jy, jm, jd, gdays, jdays;
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    const jalaliYearOffset = [0, -79, -78];
    gdays = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][gm - 1];
    if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) gdays++;
    jdays = -gdays + 226899;
    jy = Math.floor(jdays / 1029983) * 33 + 979;
    jdays %= 1029983;
    if (jdays >= 1029983) { jy += 33; jdays -= 1029983; }
    const leaps = Math.floor(jdays / 366);
    jdays -= leaps * 366;
    jy += leaps * 4;
    const march = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336];
    jm = 1;
    while (jdays > march[jm - 1] + (jm <= 6 ? 31 : 30) - (jm === 12 ? 1 : 0)) jm++;
    jd = jdays - march[jm - 2] + (jm === 1 ? 0 : (jm <= 7 ? 30 : 31));
    return { jy: jy, jm: jm, jd: jd };
}

// ساعت و تقویم
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    document.getElementById('clock').textContent = time;

    const j = gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const dateStr = `${days[now.getDay()]}، ${j.jd} ${months[j.jm - 1]} ${j.jy}`;
    document.getElementById('date').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// بقیه کد (ذرات + صدا + فال) دقیقاً همون قبلی
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 5 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1 - 0.5; } update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.2) this.size -= 0.01; } draw() { ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
function initParticles() { for (let i = 0; i < 100; i++) particlesArray.push(new Particle()); }
initParticles();
function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); if (particlesArray[i].size <= 0.2) { particlesArray.splice(i, 1); i--; particlesArray.push(new Particle()); } } requestAnimationFrame(animateParticles); }
animateParticles();

const music = document.getElementById('bgMusic');
const soundBtn = document.getElementById('soundBtn');
let musicAllowed = false;
document.body.addEventListener('click', function unlockAudio() { if (!musicAllowed) { music.play().then(() => { musicAllowed = true; soundBtn.textContent = '🔊'; }).catch(() => { soundBtn.textContent = '🔇'; }); document.body.removeEventListener('click', unlockAudio); } }, { once: true });
soundBtn.addEventListener('click', () => { if (musicAllowed) { if (music.paused) { music.play(); soundBtn.textContent = '🔊'; soundBtn.classList.remove('muted'); } else { music.pause(); soundBtn.textContent = '🔇'; soundBtn.classList.add('muted'); } } else { music.play(); musicAllowed = true; soundBtn.textContent = '🔊'; } });
document.getElementById('get-fal').addEventListener('click', () => { if (!musicAllowed) { music.play(); musicAllowed = true; soundBtn.textContent = '🔊'; } });

const falha = [
    {poem: "الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها", taavil: "فال شما بسیار نیک است. عشق و آرزوهایتان به زودی محقق می‌شود."},
    {poem: "صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش", taavil: "روزگار خوشی در پیش داری، از زندگی لذت ببر."},
    {poem: "دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست", taavil: "تغییرات بزرگ و مثبت در راه است."},
    {poem: "هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند", taavil: "عشق واقعی در راه است، آماده باش!"},
    {poem: "بیا که نوبت صلح و آشتی است\nجنگ و کینه را بشوی از دل و دیده", taavil: "زمان آشتی و بخشش فرا رسیده است."}
];

document.getElementById('get-fal').addEventListener('click', function(e) {
    const randomFal = falha[Math.floor(Math.random() * falha.length)];
    const poemElement = document.querySelector('.poem');
    const taavilElement = document.querySelector('.taavil');
    const card = document.getElementById('fal-result');
    card.classList.remove('show');
    setTimeout(() => {
        poemElement.className = 'poem typing';
        poemElement.textContent = '';
        taavilElement.textContent = '';
        let i = 0;
        const text = randomFal.poem;
        const typeWriter = () => {
            if (i < text.length) {
                poemElement.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                poemElement.innerHTML = poemElement.innerHTML.replace('|', '');
                taavilElement.textContent = randomFal.taavil;
                card.classList.add('show');
            }
        };
        typeWriter();
    }, 300);
});