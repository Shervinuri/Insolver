export const initialReportHTML = `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تحلیل مسدودیت پیج اینستاگرام</title>
    <!-- افزودن فونت مدرن وزیرمتن -->
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <style>
        /* تنظیمات ریشه و اسکرول نرم */
        html {
            font-size: 16px;
            scroll-behavior: smooth;
            /* پس‌زمینه کلی صفحه (مشکی) */
            background-color: #121212; 
        }

        body {
            font-family: 'Vazirmatn', Tahoma, Arial, sans-serif; /* استفاده از فونت مدرن */
            line-height: 1.8;
            margin: 40px auto; /* فاصله از بالا و پایین و وسط‌چین کردن */
            padding: 30px; /* فاصله داخلی */
            background-color: #1e1e1e; /* رنگ پس‌زمینه اصلی محتوا (طوسی تیره) */
            color: #e0e0e0; /* رنگ متن اصلی (سفید مایل به طوسی) */
            max-width: 900px;
            border-radius: 12px; /* گرد کردن گوشه‌های کادر اصلی */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* سایه عمیق‌تر */
            direction: rtl;
            text-align: right;
            border: 1px solid #333; /* یک حاشیه ظریف */
        }

        /* استایل عناوین */
        h1, h2, h3 {
            color: #ffffff; /* رنگ سفید خالص */
            text-align: center;
            line-height: 1.4;
        }

        /* اعمال گرادیانت درخواستی روی عنوان اصلی */
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            /* گرادیانت از سفید به طوسی */
            background: linear-gradient(to bottom, #ffffff, #b0b0b0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0 1px 3px rgba(0,0,0,0.4); /* سایه متن برای خوانایی */
        }
        
        h2 {
            border-bottom: 1px solid #444;
            padding-bottom: 10px;
        }

        /* استایل لینک‌ها */
        a {
            color: #b0b0b0; /* طوسی روشن */
            text-decoration: underline;
            transition: color 0.3s ease;
        }
        a:hover {
            color: #ffffff;
        }

        /* استایل تصاویر */
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 25px auto;
            border: 1px solid #444; /* حاشیه طوسی */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* سایه */
            border-radius: 8px; /* گرد کردن گوشه‌های عکس */
        }

        /* کادر پیام اینستاگرام (طوسی) */
        .instagram-message {
            background-color: #2a2a2a; /* پس‌زمینه طوسی تیره‌تر */
            border-right: 5px solid #777; /* حاشیه سمت راست (طوسی متوسط) */
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            color: #e0e0e0;
        }
        
        .instagram-message h3 {
            color: #ffffff; /* رنگ سفید */
            margin-top: 0;
            border-bottom: none; /* حذف خط زیر h3 در این کادر */
            padding-bottom: 0;
        }

        /* کادر توصیه (طوسی) */
        .recommendation {
            background-color: #333; /* پس‌زمینه طوسی متوسط */
            border-right: 5px solid #aaa; /* حاشیه سمت راست (طوسی روشن) */
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            color: #e0e0e0;
        }
        .recommendation h3 {
            color: #ffffff;
            margin-top: 0;
            border-bottom: none;
            padding-bottom: 0;
        }

        /* انیمیشن برای افکت بازتاب نور */
        @keyframes shine-effect {
            0% {
                transform: translateX(-150%) skewX(-25deg);
            }
            100% {
                transform: translateX(150%) skewX(-25deg);
            }
        }

        /* کادر نکته نهایی (گلس‌مورفیسم زرد) */
        .final-note {
            position: relative; /* برای جای‌گیری شبه‌عنصر */
            overflow: hidden; /* مخفی کردن بازتاب نور خارج از کادر */
            background: rgba(255, 223, 186, 0.1); /* پس‌زمینه شیشه‌ای زرد ملایم */
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 223, 186, 0.18); /* حاشیه روشن */
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            font-weight: bold;
            color: #f5f5f5; /* رنگ متن روشن برای خوانایی */
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        
        /* شبه‌عنصر برای ایجاد بازتاب نور */
        .final-note::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%);
            transform: translateX(-150%) skewX(-25deg);
            animation: shine-effect 4s infinite 2s; /* ۴ ثانیه اجرا، تکرار بی‌نهایت، با ۲ ثانیه تاخیر اولیه */
        }

         .final-note h3 {
            color: #ffffff; /* متن سفید */
            margin-top: 0;
            border-bottom: none;
            padding-bottom: 0;
        }
        
        /* کلاس برای ریسپانسیو کردن جدول */
        .table-responsive {
            overflow-x: auto; /* اسکرول افقی فقط در صورت نیاز */
            margin: 30px 0;
            border: 1px solid #444;
            border-radius: 8px; /* گرد کردن گوشه کانتینر جدول */
        }

        /* استایل جدول */
        table {
            width: 100%;
            min-width: 700px; /* یک حداقل عرض برای جدول تا اسکرول فعال شود */
            border-collapse: collapse; /* ادغام حاشیه‌ها */
        }

        th, td {
            border: 1px solid #444; /* حاشیه‌های داخلی طوسی */
            padding: 12px 15px; /* پدینگ */
            text-align: right;
            vertical-align: top;
        }

        /* سربرگ جدول */
        th {
            background-color: #333; /* پس‌زمینه تیره‌تر برای سربرگ */
            color: #ffffff; /* متن سربرگ */
            font-weight: 600;
        }
        
        /* حذف حاشیه تکراری برای سلول‌های اول و آخر */
        th:first-child, td:first-child { border-right-width: 0; }
        th:last-child, td:last-child { border-left-width: 0; }
        tr:first-child th { border-top-width: 0; }
        tr:last-child td { border-bottom-width: 0; }
        

        /* افکت هاور روی ردیف‌های جدول */
        tbody tr:hover {
            background-color: #2a2a2a; /* هایلایت ردیف */
        }

        /* فوتر */
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 0.9em;
            color: #888; /* رنگ خاکستری روشن‌تر */
        }

        /* استایل سفارشی اسکرول‌بار */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #1e1e1e; /* پس‌زمینه ترک همرنگ بدنه */
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #555; /* رنگ خود اسکرول */
            border-radius: 10px;
            border: 2px solid #1e1e1e; /* ایجاد فاصله از لبه */
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #777; /* رنگ هاور اسکرول */
        }

        /* --- بخش ریسپانسیو --- */
        @media (max-width: 768px) {
            body {
                margin: 20px auto; /* کاهش حاشیه در موبایل */
                padding: 20px; /* کاهش پدینگ در موبایل */
            }
            h1 {
                font-size: 2rem; /* کاهش اندازه عنوان اصلی */
            }
            h2 {
                font-size: 1.5rem;
            }
            th, td {
                padding: 10px; /* پدینگ کمتر در جدول برای موبایل */
            }
        }
        
        @media (max-width: 480px) {
             body {
                margin: 10px auto;
                padding: 15px;
            }
            h1 {
                font-size: 1.8rem;
            }
            h2 {
                font-size: 1.3rem;
            }
        }

    </style>
</head>
<body>

    <h1>تحلیل و بررسی مسدودیت پیج اینستاگرام</h1>

    <h2>پیام اخطار دریافتی از اینستاگرام</h2>
    <!-- تصویر با استایل جدید -->
    <img src="https://i.ibb.co/ZpWT5t0x/x.jpg" alt="پیام اخطار اینستاگرام">

    <!-- کادر پیام با استایل جدید (طوسی) -->
    <div class="instagram-message">
        <h3>ترجمه فارسی پیام:</h3>
        <p><strong>حساب شما را غیرفعال کردیم</strong></p>
        <p>شما دیگر به حساب hostel.irani.dubai دسترسی ندارید. حساب در تاریخ ۲۶ سپتامبر ۲۰۲۵ غیرفعال شده است.</p>
        
        <p><strong>چرا این اتفاق افتاد؟</strong><br>
        ما محتوایی را که شما به اشتراک گذاشتید بررسی کردیم و متوجه شدیم که **همچنان** از استانداردهای جامعه ما پیروی نمی‌کند. <a href="#">بیشتر در مورد این قانون بخوانید.</a></p>
        
        <p><strong>این به چه معناست؟</strong><br>
        هیچ کس نمی‌تواند حساب شما را ببیند یا پیدا کند و شما نمی‌توانید از آن استفاده کنید. تمام اطلاعات شما برای همیشه حذف خواهد شد. شما **نمی‌توانید درخواست بازبینی مجدد این تصمیم را بدهید.**</p>
        
        <p><strong>چه کاری می‌توانید انجام دهید؟</strong><br>
        می‌توانید اطلاعات خود را دانلود کنید تا یک کپی از آنچه در اینستاگرام به اشتراک گذاشته‌اید داشته باشید.</p>
        
        <p><strong>اطلاعات بیشتر:</strong><br>
        چگونگی اتخاذ این تصمیم.</p>
    </div>

    <p>با توجه به آنالیز صورت گرفته و پیام دریافتی از اینستاگرام، دلایل قطعی مسدودیت پیج توسط اینستاگرام به علت وجود محتوای زیر (به ترتیب اولویت) به صورت محرز در پست‌ها می‌باشد:</p>

    <h2>جدول محتوای ناقض قوانین و دلایل مسدودیت</h2>
    
    <!-- کانتینر ریسپانسیو برای جدول -->
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>عنوان محتوا (یا موضوع پست)</th>
                    <th>قانون نقض شده اینستاگرام</th>
                    <th>توضیح اینکه چرا اینستاگرام این محتوا را مسدود می‌کند</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>"صدور ویزای دبی"</strong> (در بیو و پست‌ها)</td>
                    <td><strong>۱. کالاها و خدمات تحت نظارت (Regulated Goods)</strong><br><strong>۲. کلاهبرداری و فریب (Fraud & Deception)</strong></td>
                    <td>اینستاگرام تبلیغ یا ارائه خدمات مربوط به اسناد رسمی دولتی (مانند ویزا و پاسپورت) را به دلیل ریسک بسیار بالای کلاهبرداری، به شدت محدود یا ممنوع می‌کند.</td>
                </tr>
                <tr>
                    <td><strong>"ثبت شرکت"</strong> (در بیو و هایلایت)</td>
                    <td><strong>۱. کالاها و خدمات تحت نظارت (Regulated Goods)</strong><br><strong>۲. کلاهبرداری و فریب (Fraud & Deception)</strong></td>
                    <td>این نیز یک فرآیند رسمی و قانونی است. الگوریتم‌های اینستاگرام نمی‌توانند بین یک سرویس قانونی و یک کلاهبرداری برای ثبت شرکت‌های صوری تفاوت قائل شوند، بنابراین هر دو را مسدود می‌کنند.</td>
                </tr>
                <tr>
                    <td><strong>"ویزای طلایی دبی"</strong> (پست)</td>
                    <td><strong>۱. کالاها و خدمات تحت نظارت (Regulated Goods)</strong><br><strong>۲. کلاهبرداری و فریب (Fraud & Deception)</strong></td>
                    <td>این مورد هم دقیقاً در دسته "خدمات مهاجرتی" قرار می‌گیرد که از نظر اینستاگرام جزو حساس‌ترین و پرخطرترین موضوعات برای تبلیغ است.</td>
                </tr>
                <tr>
                    <td><strong>"چطوری ارز مسافرتی بگیریم؟"</strong> (پست)</td>
                    <td><strong>۱. کلاهبرداری و فریب (Fraud & Deception)</strong><br><strong>۲. کالاها و خدمات تحت نظارت (Regulated Goods)</strong></td>
                    <td>هرگونه محتوای مرتبط با خدمات مالی، تبادل ارز، یا "به دست آوردن پول" (حتی اگر قانونی باشد) به دلیل پتانسیل بالای کلاهبرداری مالی و پولشویی، به شدت رصد و محدود می‌شود.</td>
                </tr>
                <tr>
                    <td><strong>"مالیات خریدت رو پس بگیر"</strong> (VAT Refund)</td>
                    <td><strong>کلاهبرداری و فریب (Fraud & Deception)</strong></td>
                    <td>این مورد نیز در دسته "مشاوره‌های مالی" و "راه‌های کسب درآمد" قرار می‌گیرد. اینستاگرام با این نوع محتواها بسیار سخت‌گیرانه برخورد می‌کند.</td>
                </tr>
                 <tr>
                    <td><strong>"اگر پاسپورت گم شد"</strong> (پست)</td>
                    <td><strong>کلاهبرداری و فریب (Fraud & Deception)</strong></td>
                    <td>اگرچه نیت کمک بوده، اما این موضوع مستقیماً با اسناد هویتی رسمی سروکار دارد. الگوریتم ممکن است این را به عنوان تلاشی برای جعل، دور زدن سیستم‌های رسمی یا کلاهبرداری مرتبط با اسناد شناسایی پرچم‌گذاری (Flag) کند.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- کادر توصیه با استایل جدید (طوسی) -->
    <div class="recommendation">
        <h3>توصیه برای پیج جدید:</h3>
        <p>به شدت توصیه می‌شود که در پیج جدید خود، از آوردن مستقیم این محتواها (مخصوصاً در بنرها، فریم اول ریلز/پست و کپشن‌های اصلی) خودداری کنید. به جای آن، می‌توانید روی جنبه‌های جذاب زندگی در دبی، مناطق دیدنی، فرهنگ، یا تجربیات افراد تمرکز کنید و راهنمایی برای خدمات را به صورت غیرمستقیم (مثلاً با لینک به وب‌سایت یا درخواست دایرکت/واتس‌اپ) ارائه دهید.</p>
    </div>

    <!-- کادر نکته نهایی با استایل جدید (هشدار معکوس) -->
    <div class="final-note">
        <h3>نکته بسیار مهم</h3>
        <p>متأسفانه، بر اساس پیام اینستاگرام، پرونده برای اینستاگرام بسته تلقی شده و هیچ راه بازگشتی به پیج مسدود شده وجود ندارد. تلاش برای بازگرداندن آن بی‌نتیجه خواهد بود.</p>
    </div>

    <!-- فوتر با استایل جدید -->
    <div class="footer">
        <p>Exclusive SHΞN™ made</p>
    </div>

</body>
</html>
`;