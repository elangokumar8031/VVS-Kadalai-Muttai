import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm flex items-center gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            
            {item.to ? (
              <Link
                to={item.to}
                className="text-gray-600 hover:text-[#8B5E3C] transition font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#8B5E3C] font-semibold">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
