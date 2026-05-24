import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-black via-red-950 to-black px-5 py-24 text-white md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[5px] text-yellow-300">
            Contact Us
          </p>

          <h2 className="mt-3 text-5xl font-black md:text-7xl">
            Visit TOPS CHICKEN
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-gray-300">
            Fresh peri peri chicken, burgers and wings in London. Order online
            or visit our restaurant today.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="rounded-[40px] bg-white p-8 text-black shadow-2xl">
            <h3 className="text-4xl font-black">
              Restaurant Information
            </h3>

            <div className="mt-10 space-y-6">
              <InfoCard
                icon={<FaMapMarkerAlt />}
                title="Location"
                value="2 Marylands Rd, Maida Hill, London W9 2DZ, United Kingdom"
              />

              <InfoCard
                icon={<FaPhoneAlt />}
                title="Phone Number"
                value="+44 7346 860155"
              />

              <InfoCard
                icon={<FaClock />}
                title="Opening Hours"
                value="12 PM – 11 PM"
              />
            </div>

            <div className="mt-10">
              <h4 className="text-2xl font-black">
                Follow Us
              </h4>

              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 px-6 py-4 font-black text-white transition hover:scale-105"
                >
                  <FaInstagram />
                  Instagram
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 rounded-full bg-black px-6 py-4 font-black text-white transition hover:scale-105"
                >
                  <FaTiktok />
                  TikTok
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 rounded-full bg-blue-500 px-6 py-4 font-black text-white transition hover:scale-105"
                >
                  <FaTwitter />
                  X / Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] shadow-2xl">
            <iframe
              title="TOPS CHICKEN Location"
              src="https://www.google.com/maps?q=2+Marylands+Rd,+London+W9+2DZ&output=embed"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="min-h-[600px] w-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="flex items-start gap-5 rounded-3xl bg-gray-100 p-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-2xl text-yellow-300">
        {icon}
      </div>

      <div>
        <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
          {title}
        </p>

        <h4 className="mt-2 text-xl font-black leading-8">
          {value}
        </h4>
      </div>
    </div>
  );
}