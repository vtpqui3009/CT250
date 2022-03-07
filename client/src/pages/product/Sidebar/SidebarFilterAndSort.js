import { UilTimes } from "@iconscout/react-unicons";
import SidebarItem from "./SidebarItem";
const SidebarFilterAndSort = (props) => {
  return (
    <>
      <div className="fixed h-screen w-[70%] lg:w-[30%] right-0 top-0 bottom-0 bg-white z-50 flex flex-col ">
        <header className="flex items-center justify-between border-b p-4 border-gray-300">
          <span className="font-bold text-[18px] sm:text-xl">
            Filter and Sort
          </span>
          <div className="flex items-center">
            <span
              className="text-gray-500 underline mr-2  cursor-pointer sm:text-sm text-[12px]"
              onClick={props.handleClearFilter}
            >
              Clear All
            </span>
            <UilTimes
              onClick={props.handleCloseSidebar}
              className="cursor-pointer"
            />
          </div>
        </header>
        <main>
          <div className="border-b p-4 border-gray-300">
            <h1 className="font-bold py-2 sm:text-base text-sm">
              Filters is applied
            </h1>
            <ul className="flex gap-2 my-2 sm:text-base text-sm">
              <li className="flex items-center px-2 py-1 border-[1px] bg-gray-200 w-fit rounded">
                <UilTimes size="20" className="w-[30%] mr-2" />
                <span className="w-[70%]">
                  {props.selectedPriceInitial.charAt(0).toUpperCase() +
                    props.selectedPriceInitial.slice(
                      1,
                      props.selectedPriceInitial.trim().length
                    )}
                </span>
              </li>
              <li className="flex items-center px-2 py-1 border-[1px] bg-gray-200 w-fit rounded">
                <UilTimes size="20" className="w-[30%] mr-2" />
                <span className="w-[70%]">
                  {props.selectedCategoryInitial.charAt(0).toUpperCase() +
                    props.selectedCategoryInitial.slice(
                      1,
                      props.selectedCategoryInitial.trim().length
                    )}
                </span>
              </li>
            </ul>
          </div>
          <ul className="sm:text-base text-sm">
            <li className="border-b p-4 border-gray-300">
              <span className="font-bold">Price</span>
              <div className="ml-4 py-2">
                <SidebarItem
                  id="checkbox0"
                  label="All"
                  name="price"
                  onChange={(e) => props.handlePriceChange(e)}
                  checked={props.selectedPriceOption === "all"}
                />
                <SidebarItem
                  id="checkbox1"
                  label="< 50000"
                  name="price"
                  onChange={(e) => props.handlePriceChange(e)}
                  checked={props.selectedPriceOption === "< 50000"}
                />
                <SidebarItem
                  id="checkbox2"
                  label="50000 - 100000"
                  name="price"
                  onChange={(e) => props.handlePriceChange(e)}
                  checked={props.selectedPriceOption === "50000 - 100000"}
                />
                <SidebarItem
                  id="checkbox3"
                  label="100000 - 300000"
                  name="price"
                  onChange={(e) => props.handlePriceChange(e)}
                  checked={props.selectedPriceOption === "100000 - 300000"}
                />
                <SidebarItem
                  id="checkbox4"
                  label="300000 - 500000"
                  name="price"
                  onChange={(e) => props.handlePriceChange(e)}
                  checked={props.selectedPriceOption === "300000 - 500000"}
                />
              </div>
            </li>
            <li className="border-b p-4 border-gray-300">
              <span className="font-bold">Category</span>
              <div className="ml-4 py-2">
                <SidebarItem
                  id="all"
                  label="All"
                  name="category"
                  onChange={(e) => props.handleCategoryChange(e)}
                  checked={props.selectedCategoryOption === "all"}
                  style={props.categoryFirstElStyle}
                />
                <SidebarItem
                  id="meat"
                  label="Meat"
                  name="category"
                  onChange={(e) => props.handleCategoryChange(e)}
                  checked={props.selectedCategoryOption === "Meat"}
                />
                <SidebarItem
                  id="fruit"
                  label="Fruit"
                  name="category"
                  onChange={(e) => props.handleCategoryChange(e)}
                  checked={props.selectedCategoryOption === "Fruit"}
                />
                <SidebarItem
                  id="vegetable"
                  label="Vegetable"
                  name="category"
                  onChange={(e) => props.handleCategoryChange(e)}
                  checked={props.selectedCategoryOption === "Vegetable"}
                />
              </div>
            </li>
          </ul>
        </main>
        <button
          onClick={props.handleFilterProduct}
          className="w-[90%] ml-[5%] py-3 text-white uppercase mt-auto bg-base-color mb-[5%] sm:text-base text-sm"
        >
          Apply
        </button>
      </div>
      <div
        className="fixed h-screen w-screen inset-0 bg-[rgba(0,0,0,0.4)] z-40"
        onClick={props.handleCloseSidebar}
      ></div>
    </>
  );
};
export default SidebarFilterAndSort;
