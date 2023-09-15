export const PlaceHolderCards = () => {
  const placeholderCards = Array.from(Array(5).keys())
  return (
    <div
      role="status"
      className="space-y-4  divide-gray-200 rounded  animate-pulse dark:divide-gray-700 dark:border-gray-700"
    >
      {placeholderCards.map(placeholderCard => (
        <div
          className="flex flex-col justify-between border border-gray-200 p-4 h-35 shadow rounded-lg"
          key={placeholderCard}
        >
          <div>
            <div className="h-3.5 bg-gray-300 rounded-full dark:bg-gray-600 w-44 mb-4"></div>
            <div className="w-64 h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
            <div className="w-64 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
