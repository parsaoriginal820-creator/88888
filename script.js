// ستاره‌ها
for(let i=0;i<450;i++){
    let s=document.createElement('div');
    s.className='star';
    s.style.width=s.style.height=(Math.random()*3+1)+'px';
    s.style.top=Math.random()*100+'%';
    s.style.left=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*4+'s';
    document.getElementById('stars').appendChild(s);
}

// ساعت آنالوگ
function updateClock(){
    const n=new Date();
    const s=n.getSeconds()*6;
    const m=n.getMinutes()*6 + s/60;
    const h=(n.getHours()%12)*30 + m/12;
    document.getElementById('second').style.transform=`rotate(${s+90}deg)`;
    document.getElementById('minute').style.transform=`rotate(${m+90}deg)`;
    document.getElementById('hour').style.transform=`rotate(${h+90}deg)`;
}
setInterval(updateClock,1000);updateClock();

// تقویم شمسی
function toJalali(gy,gm,gd){
    let jy=gy-621,g2=gm>2?gy+1:gy,d=365*gy+Math.floor((g2+3)/4)-Math.floor((g2+99)/100)+Math.floor((g2+399)/400)-80+gd+[0,31,59,90,120,151,181,212,243,273,304,334][gm-1];
    if(gm>2&&((gy%4==0&&gy%100!=0)||gy%400==0))d++;
    let jdays=d-79,jc=Math.floor(jdays/12053);jdays%=12053;jy+=979+jc*2820;
    let y=Math.floor(jdays/366);jdays-=y*366;jy+=y*4;
    let jm=1;while(jdays>(jm<=6?31:30)){jdays-=jm<=6?31:30;jm++;}
    return {jy,jm,jd:jdays+1};
}
const now=new Date();
const j=toJalali(now.getFullYear(),now.getMonth()+1,now.getDate());
const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
document.getElementById('jalaliDate').textContent=`${j.jd} ${months[j.jm-1]} ${j.jy}`;

const firstDay=new Date(now.getFullYear(),now.getMonth(),1).getDay();
const daysInMonth=j.jm<=6?31:(j.jm<=11?30:(j.jy%4==0?30:29));
let html='',day=1;
for(let i=0;i<6;i++){
    html+='<tr>';
    for(let k=0;k<7;k++){
        if(i==0&&k<firstDay)html+='<td></td>';
        else if(day<=daysInMonth)html+=`<td ${day===j.jd?'class="today"':''}>${day++}</td>`;
        else html+='<td></td>';
    }
    html+='</tr>';if(day>daysInMonth)break;
}
document.getElementById('calendarBody').innerHTML=html;

// فال حافظ
const falha=[
    {poem:"الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها",taavil:"عشق و آرزوهایت به زودی محقق می‌شود"},
    {poem:"صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش",taavil:"روزگار خوشی در پیش داری"},
    {poem:"دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت زاهد او شد و ما شدیم می‌پرست",taavil:"تغییرات بزرگ و مثبت در راه است"},
    {poem:"هر کسی را که عشق نیست دلش مرده است\nعشق دریایی است که به این راحتی کسی را غرق نمی‌کند",taavil:"عشق واقعی در راه است"},
    {poem:"بیا که رونق این کارخانهٔ عشقباز است\nبه یاد شاه شجاع ما رندی و عشرت کنیم",taavil:"شادی و موفقیت در پیش است"}
];

document.getElementById('get-fal').onclick = function(){
    const f = falha[Math.floor(Math.random() * falha.length)];
    const poem = document.querySelector('.poem');
    const taavil = document.querySelector('.taavil');
    const card = document.getElementById('fal-result');

    poem.innerHTML = '';
    taavil.textContent = '';
    card.style.display = 'none';

    setTimeout(() => {
        card.style.display = 'block';
    }, 100);

    let i = 0;
    function type(){
        if(i < f.poem.length){
            poem.innerHTML += f.poem[i] === '\n' ? '<br>' : f.poem[i];
            i++;
            setTimeout(type, 80);
        } else {
            taavil.textContent = f.taavil;
        }
    }
    type();
};