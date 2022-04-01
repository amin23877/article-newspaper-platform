import Link from 'next/link'
import Image from "next/image";

import styles from 'styles/components/layouts/default/Footer.module.scss'
import Download from "./download";
import Facebook from "assets/svg/social-media/facebook.svg";
import Instagram from "assets/svg/social-media/instagram.svg";
import Linkedin from "assets/svg/social-media/linkedin.svg";
import Twitter from "assets/svg/social-media/twitter.svg";
import YouTube from "assets/svg/social-media/youtube.svg";

export default function Footer() {
    const links = [
        {route: '/faq', text: 'سوال های متداول'},
        {route: '/terms-policies', text: 'قوانین و مقررات'},
        {route: '/login', text: 'ورود ناشران'},
        {route: '/contact-us', text: 'تماس با ما'},
        {route: '/about-us', text: 'درباره ما'},
        // {route: '/download', text: 'دانلود اپلیکیشن'},
    ]

    return (
        <div className={styles.footerContainer}>
            <div className='container'>
                <div className={styles.pagesLinkContainer}>
                    {links.map((link, index) => {
                        return (
                            <Link key={index} href={link.route}>
                                <a className={styles.linkItem} style={{width: `${100 / links.length}%`}}>{link.text}</a>
                            </Link>
                        )
                    })}
                </div>
                {/* <div className={styles.downloadsContainer}>
                    <Download classes={styles.downloadItem}/>
                    <Download classes={styles.downloadItem}/>
                    <Download classes={styles.downloadItem}/>
                </div> */}
                <div className={styles.footerDescription}>
                    دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات و مجلات ،مقاله و صوتی به صورت قانونی است.
                </div>
                <div className={styles.socialContainer}>
                    <a href='https://google.com'>
                        <Image src={Instagram} alt=""/>
                    </a>
                    <a href='https://google.com'>
                        <Image src={Twitter} alt=""/>
                    </a>
                    <a href='https://google.com'>
                        <Image src={Linkedin} alt=""/>
                    </a>
                    <a href='https://google.com'>
                        <Image src={Facebook} alt=""/>
                    </a>
                    <a href='https://google.com'>
                        <Image src={YouTube} alt=""/>
                    </a>
                </div>
            </div>
        </div>
    )
}
