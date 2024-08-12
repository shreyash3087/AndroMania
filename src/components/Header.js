import React from "react";

function Header() {
  const scrollToFooter = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-4 h-16 bg-[#7388a6] flex justify-between items-center text-white px-20">
      <div className="text-xl">Andro Mania</div>
      <div
        className="text-sm border-2 border-white rounded-lg px-6 py-2 cursor-pointer"
        onClick={scrollToFooter}
      >
        Join Us
      </div>
    </div>
  );
}

export default Header;
