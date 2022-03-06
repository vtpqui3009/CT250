import { UilStar } from "@iconscout/react-unicons";
import { UisStar } from "@iconscout/react-unicons-solid";
let rate = 0;
const Rating = ({ props }) => {
  if (props.numOfReviews) {
    rate = 100 - (props.rating / props.numReviews) * 20;
  } else {
    rate = 100 - props.rating * 20;
  }

  const styleStar = {
    clipPath:
      props.rating === 0 ? `inset(0 100% 0 0)` : `inset(0 ${rate}% 0 0)`,
  };

  return (
    <div className="star">
      <UilStar
        size="20"
        className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
      />
      <UilStar
        size="20"
        className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
      />
      <UilStar
        size="20"
        className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
      />
      <UilStar
        size="20"
        className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
      />
      <UilStar
        size="20"
        className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
      />
      <div className="star-1" style={styleStar}>
        <UisStar
          size="20"
          className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
        />
        <UisStar
          size="20"
          className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
        />
        <UisStar
          size="20"
          className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
        />
        <UisStar
          size="20"
          className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
        />
        <UisStar
          size="20"
          className="my-[5px] pr-[5px] cursor-pointer text-yellow-400"
        />
      </div>
    </div>
  );
};
export default Rating;
