import { Link } from "react-router-dom";

export default function FooterFour() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="mb-8">
              <img
                src="/assets/images/saller-2.png"
                alt="Logo"
                className="w-40 h-auto"
              />
            </a>
          </div>

          {/* About Us Section */}
          <div className="flex flex-col items-center md:items-start">
            <h6 className="text-xl font-semibold mb-4 text-gray-300">VỀ CHÚNG TÔI</h6>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="hover:text-indigo-500 transition-all">
                  Liên hệ chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-500 transition-all">
                  Giới thiệu về chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="flex flex-col items-center md:items-start">
            <h6 className="text-xl font-semibold mb-4 text-gray-300">CỬA HÀNG</h6>
            <ul className="space-y-4">
              <li>
                <Link to="/all-products" className="hover:text-indigo-500 transition-all">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/all-products" className="hover:text-indigo-500 transition-all">
                  Danh mục sản phẩm
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            © 2024 <strong>Fashion Office</strong> - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
