import { XIcon } from "@heroicons/react/outline";
export const UploadMultipleImage = ({ selectedImages, setSelectedImages }) => {
  const handleImageChange = (event) => {
    // let files;
    const files = Array.from(event.target.files);
    // if (selectedImages) {
    //   files = Array.from((old) => [...old, event.target.files]);
    // } else {
    //   files = Array.from(event.target.files);
    // }
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleRemoveImage = (e) => {
    // const filterImage = selectedImages.filter((item, index) => index !== e);
    setSelectedImages((image) => image.filter((item, index) => index !== e));
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
export const UploadSingleImage = ({ selectedImage, setSelectedImage }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
  };
  const handleRemoveImage = (e) => {
    setSelectedImage(null);
  };
  return (
    <div className="px-6 py-4 mt-4">
      <div className="font-bold text-[12px]">
        <span className="mr-4">Images</span>
        <label
          htmlFor="images"
          className="px-[14px] py-[8px] bg-blue-800 text-white rounded ml-[9.5%]"
        >
          Thêm hình ảnh +
        </label>
      </div>
      <input type="file" id="images" onChange={handleImageChange} hidden />

      {selectedImage && (
        <div className=" relative group" key={selectedImage}>
          <img
            src={selectedImage}
            alt=""
            className="object-cover h-[150px] mt-6 w-[200px] ml-[17%]"
          />
          <XIcon
            className="absolute top-2 left-[36%] w-4 h-4 cursor-pointer hidden group-hover:block"
            onClick={handleRemoveImage}
          />
        </div>
      )}
    </div>
  );
};
