import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { EyeIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import React from "react";

const FeatureItem = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log(product._id);
  };

  return (
    <React.Fragment>
      {props.featureProducts && props.featureProducts.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <p>There no product update here</p>
        </div>
      )}
      <div className="feature">
        {props.featureProducts &&
          props.featureProducts?.map((product, index) => (
            <div className="feature-item" key={index}>
              <div className="relative overflow-hidden group w-full">
                <img
                  src={product.images[0].url}
                  alt=""
                  className="w-full h-[240px] object-cover bg-cover"
                />
                <div className="feature-action">
                  <div className="feature-action__item">
                    <EyeIcon className="w-4 h-4" />
                  </div>
                  <div className="feature-action__item">
                    <HeartIcon className="w-4 h-4" />
                  </div>
                  <div
                    className="feature-action__item"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="mt-2">{product.name}</p>
              <p className="mt-2 font-bold">{`${product.price}k/kg`}</p>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
export default FeatureItem;
