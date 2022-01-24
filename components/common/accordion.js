
import { useState } from 'react';

import styles from 'styles/common/Accordion.module.scss'
import Chevron from "assets/svg/common/chevron-right.svg";
import Image from "next/image";

export default function Accordion(props) {
    const [open, toggle] = useState(false);

    return (
        <div className={styles.accordionContainer}>
            <div className={styles.title}>دیجی نشر چیست؟</div>
            {
                !open ?
                    (
                        <div className={styles.description}>
                            دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات ومجلات ،مقاله و صوتی به صورت قانونی است. علاوه بر قانونی بودن، مزیت دیگر دیجی نشر برای مطالعه‌ی نشریات و مجلات استفاده از فرمت epub برای بخش قابل توجهی از مجله هاست. این فرمت بر خلاف فرمت pdf به شما این امکان را می‌دهد که اندازه و نوع فونت را شخصی سازی کنید تا چشمانتان هنگام مطالعه‌ی کتاب آسیب نبیند. همچنین امکان به اشتراک گذاشتن به اشتراک گذاشتن بریده کتاب در طاقچه و یا شبکه‌های اجتماعی قابلیتی است که در نسخه‌ی epub کتاب‌های الکترونیکی وجود دارد.<br /> پادکست در دیجی نشر، عموما صوت هایی هستند که ناشران معتبر صوتی آن‌ها را تهیه می‌کنند. این کتاب‌های صوتی بر خلاف فایل‌های صوتی رایگان موجود در سطح اینترنت، کیفیت صدابرداری خوبی دارند و برای آن‌ها موسیقی پس‌زمینه استفاده شده است. شما می‌توانید در دیجی نشر ...
                        </div>
                    ) :
                    (
                        <div className={styles.description}>
                        دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات ومجلات ،مقاله و صوتی به صورت قانونی است. علاوه بر قانونی بودن، مزیت دیگر دیجی نشر برای مطالعه‌ی نشریات و مجلات استفاده از فرمت epub برای بخش قابل توجهی از مجله هاست. این فرمت بر خلاف فرمت pdf به شما این امکان را می‌دهد که اندازه و نوع فونت را شخصی سازی کنید تا چشمانتان هنگام مطالعه‌ی کتاب آسیب نبیند. همچنین امکان به اشتراک گذاشتن به اشتراک گذاشتن بریده کتاب در طاقچه و یا شبکه‌های اجتماعی قابلیتی است که در نسخه‌ی epub کتاب‌های الکترونیکی وجود دارد. همچنین امکان به اشتراک گذاشتن به اشتراک گذاشتن بریده کتاب در طاقچه و یا شبکه‌های اجتماعی قابلیتی است که در نسخه‌ی epub کتاب‌های الکترونیکی وجود دارد.    <br /> پادکست در دیجی نشر، عموما صوت هایی هستند که ناشران معتبر صوتی آن‌ها را تهیه می‌کنند. این کتاب‌های صوتی بر خلاف فایل‌های صوتی رایگان موجود در سطح اینترنت، کیفیت صدابرداری خوبی دارند و برای آن‌ها موسیقی پس‌زمینه استفاده شده است. شما می‌توانید در دیجی نشر ...
                        </div>
                    )
            }
            <div className={styles.triggerContainer}>
                <div className={`${styles.trigger} ${open ? styles.open : ''}`} onClick={() => {toggle(!open)}}>
                    <Image src={Chevron} alt=""/>
                </div>
            </div>
        </div>
    )
}