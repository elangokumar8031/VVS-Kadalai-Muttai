import Breadcrumb from "../components/Breadcrumb";
import EnquiryForm from "../components/EnquiryForm";

const Contact = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Contact" },
        ]}
      />

        <section className="min-h-screen flex items-center justify-center pattern-bg">
          <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <EnquiryForm type="contact" />
          </div>
      </section>
    </>
  );
};

export default Contact;