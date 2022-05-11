import { Link } from "react-router-dom";
const ProductPagination = (props) => {
  const { name, description, images, quantity, price, weight, discount, _id } =
    props.data;
  return (
    <tbody>
      <tr key={_id} className="border-b border-gray-300 text-center ">
        <td className="table-item">{name}</td>
        <td className="table-item ">
          <div className="blog-content relative">
            <p className="relative">{description}</p>
          </div>
        </td>
        <td className="table-item text-center w-[10vw] h-[100px]">
          <img
            src={images[0].url}
            alt=""
            className="w-full h-full object-cover"
          />
        </td>
        <td className="table-item">{quantity}</td>
        <td className="table-item">{price}</td>
        <td className="table-item">{weight}</td>
        <td className="table-item">{discount}</td>
        <td className="p-2 text-center">
          <Link to={`/product/edit/${_id}`}>
            <button className="table-edit__button">Edit</button>
          </Link>
        </td>
        <td className="p-2 text-center">
          <button
            className="table-delete__button"
            onClick={() => props.onDeleteProduct(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
};
export default ProductPagination;
