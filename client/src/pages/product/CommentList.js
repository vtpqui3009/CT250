import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/UI/Modal";
import axios from "axios";
import moment from "moment";
import { DataContext } from "../../context/DataProvider";
import ReplyComment from "./ReplyComment";
import Rating from "./Rating";
import { UisStar } from "@iconscout/react-unicons-solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
const CommentList = ({ productId }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const state = useContext(DataContext);
  const socket = state.socket;
  const [isReply, setIsReply] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const [replyListIsVisible, setReplyListIsVisible] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(true);
  const [prevUser, setPrevUser] = useState(null);
  const [ratings, setRatings] = useState(0);
  const [commentEmpty, setCommentEmpty] = useState("");
  const [comment, setComment] = useState("");
  const [replyCommentIsVisible, setReplyCommentIsVisible] = useState(false);
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/comments/${productId}`
        );
        const responseData = await response.data.comments;
        console.log(responseData);
        setComments(responseData);
      } catch (err) {}
    };
    getAllReviews();
  }, [productId]);
  //realtime
  // join room
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", productId);
    }
  }, [socket, productId]);
  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (message) => {
        setComments([message, ...comments]);
        // console.log([message, ...comments]);
      });
      // return socket.off("sendCommentToClient");
    }
  }, [socket, comments]);
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyCommentToClient", (replyMessage) => {
        const newArr = [...comments];
        newArr.forEach((comment) => {
          if (comment._id === replyMessage._id) {
            comment.reply = replyMessage.reply;
          }
        });
        setComments(newArr);
        console.log(replyMessage);
      });
      // return socket.off("sendCommentToClient");
    }
  }, [socket, comments]);
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyOfReplyToClient", (replyMessage) => {
        const newArr = [...comments];
        newArr.forEach((comment) => {
          if (comment.reply._id === replyMessage._id) {
            comment.reply.replyArr = replyMessage.reply;
          }
        });
        setComments(newArr);
        console.log(replyMessage);
      });
      // return socket.off("sendCommentToClient");
    }
  }, [socket, comments]);
  const handleRelyComment = (id) => {
    if (!currentUser) {
      setModalVisible(true);
      setIsReply(false);
      return;
    }
    setLastClicked(id);
    setIsReply(true);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (e.target.value.trim().length > 0) {
      setCommentEmpty("");
    }
  };
  const handleNewReply = (event, id, prevUser, parentId) => {
    event.preventDefault();
    if (!currentUser) {
      setModalVisible(true);
      setIsReply(false);
      return;
    }
    setLastClicked(id);
    setIsReply(true);
    const userId = currentUser && currentUser.user._id;
    const userAvatar = currentUser.user.avatar.url;
    const userName = currentUser && currentUser.user.name;
    console.log("product id", productId);
    console.log("prev user", prevUser);
    console.log("user id", userId);
    console.log("user avatar", userAvatar);
    console.log("username", userName);
    console.log("ratings", ratings);
    console.log("comment", comment);
    console.log("last Clicked", parentId);
    socket.emit("replyComment", {
      productId: productId,
      prevUser: prevUser,
      userId,
      userName,
      userAvatar,
      ratings,
      comment,
      parentId: parentId,
    });
    setComment("");
    setRatings(0);
  };
  const handleCloseCommentField = () => {
    setLastClicked(null);
    setIsReply(false);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleReplyListVisible = () => {
    setReplyListIsVisible(true);
    setToggleVisible(false);
  };
  const handleCloseListVisible = () => {
    setReplyListIsVisible(false);
    setToggleVisible(true);
  };
  return (
    <>
      {modalVisible && (
        <Modal
          content="Please login to comment."
          onCloseModal={handleCloseModal}
        />
      )}{" "}
      {currentUser && comments && comments.length === 0 && (
        <div className="text-center my-6">
          Let's be the first people to comment this post.
        </div>
      )}
      {!currentUser && (
        <div className="text-center my-6">
          Let's login to comment this post.
        </div>
      )}
      <div className="w-4/5 ml-[5%]">
        {comments &&
          comments?.map((comment, index) => (
            <div key={index}>
              <div className="flex items-center gap-6 my-6 ">
                <div className="w-[20%] md:w-[10%]">
                  <img
                    src={comment.userAvatar}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
                  />
                </div>
                <div className="w-[80%] md:w-[90%] rounded-xl bg-gray-200 md:p-4 px-4 py-2">
                  <div className="flex md:flex-row flex-col justify-between mb-0 md:mb-4">
                    <p className="font-bold">{comment.userName}</p>
                    <Rating props={comment} />
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
              <div className="ml-[35%] md:ml-[12%] md:px-4 flex items-center text-[14px] ">
                <button
                  className="mr-4 text-gray-500"
                  // onClick={index === commen handleLikeComment}
                >
                  Like
                </button>
                <span className="mr-4 pb-2 md:block hidden">.</span>
                <button
                  className="mr-4 text-gray-500"
                  onClick={() => handleRelyComment(comment._id)}
                >
                  Rely
                </button>
                <span className="mr-4 pb-2 md:block hidden">.</span>
                <span className="text-gray-500">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
              {comment.reply.length > 0 && (
                <>
                  <div
                    className="ml-[27%] sm:ml-[13.5%]  py-1  cursor-pointer text-gray-600 font-bold flex items-center whitespace-nowrap duration-300 ease-linear"
                    onClick={handleReplyListVisible}
                    style={{ display: toggleVisible ? "" : "none" }}
                  >
                    <span>See {comment.reply.length} reply</span>
                    <ChevronDownIcon className="ml-2 w-4 h-4" />
                  </div>
                  <div
                    className="ml-[27%] sm:ml-[13.5%]  py-1  cursor-pointer text-gray-600 font-bold flex items-center duration-300 ease-linear"
                    onClick={handleCloseListVisible}
                    style={{ display: toggleVisible ? "none" : "" }}
                  >
                    <span> Hide reply</span>
                    <ChevronUpIcon className="ml-2 w-4 h-4" />
                  </div>
                </>
              )}
              {replyListIsVisible &&
                comment.reply.map(
                  (comment) => comment.parentId === comment._id
                ) &&
                comment.reply.map((reply) => (
                  <div id={reply._id} className="ml-16">
                    {" "}
                    <div className="flex items-center gap-6 my-6 ">
                      <div className="w-[20%] md:w-[10%]">
                        <img
                          src={reply.userAvatar}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
                        />
                      </div>
                      <div className="w-[80%] md:w-[90%] rounded-xl bg-gray-200 md:p-4 px-4 py-2">
                        <div className="flex md:flex-row flex-col justify-between mb-0 md:mb-4">
                          <p className="font-bold">{reply.userName}</p>
                          <Rating props={reply} />
                        </div>
                        <p>
                          <span className="mr-2 text-blue-500">
                            {reply.prevUser}
                          </span>
                          <span>{reply.comment}</span>
                        </p>
                      </div>
                    </div>
                    <div className="ml-[35%] md:ml-[12%] md:px-4 flex items-center text-[14px] ">
                      <button className="mr-4 text-gray-500">Like</button>
                      <span className="mr-4 pb-2 md:block hidden">.</span>
                      <button
                        className="mr-4 text-gray-500"
                        onClick={() => handleRelyComment(reply._id)}
                      >
                        Rely
                      </button>
                      <span className="mr-4 pb-2 md:block hidden">.</span>
                      <span className="text-gray-500">
                        {moment(reply.createdAt).fromNow()}
                      </span>
                    </div>
                    {isReply && lastClicked === reply._id && (
                      <div className="flex items-center gap-6 my-6">
                        <div className="w-[10%]">
                          <img
                            src={currentUser && currentUser.user.avatar.url}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
                          />
                        </div>
                        <form
                          className="w-[90%] rounded-xl p-4"
                          socket={socket}
                          onSubmit={(event) =>
                            handleNewReply(
                              event,
                              reply._id,
                              reply.userName,
                              comment._id
                            )
                          }
                        >
                          <div className="user-rating">
                            <input
                              type="radio"
                              name="rate"
                              id="radio1"
                              hidden
                              onChange={() => setRatings(5)}
                            />
                            <label
                              htmlFor="radio1"
                              className="user-rating-label"
                            >
                              <UisStar className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                            </label>
                            <input
                              type="radio"
                              name="rate"
                              id="radio2"
                              hidden
                              onChange={() => setRatings(4)}
                            />
                            <label
                              htmlFor="radio2"
                              className="user-rating-label"
                            >
                              <UisStar className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                            </label>
                            <input
                              type="radio"
                              name="rate"
                              id="radio3"
                              hidden
                              onChange={() => setRatings(3)}
                            />
                            <label
                              htmlFor="radio3"
                              className="user-rating-label"
                            >
                              <UisStar className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                            </label>
                            <input
                              type="radio"
                              name="rate"
                              id="radio4"
                              hidden
                              onChange={() => setRatings(2)}
                            />
                            <label
                              htmlFor="radio4"
                              className="user-rating-label"
                            >
                              <UisStar className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                            </label>
                            <input
                              type="radio"
                              name="rate"
                              id="radio5"
                              hidden
                              onChange={() => setRatings(1)}
                            />
                            <label
                              htmlFor="radio5"
                              className="user-rating-label"
                            >
                              <UisStar className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                            </label>
                          </div>

                          <input
                            type="text"
                            placeholder="Enter your comment and rate for this product"
                            className="border-[1px] border-t-white border-l-white border-r-white border-bottom-black w-full focus:outline-none p-4"
                            // onFocus={handleCommentFieldFocus}
                            // ref={commentRef}
                            onChange={handleCommentChange}
                          />
                          {commentEmpty && (
                            <div className="mt-6 text-red-500 font-semibold">
                              {commentEmpty}
                            </div>
                          )}
                          <div className="flex items-center ml-auto">
                            <div className="ml-auto">
                              <button
                                className="mr-4 rounded-full px-3 py-1 hover:bg-gray-200 mt-4"
                                onClick={handleCloseCommentField}
                              >
                                Cancel
                              </button>
                              <button
                                className="rounded-full px-3 py-1 bg-base-color text-white mt-4"
                                type="submit"
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              {isReply && lastClicked === comment._id && (
                <ReplyComment
                  handleCloseCommentField={handleCloseCommentField}
                  handleReplyComment={handleRelyComment}
                  parentId={lastClicked}
                  productId={productId}
                  prevUser={
                    isReply && lastClicked === comment._id && comment.userName
                  }
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};
export default CommentList;
