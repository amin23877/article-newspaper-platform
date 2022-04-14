import { useCallback, useEffect, useState } from "react";
import FilterBar from "components/common/filterBar/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";
import useDebounce from "hooks/useDebounce";
import styles from "styles/components/profile/TabsCommon.module.scss";
import cookie from "cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { api } from "axios/api";
import { Endpoints } from "utils/endpoints";

export default function Feed({ id }) {
  const memberType = Cookies.get("membership");
  const [posts, setPosts] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const [filters, setFilters] = useState({
    searchText: "",
    paymentType: "",
    contentType: "",
    fromData: "",
    toData: "",
  });

  const handleFilter = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const handleSearchFeed = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    setFilters((p) => ({
      ...p,
      searchText: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  const loadPosts = useCallback(async () => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);
      if (id) {
        let tPosts = await axios.get(
          Endpoints.baseUrl + "/post/userPosts/" + id,
          {
            headers: {
              authorization: accessToken,
            },
            params: filters,
          }
        );
        setPosts(tPosts.data.data.posts);
      } else {
        let tPosts = await axios.get(Endpoints.baseUrl + "/post/me/posts", {
          headers: {
            authorization: accessToken,
          },
          params: filters,
        });
        setPosts(tPosts.data.data.posts);
      }
    } catch (e) {
      console.log(e);
    }
  }, [filters, id]);

  useEffect(() => {
    (async () => {
      await loadPosts();
    })();
  }, [loadPosts]);

  function sharePost(id) {
    var textArea = document.createElement("textarea");
    textArea.value = "http://localhost:3000/post/" + id;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
      alert("لینک پست در کلیپ بورد ذخیره شد");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  const hidePost = async (postId, hide = true) => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);
      if (hide) {
        let hide = await axios.post(
          Endpoints.baseUrl + "/post/hide/" + postId,
          {},
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        loadPosts();
      } else {
        let show = await axios.post(
          Endpoints.baseUrl + "/post/show/" + postId,
          {},
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        loadPosts();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deletePost = async (postId) => {
    api.delete(`/post/single/${postId}`).then((resp) => {
      loadPosts();
      alert("پست با موفقیت حذف شد");
    });
  };
  const banComments = async (post) => {
    let tmp = post.postPermissions;
    if (tmp.indexOf("comment") === -1) {
      tmp = [...tmp, "comment"];
    } else {
      tmp.splice(tmp.indexOf("comment"), 1);
    }
    api
      .put(`/post/${post._id}`, {
        description: post.description,
        paymentType: post.paymentType,
        price: post.price,
        tags: post.tags,
        title: post.price,
        postPermissions: [...tmp],
      })
      .then((resp) => {
        loadPosts();
        alert("پست با موفقیت ویرایش شد");
      });
  };
  return (
    <div>
      <FilterBar
        filters={filters}
        onFilter={handleFilter}
        onSearch={handleSearchFeed}
      />
      <div>
        {posts ? (
          posts.map((post, i) => (
            <FeedPost
              postProp={post}
              memberType={memberType}
              type="text"
              key={i}
              hidePost={hidePost}
              sharePost={sharePost}
              deletePost={deletePost}
              banComments={banComments}
            />
          ))
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
