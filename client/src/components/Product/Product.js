import ProductItem from "./ProductItem";
import Vegetable from "../../img/grid-vegetable.jpg";
import Fruit from "../../img/grid-fruit.jpg";
import Meat from "../../img/grid-meat.jpg";

const Product = () => {
  return (
    <div className=" md:py-14 py-8 font-playfair">
      <h1 className="heading">Our Product</h1>
      <div className="flex md:flex-row flex-col w-full items-center justify-center">
        <ProductItem src={Vegetable} name="Vegetable" productType="vegetable" />
        <ProductItem src={Fruit} name="Fruit" productType="fruit" />
        <ProductItem src={Meat} name="Meat" productType="meat" />
      </div>
    </div>
  );
};
export default Product;
