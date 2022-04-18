import Link from "next/link";
import Image from "next/image";

import styles from "styles/components/layouts/default/Footer.module.scss";
import Facebook from "assets/svg/social-media/facebook.svg";
import Instagram from "assets/svg/social-media/instagram.svg";
import Linkedin from "assets/svg/social-media/linkedin.svg";
import Twitter from "assets/svg/social-media/twitter.svg";
import YouTube from "assets/svg/social-media/youtube.svg";
import Text from "components/common/typography/text";

export default function Footer() {
  const links = [
    { route: "/FAQ", text: "سوال های متداول" },
    { route: "/terms-policies", text: "قوانین و مقررات" },
    { route: "/login", text: "ورود ناشران" },
    { route: "/contact-us", text: "تماس با ما" },
    { route: "/about-us", text: "درباره ما" },
    // {route: '/download', text: 'دانلود اپلیکیشن'},
  ];

  return (
    <div className={styles.footerContainer}>
      <div className="container">
        <div className={styles.pagesLinkContainer}>
          {links.map((link, index) => {
            return (
              <Link passHref={true} key={index} href={link.route}>
                <Text
                  size="l"
                  color="white"
                  as={"a"}
                  className={styles.linkItem}
                >
                  {link.text}
                </Text>
              </Link>
            );
          })}
        </div>

        <Text align="center" color="white">
          دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات و مجلات
          ،مقاله و صوتی به صورت قانونی است.
        </Text>

        <div className={styles.socialContainer}>
          <a href="https://google.com">
            <Image src={Instagram} alt="" />
          </a>
          <a href="https://google.com">
            <Image src={Twitter} alt="" />
          </a>
          <a href="https://google.com">
            <Image src={Linkedin} alt="" />
          </a>
          <a href="https://google.com">
            <Image src={Facebook} alt="" />
          </a>
          <a href="https://google.com">
            <Image src={YouTube} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
