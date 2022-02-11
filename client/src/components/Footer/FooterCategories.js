const FooterCategories = () => {
  return (
    <div className="flex items-start justify-start lg:gap-10 gap-4 lg:w-1/3 lg:flex-row flex-col w-full p-2">
      <div>
        <h1 className="uppercase">shop</h1>
        <ul className="text-sm lg:mt-4  lg:flex-col flex-row flex ">
          <li className="mt-4 lg:mr-0 mr-2">Food</li>
          <li className="mt-4 lg:mr-0 mr-2">Farm</li>
          <li className="mt-4 lg:mr-0 mr-2">Health</li>
          <li className="mt-4  lg:mr-0 mr-2">Organic</li>
        </ul>
      </div>
      <div>
        <h1 className="uppercase">support</h1>
        <ul className="text-sm lg:mt-4 lg:flex-col flex-row flex ">
          <li className="mt-4 lg:mr-0 mr-2">Contact us </li>
          <li className="mt-4 lg:mr-0 mr-2">FAQ</li>
          <li className="mt-4 lg:mr-0 mr-2">Privacy Policy</li>
          <li className="mt-4 lg:mr-0 mr-2">Blog</li>
        </ul>
      </div>
      <div>
        <h1 className="uppercase">my account</h1>
        <ul className="text-sm lg:mt-4 lg:flex-col flex-row flex ">
          <li className="mt-4 lg:mr-0 mr-2">Sign In </li>
          <li className="mt-4 lg:mr-0 mr-2">My Cart</li>
          <li className="mt-4 lg:mr-0 mr-2">My Whistlist</li>
          <li className="mt-4 lg:mr-0 mr-2">Check Out</li>
        </ul>
      </div>
    </div>
  );
};
export default FooterCategories;
