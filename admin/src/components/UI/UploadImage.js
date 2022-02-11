import { XIcon } from "@heroicons/react/outline";
export const UploadMultipleImage = ({ selectedImages, setSelectedImages }) => {
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(selectedImages);
  };
  const handleRemoveImage = (e) => {
    const filterImage = selectedImages.filter((item, index) => index !== e);
    setSelectedImages(filterImage);
    if (selectedImages.length === 0) {
      setSelectedImages([]);
    }
  };
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-[12px]">
        <span className="mr-4">Images</span>
        <label
          htmlFor="images"
          className="px-[14px] py-[8px] bg-blue-800 text-white rounded ml-[9.5%]"
        >
          Thêm hình ảnh +
        </label>
      </div>
      <input
        type="file"
        id="images"
        multiple
        onChange={handleImageChange}
        hidden
      />
      {selectedImages && (
        <div className="grid grid-cols-4 gap-4 my-6">
          {selectedImages?.map((image, index) => (
            <div className="relative group" key={index}>
              <img
                key={image}
                src={image}
                alt=""
                className="object-cover h-[150px] w-full"
              />
              <XIcon
                className="absolute top-2 right-2 w-4 h-4 cursor-pointer hidden group-hover:block"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
