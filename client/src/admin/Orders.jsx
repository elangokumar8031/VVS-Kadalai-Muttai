import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        alert("❌ Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-600">
        Orders List 📦
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Address</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">{order.mobileNumber}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.address}</td>
                <td className="p-2">
                  <span className="bg-yellow-200 px-2 py-1 rounded text-sm">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="mt-4 text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
