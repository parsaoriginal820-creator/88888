// ساعت و تاریخ شمسی
function updateClock() {
    const now = new Date();
    
    // ساعت دیجیتال
    const time = now.toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('clock').textContent = time;

    // تاریخ شمسی
    const jy = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    
    const dayName = days[now.getDay()];
    const dateStr = `${dayName}، ${jy.jd} ${months[jy.jm - 1]} ${jy.jy}`;
    document.getElementById('date').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// فال حافظ
const falha = [
    {
        poem: "الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها",
        taavil: "فال شما بسیار نیک است. آغاز کارها آسان است اما پایمردی و استقامت لازم دارد."
    },
    {
        poem: "صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش",
        taavil: "روزگار خوشی در پیش داری، شادی کن و از لحظه‌ها لذت ببر."
    },
    {
        poem: "دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست",
        taavil: "تغییرات بزرگ در راه است. گاهی آنچه فکر می‌کنیم بد است، بهترین اتفاق زندگی‌مان می‌شود."
    },
    // می‌تونی تا ۵۰ تا فال دیگه اضافه کنی
    {
        poem: "هر کسی را که عشق نیست، دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند",
        taavil: "عشق واقعی در راه است. دلت زنده خواهد شد."
    }
];

document.getElementById('get-fal').addEventListener('click', function() {
    const randomFal = falha[Math.floor(Math.random() * falha.length)];
    
    document.querySelector('.poem').innerHTML = randomFal.poem.replace(/\n/g, '<br>');
    document.querySelector('.taavil').textContent = randomFal.taavil;
    
    const resultDiv = document.getElementById('fal-result');
    resultDiv.classList.add('show');
});