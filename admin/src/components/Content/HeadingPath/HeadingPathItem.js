import { UilAngleRight } from "@iconscout/react-unicons";
const HeadingPathItem = (props) => {
  return (
    <div className="flex items-center text-gray-900">
      <span className={props.pathnameClass}>{props.pathname}</span>
      <UilAngleRight size="16" className={props.iconClass} />
    </div>
  );
};
export default HeadingPathItem;
