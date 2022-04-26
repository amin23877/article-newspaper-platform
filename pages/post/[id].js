import styles from "/styles/pages/Post.module.scss";
import Ad from "assets/images/post/advertisement.png";
import Image from "next/image";
import Link from "next/link";
import MockUser from "assets/images/contact/mock-avatar.png";
import MockAvatar from "assets/images/mock-avatar.png";
import Button from "components/common/button";
import GoldPlan from "assets/images/contact/gold-plan.svg";
import Close from "assets/images/post/close.svg";
import Heart from "assets/svg/common/heart.svg";
import HeartFilled from "assets/svg/common/heart-filled.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import ThumbUp from "assets/images/post/thumb-up.svg";
import ThumbDown from "assets/images/post/thumb-down.svg";
import DotsVertical from "assets/images/post/dots-vertical.svg";
import Bell from "assets/images/post/bell.svg";
import Send from "assets/images/post/send.svg";
import MockNews from "assets/images/953473320video.png";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import cookie from "cookie";
import { useSelector } from "react-redux";
import defaultProfile from "assets/images/profile/default-profile-img.svg";

export default function Post({ postInfo }) {
  const router = useRouter();
  const { type, id } = router.query;
  const [user, getUser, hasInitialized, memberType] = useUser();
  const [showAd, setShowAd] = useState(true);
  const [packages, setPackages] = useState();
  const [comments, setComments] = useState();
  const [commentText, setCommentText] = useState("");
  const [likesCount, setLikesCount] = useState(postInfo.likesCount);
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState();
  const [posts, setPosts] = useState();

  const profilePic = useSelector(
    (state) => state.users.userInfo.profilePicture
  );

  useEffect(() => {
    getUser();
    getPackages();
    getComments();
    getPost();
    getFeed();
    return;
  }, []);

  const getPackages = async () => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);

      let p = await axios.get(Endpoints.baseUrl + "/payment/packages", {
        headers: {
          authorization: accessToken,
        },
      });
      setPackages(p.data.data.packages);
    } catch (e) {
      // alert('برای مشاهده پست ابتدا لاگین کنید یا حامی شوید')
    }
  };
  const getPost = async () => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);

      let p = await axios.get(
        Endpoints.baseUrl + "/post/single/" + postInfo._id,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setPost(p.data.data.post);
    } catch (e) {
      alert("برای مشاهده پست ابتدا لاگین کنید یا حامی شوید");
    }
  };

  const getFeed = async () => {
    const { accessToken } = cookie.parse(document?.cookie);

    const tPosts = await axios.get(Endpoints.baseUrl + "/post/me/posts", {
      headers: {
        authorization: accessToken,
      },
    });
    setPosts(tPosts.data.data.posts);
  };

  const getComments = async () => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);

      let p = await axios.get(
        Endpoints.baseUrl +
          `/post/comments/${postInfo._id}?start=0&limit=10&sortBy=createdAt&sortOrder=-1`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setComments(p.data.data.comments);
    } catch (e) {
      alert("برای مشاهده کامنت ها ابتدا لاگین کنید یا حامی شوید");
    }
  };
  const addComment = async () => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);

      let p = await axios.post(
        Endpoints.baseUrl + `/post/comment/${postInfo._id}`,
        {
          text: commentText,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setComments(p.data.data.comments);
    } catch (e) {
      alert("برای ثبت کامنت ابتدا حامی شوید");
    }
  };

  const closeAd = () => {
    setShowAd(false);
  };

  const latestPosts = [
    {
      image: MockNews,
      title: "مطالعات کارشناسی ارشد سینمایی - رنگ و فرم",
      time: "11 ساعت پیش",
      description:
        "منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار",
      likeCount: 22,
      commentCount: 12,
    },
    {
      image: MockNews,
      title: "عنوان",
      time: "11 ساعت پیش",
      description:
        "منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار",
      likeCount: 22,
      commentCount: 12,
    },
    {
      image: MockNews,
      title: "عنوان",
      time: "11 ساعت پیش",
      description:
        "منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار",
      likeCount: 22,
      commentCount: 12,
    },
    {
      image: MockNews,
      title: "عنوان",
      time: "11 ساعت پیش",
      description:
        "منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار",
      likeCount: 22,
      commentCount: 12,
    },
    {
      image: MockNews,
      title: "عنوان",
      time: "11 ساعت پیش",
      description:
        "منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار",
      likeCount: 22,
      commentCount: 12,
    },
  ];

  const renderTime = (post) => {
    var updated_at = Math.floor(new Date(post.updatedAt).getTime() / 1000);
    var now = Math.floor(Date.now() / 1000);
    var diff = Math.abs(now - updated_at);
    if (diff < 60) {
      return `${diff} ثانیه پیش`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} دقیقه پیش`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} ساعت پیش`;
    } else {
      return `${Math.floor(diff / 86400)} روز پیش`;
    }
  };

  const handleLikePost = async (pid, like = true) => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);

      if (like) {
        await axios.post(
          Endpoints.baseUrl + "/post/like/" + pid,
          {},
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        await axios.delete(Endpoints.baseUrl + "/post/like/" + pid, {
          headers: {
            authorization: accessToken,
          },
        });
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
      loadPost();
    } catch (e) {
      console.log(e);
      if (like) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      // handleLikePost(!like)
    }
  };

  return (
    <div className={styles.postPageContainer}>
      <div className={styles.rightCol}>
        <div className={styles.ad}>
          {showAd ? (
            <>
              <Image src={Ad} alt="" />
              <div className={styles.closeAd} onClick={() => closeAd()}>
                <Image src={Close} alt="" />
              </div>
            </>
          ) : null}
        </div>
        <div className={styles.profileContainer}>
          <Link href={`/user/${postInfo.user._id}`} passHref>
            <a>
              <div className={styles.avatarContainer}>
                <Image src={MockUser} alt="avatar" />
              </div>
              <div className={styles.name}>{postInfo.user.username}</div>
            </a>
          </Link>

          {memberType !== "" ? null : (
            <>
              <Link
                href={`/user/${postInfo.user._id}/purchase/${postInfo._id}`}
                passHref
              >
                <Button classes={styles.joinButton} variant="filled">
                  <span>حامی شوید</span>
                </Button>
              </Link>

              <div className={styles.rightColContainer}>
                <div className={styles.membershipHeader}>اشتراک ها</div>
                {packages &&
                  packages.map((pack, i) => (
                    <Link
                      key={i}
                      href={`/user/${postInfo.user._id}/purchase/${postInfo._id}`}
                      passHref
                    >
                      <a>
                        <div className={styles.membership}>
                          <div className={styles.membershipImage}>
                            <Image src={GoldPlan} alt="gold-plan" />
                          </div>
                          <div className={styles.membershipText}>
                            <div>{pack.title}</div>
                            <div className={styles.membershipSubtitle}>
                              {pack.defaultPrice} تومان ماهیانه
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
              </div>
              <div className={styles.rightColContainer}>
                <div className={styles.membershipHeader}>آخرین محتواها</div>
                {posts?.map((post, index) => {
                  return (
                    <Link key={index} href={`/post/${post._id}`} passHref>
                      <a>
                        <div key={index} className={styles.sidePost}>
                          <div className={styles.postImage}>
                            {post.coverImage?.url && (
                              <Image
                                src={post.coverImage?.url}
                                width="47px"
                                height="40px"
                                alt=""
                              />
                            )}
                          </div>
                          <div className={styles.postText}>
                            <div className={styles.postTitle}>{post.title}</div>
                            <div className={styles.postTime}>
                              {renderTime(post)}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.leftCol}>
        {post?.files && post?.files[0]?.fileType && (
          <>
            {post?.files[0]?.fileType === "image" ? (
              <div className={styles.postImageContainer}>
                <img
                  style={{ width: "100%" }}
                  src={post?.files[0]?.url}
                  alt=""
                />
              </div>
            ) : post?.files[0]?.fileType === "pdf" ? (
              <embed
                src={post?.files[0]?.url}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="610px"
                width="667px"
              ></embed>
            ) : post?.files[0]?.fileType === "video" ? (
              <video width="320" height="240" controls>
                <source src={post?.files[0]?.url} type="video/mp4" />
              </video>
            ) : (
              <audio controls>
                <source src={post?.files[0]?.url} type="audio/mp3" />
              </audio>
            )}
          </>
        )}
        <div className={styles.videoText}>
          <div className={styles.postTitle}>{postInfo.title}</div>
          <div className={styles.postTime}>{renderTime(postInfo)}</div>
        </div>
        {/* <div className={styles.members}>756 مشترک</div> */}
        <div className={styles.videoButtons}>
          <div className={styles.actions}>
            <div
              className={styles.like}
              onClick={() => handleLikePost(postInfo._id, !liked)}
            >
              <div className={styles.icon}>
                <Image src={liked ? HeartFilled : Heart} alt="" />
              </div>
              <div className={styles.count}>{likesCount}</div>
            </div>
            <div className={styles.comment}>
              <div className={styles.icon}>
                <Image src={Comment} alt="" />
              </div>
              <div className={styles.count}>{postInfo.commentsCount}</div>
            </div>
          </div>
          <div className={styles.more}>
            <div>
              <Image src={Bell} alt="" />
            </div>
            <div>
              <Image src={DotsVertical} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.lightLine}></div>
        <div className={styles.description}>{postInfo.description}</div>
        <div>{`${postInfo.commentsCount} نظر`}</div>
        <div className={styles.newComment}>
          <div className={styles.commentAvatar}>
            <Image
              layout="fill"
              objectFit="cover"
              src={profilePic.url ?? defaultProfile}
              alt=""
            />
          </div>
          <div className={styles.userNewComment}>
            <div onClick={addComment} className={styles.sendBtn}>
              <Image src={Send} alt="" />
            </div>
            <input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              type="text"
              placeholder="دیدگاه خود را وارد نمایید ..."
            />
          </div>
        </div>
        {comments &&
          comments.map((comment, index) => {
            return (
              <div key={index} className={styles.comment}>
                <div className={styles.commentAvatar}>
                  <Image src={comment.user} alt="" />
                </div>
                <div className={styles.commentTexts}>
                  <div className={styles.userAndTime}>
                    <div>{comment.username}</div>
                    <div className={styles.commentTime}>{comment.time}</div>
                  </div>
                  <div className={styles.commentText}>{comment.text}</div>
                  <div className={styles.thumbs}>
                    <div>
                      <Image src={ThumbUp} alt="" />
                    </div>
                    <div>
                      <Image src={ThumbDown} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps(context) {
  try {
    const pageInfo = await axios.get(
      `${Endpoints.baseUrl}/post/single/${context.params.id}`
    );
    return {
      props: {
        postInfo: pageInfo.data.data.post,
      }, // will be passed to the page component as props
    };
  } catch (e) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeee", e);

    return {
      props: {
        postInfo: null,
      }, // will be passed to the page component as props
    };
  }
}
