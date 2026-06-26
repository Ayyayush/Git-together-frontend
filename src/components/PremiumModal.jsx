import { FaCrown, FaCheckCircle, FaTimes } from "react-icons/fa";

const plans = [
  {
    name: "Silver",
    price: "₹199",
    duration: "30 Days",
    color: "from-slate-400 to-slate-600",
    features: [
      "Premium Badge",
      "Priority Support",
      "Early Access Features",
    ],
  },
  {
    name: "Gold",
    price: "₹499",
    duration: "365 Days",
    color: "from-yellow-400 to-orange-500",
    features: [
      "Everything in Silver",
      "Profile Boost",
      "Future Premium Features",
      "Priority Visibility",
    ],
  },
];

const PremiumModal = ({ isOpen, onClose, onBuy }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#11151D] p-8 shadow-2xl">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white transition"
        >
          <FaTimes size={22} />
        </button>

        {/* Heading */}

        <div className="text-center">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
            <FaCrown className="text-yellow-400 text-3xl" />
          </div>

          <h2 className="text-4xl font-bold text-white">
            GitTogether Premium
          </h2>

          <p className="mt-3 text-gray-400">
            Unlock premium features and support GitTogether.
          </p>

        </div>

        {/* Plans */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:border-indigo-500/40 transition-all hover:-translate-y-1"
            >

              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-5`}
              >
                <FaCrown className="text-white text-xl" />
              </div>

              <h3 className="text-3xl font-bold text-white">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-end gap-2">

                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>

              </div>

              <p className="text-gray-400 mt-2">
                Valid for {plan.duration}
              </p>

              <div className="mt-8 space-y-4">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <FaCheckCircle className="text-green-400" />
                    <span>{feature}</span>
                  </div>

                ))}

              </div>

              <button
                onClick={() => onBuy(plan.name)}
                className={`mt-10 w-full rounded-xl bg-gradient-to-r ${plan.color} py-3 text-white font-semibold transition hover:scale-[1.02]`}
              >
                Buy {plan.name}
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default PremiumModal;