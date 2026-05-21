import Breadcrumb from "../components/Breadcrumb";
import EnquiryForm from "../components/EnquiryForm";

const BulkEnquiry = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Bulk Enquiry" },
        ]}
      />

      <section className="min-h-screen flex items-center justify-center bg-[#e8e8e8]">
        <div className="brutal-card">
          <span className="brutal-title">Bulk Enquiry</span>
          <EnquiryForm type="bulk" />
        </div>
      </section>
    </>
  );
};

export default BulkEnquiry;