// IIFE برای اجرای فوری
(function() {
    'use strict';

    // فال‌ها
    const falha = [
        { poem: "الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها", taavil: "عشق و آرزوهایت به زودی محقق می‌شود." },
        { poem: "صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش", taavil: "روزگار خوشی در پیش داری." },
        { poem: "دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست", taavil: "تغییرات بزرگ و مثبت در راه است." },
        { poem: "هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند", taavil: "عشق واقعی در راه است." },
        { poem: "بیا که رونق این کارخانهٔ عشقباز است\nبه یاد شاه شجاع ما رندی و عشرت کنیم", taavil: "شادی و موفقیت در پیش است." }
    ];

    // منتظر لود DOM
    function init() {
        const btn = document.getElementById('get-fal');
        const poem = document.querySelector('.poem');
        const taavil = document.querySelector('.taavil');
        const card = document.getElementById('fal-result');

        if (btn && poem && taavil && card) {
            btn.addEventListener('click', function() {
                const randomFal = falha[Math.floor(Math.random() * falha.length)];

                card.classList.remove('show');
                poem.innerHTML = '';
                taavil.textContent = '';

                setTimeout(() => {
                    poem.className = 'poem typing';
                    let i = 0;
                    const text = randomFal.poem;
                    const typeWriter = () => {
                        if (i < text.length) {
                            poem.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                            i++;
                            setTimeout(typeWriter, 80);
                        } else {
                            taavil.textContent = randomFal.taavil;
                            card.classList.add('show');
                        }
                    };
                    typeWriter();
                }, 300);
            });
            console.log('فال آماده شد!');
        } else {
            console.error('عناصر پیدا نشد!');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();