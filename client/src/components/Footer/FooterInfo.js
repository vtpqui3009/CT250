import {
  LocationMarkerIcon,
  PhoneIcon,
  MailIcon,
} from "@heroicons/react/outline";
const FooterInfo = () => {
  return (
    <div className="lg:w-1/3 w-full p-2">
      <h1 className="text-3xl">Organic</h1>
      <div className="flex items-center text-sm mt-4">
        <LocationMarkerIcon className="w-4 h-4 mr-4" />
        <p>Address: 60-49 Road 11378 New York</p>
      </div>
      <div className="flex items-center text-sm mt-4">
        <PhoneIcon className="w-4 h-4 mr-4" />
        <p>Phone: +65 11.188.888</p>
      </div>
      <div className="flex items-center text-sm mt-4">
        <MailIcon className="w-4 h-4 mr-4" />
        <p>Email: hello@colorlib.com</p>
      </div>
    </div>
  );
};
export default FooterInfo;
