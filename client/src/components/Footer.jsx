import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-gradient-to-b from-black via-red-950 to-black text-white">
      
      {/* TOP SECTION */}
      <div className="mx-auto max-w-7xl px-5 py-16">
        
        {/* GRID */}
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="TOPS CHICKEN"
                className="h-16 w-16 rounded-full border-4 border-yellow-400 object-cover"
              />

              <div>
                <h2 className="text-3xl font-black text-yellow-400">
                  TOPS CHICKEN
                </h2>

                <p className="font-semibold text-gray-300">
                  Peri Peri Restaurant
                </p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-gray-300">
              Premium UK peri peri restaurant with fast delivery,
              fresh halal food and professional online ordering.
            </p>

            {/* SOCIAL */}
            <div className="mt-7 flex flex-wrap gap-4">
              
              <a
                href="https://wa.me/447346860155"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl transition hover:scale-110 hover:bg-white hover:text-green-600"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-xl transition hover:scale-110 hover:bg-white hover:text-pink-600"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl transition hover:scale-110 hover:bg-white hover:text-blue-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-black transition hover:scale-110"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl transition hover:scale-110 hover:bg-white hover:text-black"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-2xl font-black text-yellow-400">
              Quick Links
            </h3>

            <div className="space-y-4">
              <a href="#home" className="block hover:text-yellow-400">
                Home
              </a>

              <a href="#menu" className="block hover:text-yellow-400">
                Menu
              </a>

              <a href="#offers" className="block hover:text-yellow-400">
                Offers
              </a>

              <a href="#tracking" className="block hover:text-yellow-400">
                Order Tracking
              </a>

              <a href="#contact" className="block hover:text-yellow-400">
                Contact
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div id="contact">
            <h3 className="mb-6 text-2xl font-black text-yellow-400">
              Contact Us
            </h3>

            <div className="space-y-5">

              <a
                href="https://maps.google.com/?q=2+Marylands+Rd,+Maida+Hill,+London+W9+2DZ,+United+Kingdom"
                target="_blank"
                className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-red-700"
              >
                <FaLocationDot className="mt-1 text-xl text-yellow-400" />

                <span className="leading-7">
                  2 Marylands Rd, Maida Hill,
                  London W9 2DZ,
                  United Kingdom
                </span>
              </a>

              <a
                href="tel:+447346860155"
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-red-700"
              >
                <FaPhone className="text-yellow-400" />

                <span>+44 7346 860155</span>
              </a>

              <a
                href="mailto:topschicken@email.com"
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-red-700"
              >
                <FaEnvelope className="text-yellow-400" />

                <span>topschicken@email.com</span>
              </a>
            </div>
          </div>

          {/* OPEN HOURS */}
          <div>
            <h3 className="mb-6 text-2xl font-black text-yellow-400">
              Opening Hours
            </h3>

            <div className="rounded-3xl bg-white/10 p-6">
              
              <div className="mb-5 flex items-center gap-3">
                <FaClock className="text-yellow-400" />

                <span className="font-bold">
                  Open 7 Days A Week
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Tuesday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Wednesday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Thursday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>12PM - 11PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12PM - 11PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-14 overflow-hidden rounded-[40px] border-4 border-yellow-400 shadow-2xl">
          <iframe
            title="TOPS CHICKEN Location"
            src="https://www.google.com/maps?q=2+Marylands+Rd,+Maida+Hill,+London+W9+2DZ,+United+Kingdom&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 bg-black py-6 text-center text-sm text-gray-400">
        © 2026 TOPS CHICKEN Peri Peri. All Rights Reserved.
      </div>
    </footer>
  );
}