export default function Offers() {

  return (
    <div className="min-h-screen bg-black px-5 pt-32 text-white">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black text-yellow-300">
          Special Offers
        </h1>

        <div className="mt-10 grid gap-7 md:grid-cols-3">

          {[
            "Peri Peri Meal £2.99",
            "Family Platter £14.99",
            "Burger Deal £5.99",
          ].map((offer) => (

            <div
              key={offer}
              className="rounded-3xl bg-red-700 p-8 shadow-2xl transition hover:scale-105"
            >

              <h2 className="text-3xl font-black">
                {offer}
              </h2>

              <p className="mt-3 text-gray-100">
                Fresh halal chicken with premium taste.
              </p>

              <button className="mt-6 rounded-full bg-yellow-400 px-6 py-3 font-black text-black">
                Order Offer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}