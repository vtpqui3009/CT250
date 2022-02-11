import { XIcon } from "@heroicons/react/outline";
export const UploadImage = ({ selectedImage, setSelectedImage }) => {
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(selectedImage);
  };
  const handleRemoveImage = (e) => {
    const filterImage = selectedImage.filter((item, index) => index !== e);
    setSelectedImage(filterImage);
  };
  return (
    <div className="pt-6">
      <div className="font-bold">
        <span className="mr-4">Choose your avatar *</span>
        <label
          htmlFor="images"
          className="px-[8px] py-[0px] bg-blue-800 text-white rounded-full ml-[5%] text-xl font-extrabold"
        >
          +
        </label>
      </div>
      <input type="file" id="images" onChange={handleImageChange} hidden />
      {selectedImage && (
        <div className="my-4 flex items-center justify-center">
          {selectedImage?.map((image, index) => (
            <div className="relative group" key={index}>
              <img
                key={image}
                src={image}
                alt=""
                className="object-cover h-[50px] w-[50px] rounded-full bg-cover"
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
