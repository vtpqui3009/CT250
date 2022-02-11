// import Input from "../UI/Input";
import { UilEditAlt, UilCamera } from "@iconscout/react-unicons";
const Profile = () => {
  return (
    <form className="w-[90%] ml-[5%] pt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <img
            alt=""
            src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/217874206_1417329385308451_6732310107345089948_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S87_19wnJIcAX-Qw4-Z&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT96KXzWFMAcwG69vKQ1PN5ehGso08empVxtzvTnVll_LQ&oe=61EC24AD"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="px-1">
            <UilCamera
              size="16"
              className="absolute bottom-1 right-0 bg-[#fff] rounded-full text-gray-500 cursor-pointer font-extrabold"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            className="mt-2 border-[1px] border-blue-500 rounded px-4 py-2 relative outline-none"
          />
          <p className="absolute top-4 right-[40%]">Qui Phu</p>
          <UilEditAlt size="16" className="cursor-pointer" />
        </div>
      </div>
      {/* <Input label="Address" type="text" id="adress" />
      <Input label="Email" type="email" id="adress" /> */}
      <div>
        <div className="flex items-center">
          <p className="mr-4 font-bold text-[12px] ml-6 w-[15%]">Gender</p>
          <div className="w-[85%] flex">
            {/* <Input label="Male" type="checkbox" id="male" />
            <Input label="Female" type="checkbox" id="fmale" /> */}
          </div>
        </div>
      </div>
    </form>
  );
};
export default Profile;
