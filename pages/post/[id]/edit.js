import cookie from 'cookie'
import axios from 'axios'
import styles from '/styles/pages/EditPost.module.scss';

import { getUserProfile } from 'shared/users'
import { Endpoints } from 'utils/endpoints'
import Link from 'next/link';
import { useState } from 'react';
import { api } from 'axios/api';
const EditContent = ({ post, tags }) => {
    const [title, setTitle] = useState(post.title)
    const [textarea, setTextarea] = useState(post.description)
    const [subjects, setSubjects] = useState([])
    const [price, setPrice] = useState(post.price)
    const [paymentType, setPaymentType] = useState(post.paymentType[0])
    const changeTitle = (e) => setTitle(e.target.value)
    const changeTextarea = (e) => setTextarea(e.target.value)
    const changePrice = (e) => setPrice(e.target.value)

    console.log(post)

    function onSubjectSelect(val) {
        if (!subjects.some(p => p === val)) {
            setSubjects([...subjects, val])
        } else {
            const index = subjects.indexOf(val);
            if (index > -1) {
                let tmp = subjects;
                tmp.splice(index, 1); // 2nd parameter means remove one item only
                setSubjects([...tmp])
            }

        }

    }

    const handleEditPost = async () => {
        api.put(`/post/${post._id}`, {
            title: title,
            description: textarea,
            tags: subjects,
            paymentType: [paymentType],
            price: price

        }).then((resp) => {
            alert('پست با موفقیت ویرایش شد')
        });
    }

    return (
        <div className={styles.editContainer}>
            <Link href={'/'} ><a className={styles.backBtn}>بازگشت به مرحله قبل</a></Link>
            <h2>ویرایش محتوا</h2>
            {(post?.files && post?.files[0]?.fileType) &&
                <div className={styles.fileContainer}>
                    {post?.files[0]?.fileType === 'image' ?
                        <div className={styles.postImageContainer}>
                            <img style={{ width: '100%' }} src={post?.files[0]?.url} alt="" />
                        </div>
                        :
                        post?.files[0]?.fileType === 'pdf' ?

                            <embed
                                src={post?.files[0]?.url}
                                type="application/pdf"
                                frameBorder="0"
                                scrolling="auto"
                                height="324px"
                                width="697"
                            ></embed>
                            :
                            post?.files[0]?.fileType === 'video' ?
                                <video width="320" height="240" controls>
                                    <source src={post?.files[0]?.url} type="video/mp4" />
                                </video>
                                :
                                <audio controls>
                                    <source src={post?.files[0]?.url} type="audio/mp3" />

                                </audio>}
                </div>
            }
            <p className={styles.contentTitle}>{post.title}</p>
            <div className={styles.formContainer}>
                <h3>جزئیات</h3>
                <div className={styles.formGroup}>
                    <p>عنوان:</p>
                    <input onChange={changeTitle} value={title} />
                </div>
                <div className={styles.formGroup}>
                    <p>توضیحات:</p>
                    <textarea onChange={changeTextarea}>{textarea}</textarea>
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.selectContainer}>
                        <select name="" id="" onChange={(e) => { onSubjectSelect(e.target.value) }}>
                            {
                                tags.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.subjectsContainer}>
                        {
                            subjects?.map((item, index) => {
                                return (
                                    <div onClick={() => onSubjectSelect(item)} key={index} className={styles.subject}>{tags.find(p => p._id === item).title}</div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className={`${styles.formContainer} ${styles.mt16}`}>
                <h3>حق نشر</h3>
                <div className={styles.formGroup}>
                    <p>اشتراک محتوا</p>
                    <div className={styles.selectContainer} style={{ width: '100%' }}>
                        <select name="" id="" value={paymentType} onChange={(e) => { setPaymentType(e.target.value) }}>


                            <option value={'free'}>رایگان</option>
                            <option value={'subscription'}>خرید اشتراک</option>
                            <option value={'payment'}>پرداخت هزینه</option>


                        </select>
                    </div>

                </div>
                <div className={styles.formGroup}>
                    <p>هزینه اشتراک محتوا:</p>
                    <input onChange={changePrice} value={price} />
                </div>

            </div>
            <button className={styles.submitBtn} onClick={() => handleEditPost()}>تایید نهایی</button>

        </div>
    )
}

export default EditContent;

export async function getServerSideProps(context) {

    const { accessToken } = cookie.parse(context.req.headers.cookie ?? '')

    if (!accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    try {
        const { data: { data: { me } } } = await getUserProfile(accessToken)

        if (!me) {
            console.log('meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        const postInfo = await axios.get(`${Endpoints.baseUrl}/post/single/${context.params.id}`, {
            headers: {
                authorization: accessToken
            }
        })

        const tags = await axios.get(Endpoints.baseUrl + '/post/tags', {
            headers: {
                authorization: accessToken
            }
        })


        return {
            props: {
                post: postInfo.data.data.post,
                tags: tags.data.data.tags,
            }
        }

    }
    catch (e) {
        console.log('eeeeeeeeeeeeeeeeeeeeeeee', embed)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}
