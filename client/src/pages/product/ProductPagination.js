import { Link } from "react-router-dom";
const ProductPagination = (props) => {
  const { _id, name, images } = props.data;
  return (
    <li className="h-64 list-none flex items-center flex-col" key={_id}>
      <Link to={`/product/${_id}`} className="w-full h-full">
        {images.slice(0, 1).map((data) => (
          <img
            src={data.url}
            alt=""
            className="w-full h-4/5 object-cover"
            key={data._id}
          />
        ))}
        <div className="h-1/5 text-center my-2">
          <span>{name}</span>
        </div>
      </Link>
    </li>
  );
};
export default ProductPagination;
