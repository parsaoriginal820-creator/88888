// فقط برای اینکه مطمئن بشیم اسکریپت اجرا میشه
alert("اسکریپت لود شد! حالا دکمه فال رو بزن");

function gregorianToJalali(gy,gm,gd){
    let jy=gy-621,gy2=gm>2?gy+1:gy,days=365*gy+Math.floor((gy2+3)/4)-Math.floor((gy2+99)/100)+Math.floor((gy2+399)/400)-80+gd+[0,31,59,90,120,151,181,212,243,273,304,334][gm-1];
    if(gm>2&&((gy%4===0&&gy%100!==0)||gy%400===0))days++;
    let jdays=days-79,jy_cycle=Math.floor(jdays/12053);jdays%=12053;jy+=979+jy_cycle*2820;
    let aux=Math.floor(jdays/1029983);if(aux>0){jy+=aux*33;jdays-=aux*1029983;}
    let y=Math.floor(jdays/366);jdays-=y*366;jy+=y*4;
    let march=[0,31,62,93,124,155,186,216,246,276,306,336],jm=1;
    while(jdays>(march[jm-1]+(jm<=6?31:30)))jm++;
    let jd=jdays-march[jm-2]+(jm===1?0:(jm<=7?30:31));
    return {jy,jm,jd};
}

function updateClock(){
    const n=new Date();
    document.getElementById('second').style.transform=`rotate(${n.getSeconds()*6+90}deg)`;
    document.getElementById('minute').style.transform=`rotate(${n.getMinutes()*6+n.getSeconds()*0.1+90}deg)`;
    document.getElementById('hour').style.transform=`rotate(${n.getHours()%12*30+n.getMinutes()*0.5+90}deg)`;
}
setInterval(updateClock,1000);updateClock();

function generateCalendar(){
    const n=new Date(),j=gregorianToJalali(n.getFullYear(),n.getMonth()+1,n.getDate());
    const months=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    document.getElementById('jalaliMonthYear').textContent=`${months[j.jm-1]} ${j.jy}`;
    document.getElementById('miladiDate').textContent=n.toLocaleDateString('fa-IR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    const daysInMonth=j.jm<=6?31:(j.jm<=11?30:(j.jy%4===3?30:29));
    let html='',day=1;
    for(let i=0;i<6;i++){
        html+='<tr>';
        for(let k=0;k<7;k++){
            if(i===0&&k<new Date(n.getFullYear(),n.getMonth(),1).getDay())html+='<td></td>';
            else if(day<=daysInMonth)html+=`<td ${day===j.jd?'class="today"':''}>${day++}</td>`;
            else html+='<td></td>';
        }
        html+='</tr>';
    }
    document.getElementById('calendarBody').innerHTML=html;
}
generateCalendar();

// ستاره + ابر + صدا + ...
for(let i=0;i<300;i++){
    let s=document.createElement('div');s.className='star';
    s.style.width=s.style.height=Math.random()*3+1+'px';
    s.style.top=Math.random()*100+'%';s.style.left=Math.random()*100+'%';
    document.getElementById('stars').appendChild(s);
}

// فال حافظ — با alert تست می‌کنیم که کلیک میشه یا نه
const falha=[
    {poem:"الا یا ایها الساقی ادر کأساً و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها",taavil:"عشق و آرزوهایت به زودی محقق می‌شود."},
    {poem:"صبح است و ژاله می‌بارد به گلزار اقبال\nبخند ای نرگس مست که داری روز خوش",taavil:"روزگار خوشی در پیش داری."},
    {poem:"دوش از مسجد سوی میخانه آمد پیر ما\nچه جای شگفت، زاهد او شد و ما شدیم می‌پرست",taavil:"تغییرات بزرگ و مثبت در راه است."}
];

document.getElementById('get-fal').addEventListener('click',function(){
    alert("دکمه کار کرد! الان فال میاد"); // اگر این نیومد یعنی دکمه کلیک نمیشه
    const f=falha[Math.floor(Math.random()*falha.length)];
    const poem=document.querySelector('.poem');
    const taavil=document.querySelector('.taavil');
    const card=document.getElementById('fal-result');
    card.classList.remove('show');
    poem.innerHTML=''; taavil.textContent='';
    setTimeout(()=>{
        let i=0;
        const type=()=>{if(i<f.poem.length){poem.innerHTML+=f.poem[i]==='\n'?'<br>':f.poem[i];i++;setTimeout(type,70);}else{taavil.textContent=f.taavil;card.classList.add('show');}};
        type();
    },500);
});