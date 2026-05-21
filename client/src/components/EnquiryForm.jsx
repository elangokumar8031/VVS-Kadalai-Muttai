import { useState } from "react";

const EnquiryForm = ({ type }) => {
  const isBulk = type === "bulk";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    subject: "General Enquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = "http://localhost:5000/api/contact";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Form submitted successfully ✅");
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
          subject: "General Enquiry",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch {
      alert("Server error");
    }
  };

  
  return (
  <form
    className="grid md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-lg"
    onSubmit={handleSubmit}
  >
    {/* Name */}
    <div>
      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="brutal-input w-full px-3 py-2 text-sm"
      />
    </div>

    {/* Phone */}
    <div>
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="brutal-input w-full px-3 py-2 text-sm"
      />
    </div>

    {/* Email */}
    <div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="brutal-input w-full px-3 py-2 text-sm"
      />
    </div>

    {/* City (Bulk only) */}
    {isBulk && (
      <div>
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="brutal-input w-full px-3 py-2 text-sm"
        />
      </div>
    )}

    {/* Subject (Contact only) */}
    {!isBulk && (
      <div>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="brutal-input w-full px-3 py-2 text-sm"
        >
          <option>General Enquiry</option>
          <option>Wholesale Order</option>
          <option>Retail Order</option>
        </select>
      </div>
    )}

    {/* Message - Full Width */}
    <div className="md:col-span-2">
      <textarea
        name="message"
        rows="4"
        placeholder="Write your message..."
        value={formData.message}
        onChange={handleChange}
        required
        className="brutal-input w-full px-3 py-2 text-sm"
      />
    </div>

    {/* Button - Full Width */}
    <div className="md:col-span-2 flex justify-center pt-2">
      <button
        type="submit"
        className="brutal-button px-6 py-2 text-sm"
      >
        {isBulk ? "Send Bulk Enquiry" : "Send Message"}
      </button>
    </div>
  </form>
);

  
};

export default EnquiryForm;