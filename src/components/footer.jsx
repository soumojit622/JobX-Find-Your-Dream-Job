import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClipboardList,
  FaShieldAlt,
  FaGlobe,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center md:text-left">
          {/* Brand & About */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img
                src="/logo.png"
                alt="JobX Logo"
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-3xl font-bold tracking-wide">
                Job<span className="text-blue-500">X.</span>
              </h1>
            </div>
            <p className="text-gray-400 mt-4 text-sm leading-6">
              Your ultimate job portal to find the best career opportunities.
              Connect, apply, and grow with ease!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-5 tracking-wide">
              Quick Links
            </h2>
            <ul className="text-gray-400 space-y-3">
              {[
                { name: "Home", icon: FaGlobe },
                { name: "Jobs", icon: FaBriefcase },
                { name: "Contact Us", icon: FaEnvelope },
                { name: "Terms & Conditions", icon: FaClipboardList },
                { name: "Privacy Policy", icon: FaShieldAlt },
              ].map(({ name, icon: Icon }) => (
                <li key={name} className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon className="text-blue-400" />{" "}
                  <a href="#" className="hover:text-blue-400 transition-all duration-300">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-5 tracking-wide">
              Contact Us
            </h2>
            <ul className="text-gray-400 space-y-3">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FaMapMarkerAlt className="text-blue-400" /> Kolkata, India
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FaPhone className="text-blue-400" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FaEnvelope className="text-blue-400" /> support@jobx.com
              </li>
            </ul>
          </div>

          {/* Job Alerts Section */}
          <div>
            <h2 className="text-lg font-semibold mb-5 tracking-wide">
              Get Job Alerts <FaTelegram className="inline text-blue-400 ml-2" />
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Be the first to know about new job openings in your field.
              Subscribe now!
            </p>
            <div className="flex items-center bg-gray-800/60 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white px-4 py-2 outline-none w-full placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-5 tracking-wide">
              About Job<span className="text-blue-500">X.</span>
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              JobX connects talented individuals with leading companies. Our
              platform simplifies the job search process and helps businesses
              find the best talent.
            </p>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} JobX. All Rights Reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            {[
              { icon: FaFacebook, color: "hover:text-blue-500" },
              { icon: FaTwitter, color: "hover:text-blue-400" },
              { icon: FaLinkedin, color: "hover:text-blue-600" },
              { icon: FaGithub, color: "hover:text-gray-400" },
              { icon: FaInstagram, color: "hover:text-pink-500" },
              { icon: FaYoutube, color: "hover:text-red-500" },
            ].map(({ icon: Icon, color }, index) => (
              <a
                key={index}
                href="#"
                className={`text-gray-400 ${color} transition-all duration-300 transform hover:scale-110`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Made with love section */}
        <p className="text-gray-500 text-sm mt-6 text-center">
          Made with <span className="text-blue-400">💙</span> by{" "}
          <span className="font-semibold">Soumojit Banerjee</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
