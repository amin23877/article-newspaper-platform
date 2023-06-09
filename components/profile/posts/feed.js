import styles from "styles/components/profile/posts/Feed.module.scss";
import MoreOptions from "assets/svg/common/more-options.svg";
import Heart from "assets/svg/common/heart.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import MockNews from "assets/images/953473320video.png";
import { useState } from "react";
import Popup from "components/common/popup";
import Button from "components/common/button";
import TrashIcon from "../../../assets/svg/popup/trash.svg";
import EyeOffIcon from "../../../assets/svg/popup/eye-off.svg";
import EditIcon from "../../../assets/svg/popup/edit.svg";
import ShareIcon from "../../../assets/svg/popup/share.svg";
import CommentsIcon from "../../../assets/svg/popup/comments.svg";
import LockIcon from "../../../assets/svg/popup/lock.svg";
import PaidLockIcon from "../../../assets/images/contact/lock.svg";

export default function FeedPost({
  paid,
  memberType,
  paymentType,
  postProp,
  hidePost,
  sharePost,
  deletePost,
  banComments,
  ...rest
}) {
  const popupItems = [
    {
      text: "حذف",
      icon: TrashIcon,
      action: () => {
        deletePost(postProp._id);
        setShowPopup(false);
      },
    },
    {
      text: "لغو نمایش",
      icon: EyeOffIcon,
      action: () => {
        hidePost(postProp._id);
        setShowPopup(false);
      },
    },
    {
      text: "ویرایش",
      icon: EditIcon,
      action: () => {},
      link: `/post/${postProp._id}/edit`,
    },
    {
      text: "به اشتراک گذاشتن",
      icon: ShareIcon,
      action: () => {
        sharePost(postProp._id);
        setShowPopup(false);
      },
    },
    {
      text: `${
        postProp.postPermissions.indexOf("comment") === -1 ? "باز کردن" : "بستن"
      } نظرات`,
      icon: CommentsIcon,
      action: () => {
        banComments(postProp);
        setShowPopup(false);
      },
    },
    {
      text: "حق نشر",
      icon: LockIcon,
      action: () => {},
    },
  ];

  const post = {
    image: MockNews,
    title: postProp.title,
    time: "11 ساعت پیش",
    description: postProp.description,
    likeCount: postProp.likesCount,
    commentCount: postProp.commentsCount,
    updatedAt: postProp.updatedAt,
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (paid) {
      if (paymentType != memberType) {
        setShowContent(false);
      } else {
        setShowContent(true);
      }
    }
  }, [memberType]);

  const renderTime = () => {
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

  return (
    <Link
      href={{
        pathname: "/post/" + postProp._id,
        query: { type: rest.type },
      }}
    >
      <div className={styles.postContainer}>
        <div className={styles.mediaPlaceHolder}>
          <div
            className={`${styles.imageItem} ${
              !showContent ? styles.paidImageItem : ""
            }`}
          >
            <Image
              className={styles.cover}
              loader={() => postProp.coverImage?.url || MockNews}
              layout="fill"
              objectFit="cover"
              src={postProp.coverImage?.url || MockNews}
              alt=""
            />
            {paid && !(paymentType === memberType) ? (
              <div className={styles.paidImageContent}>
                <div className={styles.paidLock}>
                  <Image src={PaidLockIcon} alt="" />
                </div>
                <div>قفل این محتوا را با تبدیل شدن به یک حامی باز کنید.</div>
                <Button variant="outline" classes={styles.donateButton}>
                  <Link
                    href={{
                      pathname: "/user/1/purchase",
                      query: { paymentType: paymentType, title: post.title },
                    }}
                    passHref
                  >
                    <span>حامی شوید</span>
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div
            className={`${styles.timingRow} ${
              showContent ? "" : styles.paidTime
            }`}
          >
            <div className={styles.time}>{renderTime()}</div>
            {!paid || paymentType == memberType ? (
              <div
                className={styles.moreActions}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(!showPopup);
                }}
              >
                <Image src={MoreOptions} alt="" />
                {showPopup ? (
                  <Popup
                    popupSet={setShowPopup}
                    containerClass={styles.popup}
                    items={popupItems}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.title}>{post.title}</div>
          {!paid || paymentType == memberType ? (
            <div className={styles.description}>
              {post.description}
              <div className={styles.mask} />
            </div>
          ) : null}
          <div className={styles.actionsRow}>
            <div className={styles.actions}>
              <div className={styles.like}>
                <div className={styles.icon}>
                  <Image src={Heart} alt="" />
                </div>
                <div className={styles.count}>{post.likeCount}</div>
              </div>
              <div className={styles.comment}>
                <div className={styles.icon}>
                  <Image src={Comment} alt="" />
                </div>
                <div className={styles.count}>{post.commentCount}</div>
              </div>
            </div>
            {!paid || paymentType == memberType ? (
              <div className={styles.readMore}>
                <Link
                  href={{
                    pathname: "/post/" + postProp._id,
                    query: { type: rest.type },
                  }}
                >
                  مطالعه بیشتر
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
