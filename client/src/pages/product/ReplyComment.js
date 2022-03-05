import { useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { DataContext } from "../../context/DataProvider";
import { UisStar } from "@iconscout/react-unicons-solid";
const ReplyComment = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [openCommentAction, setOpenCommentAction] = useState(false);
  const [rating, setRating] = useState(0);
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
  const handleSubmitComment = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center gap-6 my-6 ml-[5%]">
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
        onSubmit={handleSubmitComment}
      >
        <div className="user-rating">
          <input
            type="radio"
            name="rate"
            id="radio1"
            hidden
            onChange={() => setRating(5)}
          />
          <label htmlFor="radio1" className="user-rating-label">
            <UisStar size="16" />
          </label>
          <input
            type="radio"
            name="rate"
            id="radio2"
            hidden
            onChange={() => setRating(4)}
          />
          <label htmlFor="radio2" className="user-rating-label">
            <UisStar size="16" />
          </label>
          <input
            type="radio"
            name="rate"
            id="radio3"
            hidden
            onChange={() => setRating(3)}
          />
          <label htmlFor="radio3" className="user-rating-label">
            <UisStar size="16" />
          </label>
          <input
            type="radio"
            name="rate"
            id="radio4"
            hidden
            onChange={() => setRating(2)}
          />
          <label htmlFor="radio4" className="user-rating-label">
            <UisStar size="16" />
          </label>
          <input
            type="radio"
            name="rate"
            id="radio5"
            hidden
            onChange={() => setRating(1)}
          />
          <label htmlFor="radio5" className="user-rating-label">
            <UisStar size="16" />
          </label>
        </div>

        <input
          type="text"
          placeholder="Enter your comment and rate for this product"
          className="border-[1px] border-t-white border-l-white border-r-white border-bottom-black w-full focus:outline-none p-4"
          onFocus={handleCommentFieldFocus}
          ref={commentRef}
        />

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
              type="submit"
            >
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ReplyComment;
