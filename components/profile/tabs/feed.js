import FilterBar from "components/common/filterBar/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";
import { useUser } from "hooks/useUser";

import styles from "styles/components/profile/TabsCommon.module.scss";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Endpoints } from "../../../utils/endpoints";
import cookie from "cookie";
import jMoment from "moment-jalaali";

export default function Feed({ id, ...props }) {
    //const [membership, setMembership] = useState('')
    // const [user, getUser, hasInitialized, memberType] = useUser()
    const memberType = Cookies.get("membership");
    const [posts, setPosts] = useState();

    useEffect(async () => {
        await loadPosts()
    }, []);
    const loadPosts = async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);
            if (id) {
                let tPosts = await axios.get(Endpoints.baseUrl + "/post/userPosts/" + id, {
                    headers: {
                        authorization: accessToken,
                    },
                });
                setPosts(tPosts.data.data.posts);
            } else {
                let tPosts = await axios.get(Endpoints.baseUrl + '/post/me/posts', {
                    headers: {
                        authorization: accessToken
                    }
                })
                setPosts(tPosts.data.data.posts);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const deletePost = async (id) => {

    }
    function sharePost(id) {
        var textArea = document.createElement("textarea");
        textArea.value = 'http://localhost:3000/post/'+id;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
          alert('لینک پست در کلیپ بورد ذخیره شد')
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      
        document.body.removeChild(textArea);
      }
      function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
          fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }

    const hidePost = async (postId, hide = true) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);
            if (hide) {
                let hide = await axios.post(Endpoints.baseUrl + "/post/hide/" + postId, {}, {
                    headers: {
                        authorization: accessToken,
                    },
                });
                loadPosts();
            } else {
                let show = await axios.post(Endpoints.baseUrl + "/post/show/" + postId, {}, {
                    headers: {
                        authorization: accessToken
                    }
                })
                loadPosts();
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <FilterBar />
            <div>
                {posts ? (
                    posts.map((post, i) => <FeedPost
                        postProp={post}
                        memberType={memberType}
                        type="text"
                        key={i}
                        hidePost={hidePost}
                        sharePost={sharePost}
                    />)
                ) : (
                    <p>loading...</p>
                )}
                {/* <FeedPost memberType={memberType} type='text' />
                <FeedPost memberType={memberType} type='video' />
                <FeedPost paid memberType={memberType} paymentType='اشتراک طلایی' />
                <FeedPost paid memberType={memberType} paymentType={5} /> */}
                {/** 5ooo toman */}
                <div className={styles.showMoreContainer}>
                    <Button>موارد بیشتر</Button>
                </div>
            </div>
        </div>
    );
}
