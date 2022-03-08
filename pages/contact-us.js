import React from 'react';
import Layout from "layouts/default";

import styles from 'styles/pages/ContactUs.module.scss';
import Text from "components/common/text";

function ContactUs() {
    return (
        <div className={styles.container}>
            <Text className={styles.title} component='h1' color='primary' size='l' weight='bold'>تماس با ما</Text>

            <div className={styles.card}>
                <Text component='h3' size='l' weight='bold' color='black'>اطلاعات تماس</Text>

                <Text size='sm'> تلفن پشتیبانی : 09999999999</Text>
                <Text size='sm'>آدرس : تهران یه جایی</Text>
                <Text size='sm'>ایمیل : info@fake.com</Text>

                <Text size='sm' component='div'>
                    ساعات کاری :
                    <p>شنبه تا چهارشنبه: </p>
                    <p>پنجشنبه ها: </p>
                    <p>جمعه ها: </p>
                </Text>
            </div>
        </div>
    );
}

ContactUs.getLayout = function (page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default ContactUs;