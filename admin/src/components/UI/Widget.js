import { UilUsersAlt } from "@iconscout/react-unicons";
const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;

  switch (type) {
    case "user":
      data = {
        title: "Users",
        isMoney: false,
        link: "See all users",
        icon: <UilUsersAlt className="w-5 h-5" />,
      };
      break;
    case "order":
      data = {
        title: "Orders",
        isMoney: false,
        link: "View all orders",
      };
      break;
    case "earning":
      data = {
        title: "Total Revenue",
        isMoney: true,
        link: "View net earnings",
      };
      break;
    case "balance":
      data = {
        title: "Balance",
        isMoney: true,
        link: "See details",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">{data.title}</span>
        <div className="flex items-center text-sm text-green-500">
          <span>{data.icon}</span>
        </div>
      </div>
      <div className="font-light text-2xl my-2">
        {data.isMoney && "$"} {amount}
      </div>
      <div className="w-max text-[12px] border-b border-gray-500">
        <span>{data.link}</span>
      </div>
    </div>
  );
};

export default Widget;
