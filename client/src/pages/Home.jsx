import {
  FaBullhorn,
  FaFire,
  FaLeaf,
  FaMotorcycle,
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import homeBg from "../assets/newbackgroundpict.png";
import logo from "../assets/logo.png";

import MenuSection from "../components/MenuSection";
import OffersSection from "../components/OffersSection";
import TrackingSection from "../components/TrackingSection";

const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Tops+Chicken+2+Marylands+Rd+Maida+Hill+London+W9+2DZ+United+Kingdom";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section
        id="home"
        className="hero-section relative min-h-screen overflow-hidden bg-black"
      >
        <div
          className="hero-bg absolute inset-0"
          style={{ backgroundImage: `url(${homeBg})` }}
        ></div>

        <div className="absolute inset-0 bg-black/60 md:bg-black/45"></div>

        <div className="relative z-10 flex min-h-screen items-start px-6 pt-40 sm:px-10 sm:pt-44 md:px-16 md:pt-48 lg:px-24 lg:pt-52">
          <div className="max-w-2xl text-white lg:ml-10 xl:ml-16">
            <a
              href="#offers"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-xs font-black text-black shadow-2xl transition hover:scale-105 sm:text-sm"
            >
              <FaBullhorn />
              Today Special Offers
            </a>

            <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl md:text-7xl">
              TOPS CHICKEN
              <span className="block text-yellow-300">Peri Peri</span>
            </h1>

            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              Fresh • Halal • Hot
            </h2>

            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-gray-100 sm:text-lg md:text-xl">
              UK style peri peri chicken with fast delivery, fresh halal meals,
              burgers, wraps, wings and amazing family offers.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#menu"
                className="rounded-full bg-red-700 px-8 py-4 text-center text-sm font-black text-white shadow-2xl transition hover:scale-105 hover:bg-red-800 sm:text-base"
              >
                Order Now
              </a>

              <a
                href="#menu"
                className="rounded-full bg-yellow-400 px-8 py-4 text-center text-sm font-black text-black shadow-2xl transition hover:scale-105 hover:bg-white sm:text-base"
              >
                View Menu
              </a>

              <a
                href="#offers"
                className="rounded-full border-2 border-white px-8 py-4 text-center text-sm font-black text-white transition hover:scale-105 hover:bg-white hover:text-black sm:text-base"
              >
                See Offers
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-red-950 to-black px-5 py-16 text-white md:px-14">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Fresh Taste, Fast Service
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Premium UK-style halal chicken restaurant with bold flavour, fast
              service and family meals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <FaFire />,
                title: "Hot Peri Peri",
                text: "Bold grilled flavour with spicy peri peri taste.",
              },
              {
                icon: <FaLeaf />,
                title: "100% Halal",
                text: "Fresh halal chicken prepared every day.",
              },
              {
                icon: <FaMotorcycle />,
                title: "Fast Delivery",
                text: "Quick delivery and easy collection service.",
              },
              {
                icon: <FaStar />,
                title: "Best Offers",
                text: "Family meals, burger boxes and value deals.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[32px] border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md transition hover:-translate-y-2"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-yellow-400 text-4xl text-black shadow-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-2xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-7 text-gray-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MenuSection />
      <OffersSection />
      <TrackingSection />

      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-b from-black via-red-950 to-black px-4 py-20 text-white sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
              Contact & Location
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              Visit TOPS CHICKEN London
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-gray-300 md:text-lg">
              2 Marylands Rd, Maida Hill, London W9 2DZ, United Kingdom
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[34px] bg-white p-5 text-black shadow-2xl sm:p-7">
              <h3 className="text-3xl font-black">Restaurant Details</h3>

              <div className="mt-6 grid gap-4">
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-3xl bg-gray-100 p-5 transition hover:bg-red-50"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-700 text-2xl text-yellow-300">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[3px] text-red-700">
                      Address
                    </p>

                    <h4 className="mt-2 text-lg font-black leading-7">
                      TOPS CHICKEN, 2 Marylands Rd, Maida Hill, London W9 2DZ,
                      United Kingdom
                    </h4>
                  </div>
                </a>

                <a
                  href="tel:+447346860155"
                  className="flex items-start gap-4 rounded-3xl bg-gray-100 p-5 transition hover:bg-red-50"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-700 text-2xl text-yellow-300">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[3px] text-red-700">
                      Phone
                    </p>

                    <h4 className="mt-2 text-lg font-black leading-7">
                      +44 7346 860155
                    </h4>
                  </div>
                </a>

                <button
                  onClick={() => openWhatsApp()}
                  className="flex items-start gap-4 rounded-3xl bg-gray-100 p-5 text-left transition hover:bg-green-50"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-2xl text-white">
                    <FaWhatsapp />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[3px] text-green-700">
                      WhatsApp
                    </p>

                    <h4 className="mt-2 text-lg font-black leading-7">
                      +44 7346 860155
                    </h4>
                  </div>
                </button>

                <div className="flex items-start gap-4 rounded-3xl bg-gray-100 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-700 text-2xl text-yellow-300">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[3px] text-red-700">
                      Opening Hours
                    </p>

                    <h4 className="mt-2 text-lg font-black leading-7">
                      Daily: 12 PM - 11 PM
                    </h4>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-700 px-6 py-4 text-center font-black text-white shadow-xl transition hover:scale-105 hover:bg-black"
                >
                  Open Google Maps
                </a>

                <button
                  onClick={() => openWhatsApp()}
                  className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-4 text-center font-black text-white shadow-xl transition hover:scale-105 hover:bg-black"
                >
                  <FaWhatsapp />
                  WhatsApp Order
                </button>
              </div>

              <div className="mt-7">
                <h3 className="text-2xl font-black">Follow Us</h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a className="flex items-center gap-2 rounded-full bg-pink-600 px-5 py-3 font-black text-white shadow-xl">
                    <FaInstagram /> Instagram
                  </a>

                  <a className="flex items-center gap-2 rounded-full bg-black px-5 py-3 font-black text-white shadow-xl">
                    <FaTiktok /> TikTok
                  </a>

                  <a className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 font-black text-white shadow-xl">
                    <FaTwitter /> X / Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[34px] bg-white p-2 shadow-2xl">
              <iframe
                title="TOPS CHICKEN London Location"
                src="https://www.google.com/maps?q=Tops+Chicken+2+Marylands+Rd+Maida+Hill+London+W9+2DZ+United+Kingdom&output=embed"
                width="100%"
                height="520"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-[28px] border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gradient-to-br from-black via-red-950 to-black text-white shadow-2xl">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="TOPS CHICKEN"
                  className="h-20 w-20 rounded-full bg-white object-contain p-2 shadow-2xl"
                />

                <div>
                  <h2 className="text-3xl font-black text-yellow-300">
                    TOPS CHICKEN
                  </h2>

                  <p className="font-bold text-red-400">Peri Peri London</p>
                </div>
              </div>

              <p className="mt-5 leading-8 text-gray-300">
                Premium halal peri peri restaurant with burgers, wraps, wings
                and family meals in London.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-yellow-300">
                Quick Links
              </h3>

              <div className="mt-5 flex flex-col gap-4 font-bold text-gray-300">
                <a href="#home" className="hover:text-yellow-300">Home</a>
                <a href="#menu" className="hover:text-yellow-300">Menu</a>
                <a href="#offers" className="hover:text-yellow-300">Offers</a>
                <a href="#tracking" className="hover:text-yellow-300">Tracking</a>
                <a href="#contact" className="hover:text-yellow-300">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-yellow-300">
                Location
              </h3>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block leading-8 text-gray-300 hover:text-yellow-300"
              >
                TOPS CHICKEN
                <br />
                2 Marylands Rd,
                <br />
                Maida Hill,
                <br />
                London W9 2DZ
              </a>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full bg-red-700 px-5 py-3 font-black text-white transition hover:bg-yellow-400 hover:text-black"
              >
                Open Map
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-black text-yellow-300">
                Contact & Hours
              </h3>

              <div className="mt-5 space-y-4">
                <a
                  href="tel:+447346860155"
                  className="block rounded-3xl bg-white/10 p-4 hover:bg-red-700"
                >
                  <p className="text-sm font-black uppercase tracking-[3px] text-yellow-300">
                    Phone
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    +44 7346 860155
                  </h4>
                </a>

                <button
                  onClick={() => openWhatsApp()}
                  className="w-full rounded-3xl bg-green-600 p-4 text-left hover:bg-green-700"
                >
                  <p className="text-sm font-black uppercase tracking-[3px] text-white">
                    WhatsApp
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    +44 7346 860155
                  </h4>
                </button>

                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm font-black uppercase tracking-[3px] text-yellow-300">
                    Opening Hours
                  </p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    12 PM - 11 PM
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black px-5 py-5 text-center">
          <p className="font-bold text-gray-400">
            © 2026 TOPS CHICKEN London — Premium Restaurant Website
          </p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </main>
  );
}

function openWhatsApp() {
  const phone = "447346860155";
  const message = "Hello TOPS CHICKEN, I want to place an order.";
  const encodedMessage = encodeURIComponent(message);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  } else {
    window.open(
      `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
      "_blank"
    );
  }
}

function FloatingWhatsApp() {
  return (
    <button
      onClick={() => openWhatsApp()}
      className="fixed bottom-5 right-5 z-[999] flex items-center gap-3 rounded-full bg-green-600 px-5 py-4 text-white shadow-2xl ring-4 ring-white/20 transition duration-300 hover:scale-110 hover:bg-green-700 sm:bottom-7 sm:right-7"
    >
      <FaWhatsapp className="text-3xl" />

      <span className="hidden text-sm font-black sm:block">
        WhatsApp Order
      </span>

      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-yellow-400"></span>
      </span>
    </button>
  );
}