import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/UI/Modal";
const Comments = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [openCommentAction, setOpenCommentAction] = useState(false);
  const [allowComment, setAllowComment] = useState(currentUser ? true : false);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(currentUser);
  const handleCommentFieldFocus = (e) => {
    setOpenCommentAction(true);
  };
  const handleCloseCommentField = () => {
    setOpenCommentAction(false);
  };
  const handleLikeComment = () => {
    if (!currentUser) {
      setModalVisible(true);
    }
  };
  const handleRelyComment = () => {
    if (!currentUser) {
      setModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      {modalVisible && (
        <Modal
          content="Please login to continue checkout."
          onCloseModal={handleCloseModal}
        />
      )}
      <div className="w-[90%] ml-[5%] mb-[5%]">
        <div> 2 Comments</div>
        {allowComment && (
          <div className="flex gap-6 my-6 w-4/5 ml-[5%]">
            <div className="w-[10%]">
              <img
                src="https://res.cloudinary.com/datejdygy/image/upload/v1642827181/avatars/qexna9zml4rtpww4w79b.jpg"
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
              />
            </div>
            <div className="w-[90%] rounded-xl p-4">
              <input
                type="text"
                placeholder="Enter your comment..."
                className="border-[1px] border-t-white border-l-white border-r-white border-bottom-black w-full focus:outline-none"
                onFocus={handleCommentFieldFocus}
              />
              {openCommentAction && (
                <div className="flex items-center ml-auto">
                  <div className="ml-auto">
                    <button
                      className="mr-4 rounded-full px-3 py-1 hover:bg-gray-200 mt-4"
                      onClick={handleCloseCommentField}
                    >
                      Cancel
                    </button>
                    <button className="rounded-full px-3 py-1 bg-base-color text-white mt-4">
                      Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-4/5 ml-[5%]">
          <div className="flex gap-6 my-6 ">
            <div className="w-[10%]">
              <img
                src="https://res.cloudinary.com/datejdygy/image/upload/v1642827181/avatars/qexna9zml4rtpww4w79b.jpg"
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover bg-cover"
              />
            </div>
            <div className="w-[90%] rounded-xl bg-gray-200 px-4 py-2">
              <p className="font-bold">Qui Phu</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="ml-[10%] px-4 flex items-center">
            <button
              className="mr-4 text-base-color"
              onClick={handleLikeComment}
            >
              Like
            </button>
            <span className="mr-4">.</span>
            <button
              className="mr-4 text-base-color"
              onClick={handleRelyComment}
            >
              Rely
            </button>
            <span className="mr-4">.</span>
            <span className="text-gray-500">two days ago</span>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default Comments;
