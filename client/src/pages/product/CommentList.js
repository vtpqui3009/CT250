import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/UI/Modal";
import axios from "axios";
import moment from "moment";
import { DataContext } from "../../context/DataProvider";
import ReplyComment from "./ReplyComment";
import Rating from "./Rating";
const CommentList = ({ productId }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const state = useContext(DataContext);
  const socket = state.socket;
  const [reply, setReply] = useState(false);
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/comments/${productId}`
        );
        const responseData = await response.data.comments;
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
        console.log([message, ...comments]);
      });
      // return socket.off("sendCommentToClient");
    }
  }, [socket, comments]);

  const handleLikeComment = () => {
    if (!currentUser) {
      setModalVisible(true);
    }
  };
  const handleRelyComment = () => {
    if (!currentUser) {
      setModalVisible(true);
    }
    setReply(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
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
                    <Rating props={comments} />
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
              <div className="ml-[35%] md:ml-[12%] md:px-4 flex items-center text-[14px] ">
                <button
                  className="mr-4 text-gray-500"
                  onClick={handleLikeComment}
                >
                  Like
                </button>
                <span className="mr-4 pb-2 md:block hidden">.</span>
                <button
                  className="mr-4 text-gray-500"
                  onClick={handleRelyComment}
                >
                  Rely
                </button>
                <span className="mr-4 pb-2 md:block hidden">.</span>
                <span className="text-gray-500">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>

              {reply && <ReplyComment />}
            </div>
          ))}
      </div>
    </>
  );
};
export default CommentList;
