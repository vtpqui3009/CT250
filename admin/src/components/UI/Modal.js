import Backdrop from "./Backdrop";
const Modal = (props) => {
  return (
    <>
      <Backdrop
        className="fixed inset-0 bg-[rgba(0,0,0,0.3)] w-full h-screen z-10"
        onClick={props.onCloseModal}
      />
      <div className="ease-linear duration-300 transition-transform z-20 w-[40vw] fixed bg-[#fff] rounded top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]   ">
        <header className="px-10 py-4 bg-blue-500 text-white">
          {props.header}
        </header>
        <main className="p-10">
          <p>{props.content}</p>
        </main>
        <footer className="px-10 py-4 flex">
          <button
            onClick={props.onCloseModal}
            className="bg-sidebar-color text-white px-5 py-2 outline-none rounded ml-auto"
          >
            Confirm
          </button>
        </footer>
      </div>
    </>
  );
};
export default Modal;
