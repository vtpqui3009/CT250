import { useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { DataContext } from "../../context/DataProvider";
import { UisStar } from "@iconscout/react-unicons-solid";
import CommentList from "./CommentList";
const Comments = ({ productId }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [openCommentAction, setOpenCommentAction] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [commentEmpty, setCommentEmpty] = useState("");
  const allowComment = currentUser ? true : false;
  const commentRef = useRef();
  const state = useContext(DataContext);
  const socket = state.socket;

  const handleCommentFieldFocus = (e) => {
    setOpenCommentAction(true);
  };
  const handleCloseCommentField = () => {
    setOpenCommentAction(false);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (e.target.value.trim().length > 0) {
      setCommentEmpty("");
    }
  };
  const handleSubmitComment = () => {
    // e.preventDefault();
    const userId = currentUser && currentUser.user._id;
    const userAvatar = currentUser.user.avatar.url;
    const userName = currentUser && currentUser.user.name;
    if (comment.trim().length === 0) {
      setCommentEmpty("This field is required !");
      // alert("This field is required !");
    }
    socket.emit("createComment", {
      userId,
      userName,
      userAvatar,
      comment,
      productId,
      ratings,
    });

    // const createNewReview = async () => {
    //   try {
    //     axios.defaults.withCredentials = true;
    //     const formData = new FormData();
    //     formData.append("userId", userId);
    //     formData.append("userName", userName);
    //     formData.append("productId", productId);
    //     formData.append("comment", comment);
    //     formData.append("rating", rating);

    //     const response = await axios.put(
    //       `${process.env.REACT_APP_BASE_API}/review`,
    //       formData
    //     );
    //     console.log(response);
    //   } catch (error) {
    //     commentRef.focus();
    //     setComment("");
    //     console.log(error);
    //   }
    // };
    // createNewReview();
    setComment("");
  };

  return (
    <>
      <div className="w-[90%] ml-[5%] mb-[5%]">
        <div className="text-xl uppercase"> Comments</div>
        {allowComment && (
          <div className="flex items-center gap-6 my-6 w-4/5 ml-[5%]">
            <div className="w-[10%]">
              <img
                src={currentUser && currentUser.user.avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
              />
            </div>
            <div className="w-[90%] rounded-xl p-4">
              {openCommentAction && (
                <div className="user-rating">
                  <input
                    type="radio"
                    name="rate"
                    id="radio1"
                    hidden
                    onChange={() => setRatings(5)}
                  />
                  <label htmlFor="radio1" className="user-rating-label">
                    <UisStar />
                  </label>
                  <input
                    type="radio"
                    name="rate"
                    id="radio2"
                    hidden
                    onChange={() => setRatings(4)}
                  />
                  <label htmlFor="radio2" className="user-rating-label">
                    <UisStar />
                  </label>
                  <input
                    type="radio"
                    name="rate"
                    id="radio3"
                    hidden
                    onChange={() => setRatings(3)}
                  />
                  <label htmlFor="radio3" className="user-rating-label">
                    <UisStar />
                  </label>
                  <input
                    type="radio"
                    name="rate"
                    id="radio4"
                    hidden
                    onChange={() => setRatings(2)}
                  />
                  <label htmlFor="radio4" className="user-rating-label">
                    <UisStar />
                  </label>
                  <input
                    type="radio"
                    name="rate"
                    id="radio5"
                    hidden
                    onChange={() => setRatings(1)}
                  />
                  <label htmlFor="radio5" className="user-rating-label">
                    <UisStar />
                  </label>
                </div>
              )}
              <input
                type="text"
                placeholder="Enter your comment and rate for this product"
                className="border-[1px] border-t-white border-l-white border-r-white border-bottom-black w-full focus:outline-none p-4"
                onFocus={handleCommentFieldFocus}
                value={comment}
                onChange={handleCommentChange}
                ref={commentRef}
              />
              {commentEmpty && (
                <div className="mt-6 text-red-500 font-semibold">
                  {commentEmpty}
                </div>
              )}
              {openCommentAction && (
                <div className="flex items-center ml-auto">
                  <div className="ml-auto">
                    <button
                      className="mr-4 rounded-full px-3 py-1 hover:bg-gray-200 mt-4"
                      onClick={handleCloseCommentField}
                      // type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-full px-3 py-1 bg-base-color text-white mt-4"
                      // type="submit"
                      onClick={handleSubmitComment}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <CommentList productId={productId} />
      </div>{" "}
    </>
  );
};
export default Comments;
