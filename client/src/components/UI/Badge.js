const Badge = ({ className, number }) => {
  return (
    <span className={className}>
      <span className="bg-red-600 text-white text-[12px] rounded-full px-[6px] py-[1px]">
        {number}
      </span>
    </span>
  );
};
export default Badge;
