const TimelineContainer = ({ timelineTime, chilren }) => {
  return (
    <div className="p-4 mb-10 bg-gray-50 rounded-lg border border-gray-100 dark:border-gray-700">
      <time className="text-lg font-semibold text-gray-900 ">
        {timelineTime}
      </time>
      <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        {chilren}
      </ol>
    </div>
  );
};
export default TimelineContainer;
