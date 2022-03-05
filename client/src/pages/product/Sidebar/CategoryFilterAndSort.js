import { UilTimes } from "@iconscout/react-unicons";
import SidebarItem from "./SidebarItem";
const CategoryFilterAndSort = ({
  handleCloseSidebar,
  handlePriceRadioChange,
  selectedPriceOption,
  selectedPriceInitial,
  selectedCategoryInitial,
  handleFilterProduct,
}) => {
  return (
    <>
      <div className="fixed h-screen w-[30%] right-0 top-0 bottom-0 bg-white z-50 flex flex-col ">
        <header className="flex items-center justify-between border-b p-4 border-gray-300">
          <span className="font-bold text-xl">Filter and Sort</span>
          <div className="flex items-center">
            <span className="text-gray-500 underline mr-2 text-sm">
              Clear All
            </span>
            <UilTimes onClick={handleCloseSidebar} className="cursor-pointer" />
          </div>
        </header>
        <main>
          <div className="border-b p-4 border-gray-300">
            <h1 className="font-bold py-2">Filters is applied</h1>
            <ul className="flex gap-2 my-2">
              <li className="flex items-center px-2 py-1 border-[1px] bg-gray-200 w-auto rounded">
                <UilTimes size="20" className="w-[30%] mr-2" />
                <span className="w-[70%]">
                  {selectedPriceInitial.charAt(0).toUpperCase() +
                    selectedPriceInitial.slice(
                      1,
                      selectedPriceInitial.trim().length
                    )}
                </span>
              </li>
              <li className="flex items-center px-2 py-1 border-[1px] bg-gray-200 w-auto rounded">
                <UilTimes size="20" className="w-[30%] mr-2" />
                <span className="w-[70%]">
                  {selectedCategoryInitial.charAt(0).toUpperCase() +
                    selectedCategoryInitial.slice(
                      1,
                      selectedCategoryInitial.trim().length
                    )}
                </span>
              </li>
            </ul>
          </div>
          <ul className="">
            <li className="border-b p-4 border-gray-300">
              <span className="font-bold">Price</span>
              <div className="ml-4 py-2">
                <SidebarItem
                  id="checkbox0"
                  label="All"
                  radioName="price"
                  handleradioChange={(e) => handlePriceRadioChange(e)}
                  checked={selectedPriceOption === "all"}
                />
                <SidebarItem
                  id="checkbox1"
                  label="10000"
                  radioName="price"
                  handleradioChange={(e) => handlePriceRadioChange(e)}
                  checked={selectedPriceOption === "10000"}
                />
                <SidebarItem
                  id="checkbox2"
                  label="20000"
                  radioName="price"
                  handleradioChange={(e) => handlePriceRadioChange(e)}
                  checked={selectedPriceOption === "20000"}
                />
                <SidebarItem
                  id="checkbox3"
                  label="30000"
                  radioName="price"
                  handleradioChange={(e) => handlePriceRadioChange(e)}
                  checked={selectedPriceOption === "30000"}
                />
                <SidebarItem
                  id="checkbox4"
                  label="40000"
                  radioName="price"
                  handleradioChange={(e) => handlePriceRadioChange(e)}
                  checked={selectedPriceOption === "40000"}
                />
              </div>
            </li>
          </ul>
        </main>
        <button
          onClick={handleFilterProduct}
          className="w-[90%] ml-[5%] py-3 text-white uppercase mt-auto bg-base-color mb-[5%]"
        >
          Apply
        </button>
      </div>
      <div
        className="fixed h-screen w-screen inset-0 bg-[rgba(0,0,0,0.4)] z-40"
        onClick={handleCloseSidebar}
      ></div>
    </>
  );
};
export default CategoryFilterAndSort;
