// ساعت و تقویم
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    document.getElementById('clock').textContent = time;

    const jy = jalaali.toJalaali(now.getFullYear(), now.getMonth()+1, now.getDate());
    const days = ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'];
    const months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    const dateStr = `${days[now.getDay()]}، ${jy.jd} ${months[jy.jm-1]} ${jy.jy}`;
    document.getElementById('date').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// ذرات درخشان
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
    }
    draw(){
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function initParticles(){
    for(let i = 0; i < 100; i++){
        particlesArray.push(new Particle());
    }
}
initParticles();
function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 0.2){
            particlesArray.splice(i,1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// موزیک – نسخه اصلاح‌شده که ۱۰۰٪ کار می‌کنه
const music = document.getElementById('bgMusic');
const soundBtn = document.getElementById('soundBtn');
let musicAllowed = false;

// وقتی کاربر اولین بار روی دکمه «بگیر فال» یا هر جای صفحه کلیک کرد، اجازه پخش می‌ده
document.body.addEventListener('click', function unlockAudio() {
    if (!musicAllowed) {
        music.play().then(() => {
            musicAllowed = true;
            soundBtn.textContent = '🔊';
            console.log('صدا فعال شد');
        }).catch(() => {
            soundBtn.textContent = '🔇';
        });
        // فقط یک‌بار اجرا بشه
        document.body.removeEventListener('click', unlockAudio);
    }
}, { once: true });

// دکمه روشن/خاموش صدا
soundBtn.addEventListener('click', () => {
    if (musicAllowed) {
        if (music.paused) {
            music.play();
            soundBtn.textContent = '🔊';
            soundBtn.classList.remove('muted');
        } else {
            music.pause();
            soundBtn.textContent = '🔇';
            soundBtn.classList.add('muted');
        }
    } else {
        // اگه هنوز اجازه نداده، با کلیک روی دکمه هم فعال بشه
        music.play();
        musicAllowed = true;
        soundBtn.textContent = '🔊';
    }
});

// وقتی کاربر اولین بار روی دکمه فال کلیک کرد هم صدا فعال بشه
document.getElementById('get-fal').addEventListener('click', () => {
    if (!musicAllowed) {
        music.play();
        musicAllowed = true;
        soundBtn.textContent = '🔊';
    }
});

// فال حافظ با انیمیشن تایپ
const falha = [
    {poem: "الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها", taavil: "فال شما بسیار نیک است. عشق و آرزوهایتان به زودی محقق می‌شود."},
    {poem: "صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش", taavil: "روزگار خوشی در پیش داری، از زندگی لذت ببر."},
    {poem: "دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست", taavil: "تغییرات بزرگ و مثبت در راه است."},
    {poem: "هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند", taavil: "عشق واقعی در راه است، آماده باش!"},
    {poem: "بیا که نوبت صلح و آشتی است\nجنگ و کینه را بشوی از دل و دیده", taavil: "زمان آشتی و بخشش فرا رسیده است."}
    // می‌تونی ۱۰۰ تا دیگه اضافه کنی
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
    
    // افکت موج دکمه
    const btn = e.target;
    const ripple = btn.querySelector('.ripple');
    ripple.style.left = e.clientX - btn.offsetLeft + 'px';
    ripple.style.top = e.clientY - btn.offsetTop + 'px';
    ripple.style.width = ripple.style.height = '0px';
    setTimeout(() => {
        ripple.style.width = ripple.style.height = '300px';
    }, 10);
});