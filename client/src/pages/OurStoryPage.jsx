import React from 'react';
import OurStory from '../components/OurStory';
import Breadcrumb from '../components/Breadcrumb';

const OurStoryPage = () => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Our Story' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Add a bit of top spacing for better flow */}
      <div className="pt-10">
        <OurStory />
      </div>
    </div>
  );
};

export default OurStoryPage;
