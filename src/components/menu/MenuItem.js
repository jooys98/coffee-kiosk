import React from "react";
import itemData from "../../data/itemData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const MenuItem = ({ category, onItemClick }) => {
  const items = itemData[category] || [];
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{category} 메뉴</h2>

      <div className="relative">
        {/* Prev Button */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105 cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-gray-600 text-sm">
                {item.price.toLocaleString()}원
              </p>

              {/* Badges */}
              {item.soldOut && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SOLD OUT
                </span>
              )}
              {item.isNew && (
                <span className="absolute top-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded">
                  NEW
                </span>
              )}
              {item.isRecommended && (
                <span className="absolute top-2 right-2 bg-orange-400 text-white text-xs px-2 py-1 rounded">
                  👍 추천
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentPage ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItem;
