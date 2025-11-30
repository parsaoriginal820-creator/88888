// ==================== تبدیل میلادی به شمسی ====================
function gregorianToJalali(gy, gm, gd) {
    let jy = gy - 621;
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd +
               [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][gm - 1];
    if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) days++;
    let jdays = days - 79;
    let jy_cycle = Math.floor(jdays / 12053);
    jdays %= 12053;
    jy += 979 + jy_cycle * 2820;
    let aux = Math.floor(jdays / 1029983);
    if (aux > 0) { jy += aux * 33; jdays -= aux * 1029983; }
    let y = Math.floor(jdays / 366);
    jdays -= y * 366;
    jy += y * 4;
    let march = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336];
    let jm = 1;
    while (jdays > (march[jm - 1] + (jm <= 6 ? 31 : 30))) jm++;
    let jd = jdays - march[jm - 2] + (jm === 1 ? 0 : (jm <= 7 ? 30 : 31));
    return { jy, jm, jd };
}

// ساعت
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds() * 6;
    const minutes = now.getMinutes() * 6 + seconds / 60;
    const hours = (now.getHours() % 12) * 30 + minutes / 12;
    document.getElementById('second').style.transform = `rotate(${seconds + 90}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minutes + 90}deg)`;
    document.getElementById('hour').style.transform = `rotate(${hours + 90}deg)`;
}
setInterval(updateClock, 1000);
updateClock();

// تقویم
function generateCalendar() {
    const now = new Date();
    const j = gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    document.getElementById('jalaliMonthYear').textContent = `${months[j.jm - 1]} ${j.jy}`;
    document.getElementById('miladiDate').textContent = `${now.toLocaleDateString('fa-IR', { weekday: 'long' })}، ${j.jd} ${months[j.jm - 1]} ${j.jy}`;
    const daysInMonth = j.jm <= 6 ? 31 : (j.jm <= 11 ? 30 : (j.jy % 4 === 3 ? 30 : 29));
    let html = '';
    let day = 1;
    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let k = 0; k < 7; k++) {
            if (i === 0 && k < firstDayOfMonth) {
                html += '<td></td>';
            } else if (day <= daysInMonth) {
                const isToday = day === j.jd;
                html += `<td ${isToday ? 'class="today"' : ''}>${day}</td>`;
                day++;
            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    document.getElementById('calendarBody').innerHTML = html;
    const events = {1: "نوروز", 9: "روز ملی شدن صنعت نفت", 12: "روز جمهوری اسلامی", 13: "روز طبیعت", 30: "روز ملی خلیج فارس"};
    document.getElementById('eventsToday').textContent = events[j.jd] || "مناسبت خاصی ثبت نشده";
}
generateCalendar();

// ستاره‌ها
for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = star.style.height = Math.random() * 3 + 1 + 'px';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 5 + 's';
    document.getElementById('stars').appendChild(star);
}

// ابرها
document.querySelectorAll('.cloud').forEach(cloud => {
    cloud.style.animationDelay = Math.random() * 100 + 's';
});

// ستاره دنباله‌دار
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 60 + '%';
    document.body.appendChild(star);
    setTimeout(() => {
        star.style.transform = 'translateX(220vw) translateY(120px)';
        star.style.opacity = '1';
    }, 100);
    setTimeout(() => star.remove(), 5000);
}
setInterval(createShootingStar, Math.random() * 8000 + 6000);
setTimeout(createShootingStar, 3000);

// صدا
const music = document.getElementById('bgMusic');
let soundAllowed = false;
document.body.addEventListener('click', () => {
    if (!soundAllowed) {
        music.play().catch(() => {});
        soundAllowed = true;
    }
}, { once: true });
document.getElementById('soundBtn').addEventListener('click', () => {
    if (music.paused) {
        music.play();
        document.getElementById('soundBtn').textContent = 'Speaker On';
    } else {
        music.pause();
        document.getElementById('soundBtn').textContent = 'Speaker Off';
    }
});

// فال حافظ — ۱۰۰٪ کار می‌کند (IIFE برای اجرای فوری)
(function() {
    const falha = [
        { poem: "الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها", taavil: "عشق و آرزوهایت به زودی محقق می‌شود." },
        { poem: "صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش", taavil: "روزگار خوشی در پیش داری." },
        { poem: "دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست", taavil: "تغییرات بزرگ و مثبت در راه است." },
        { poem: "هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند", taavil: "عشق واقعی در راه است." },
        { poem: "بیا که رونق این کارخانهٔ عشقباز است\nبه یاد شاه شجاع ما رندی و عشرت کنیم", taavil: "شادی و موفقیت در پیش است." },
        { poem: "گر از دوست علاج دل طلبم عجبی نیست\nطبیب همه عالمم و دردم نهان دارم", taavil: "مشکلاتت به زودی حل می‌شود." }
    ];

    // منتظر لود کامل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFal);
    } else {
        initFal();
    }

    function initFal() {
        const btn = document.getElementById('get-fal');
        const poemEl = document.querySelector('.poem');
        const taavilEl = document.querySelector('.taavil');
        const card = document.getElementById('fal-result');

        if (!btn || !poemEl || !taavilEl || !card) {
            console.error('عناصر فال پیدا نشد!');
            return;
        }

        btn.addEventListener('click', function() {
            console.log('دکمه فال کلیک شد!'); // برای تست
            const randomFal = falha[Math.floor(Math.random() * falha.length)];

            // ریست
            card.classList.remove('show');
            poemEl.innerHTML = '';
            taavilEl.textContent = '';

            // انیمیشن تایپ
            setTimeout(() => {
                poemEl.className = 'poem typing';
                let i = 0;
                const text = randomFal.poem;
                const typeWriter = () => {
                    if (i < text.length) {
                        poemEl.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 80);
                    } else {
                        taavilEl.textContent = randomFal.taavil;
                        card.classList.add('show');
                    }
                };
                typeWriter();
            }, 300);
        });

        console.log('فال حافظ آماده شد!');
    }
})();