const FooterNewsLetter = () => {
  return (
    <div className="lg:w-1/3 w-full p-2">
      <h1>NEWSLETTER</h1>
      <p className="mt-4 text-sm">Subscribe now to get daily updates</p>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Your email ... "
          className="lg:w-full md:w-3/5 w-full px-4 py-2 rounded outline-none focus:border-base-color focus:border-[2px] bg-gray-100 text-sm border-[2px] border-gray-300"
        />
        <div className="">
          <button className="rounded md:right-[40%]  absolute h-full px-2 text-sm lg:right-0 right-0  bottom-0 text-white bg-footer-button ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
export default FooterNewsLetter;
