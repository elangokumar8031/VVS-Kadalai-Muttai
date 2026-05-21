import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Peanut Candy 🍬
        </h1>

        <nav className="space-x-6">
          <Link className="hover:text-red-500" to="/">Home</Link>
          <Link className="hover:text-red-500" to="/order">Order</Link>
          <Link className="hover:text-red-500" to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
