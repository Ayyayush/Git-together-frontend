import { createPortal } from "react-dom";
import { FaCrown, FaCheckCircle, FaTimes, FaRocket } from "react-icons/fa";

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

const PremiumModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">

      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#11151D] p-5 sm:p-8 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-5 sm:top-5 text-gray-400 hover:text-white transition p-1 z-10"
          aria-label="Close modal"
        >
          <FaTimes size={22} />
        </button>

        {/* Heading Area with TOP COMING SOON BADGE */}
        <div className="text-center mt-2 sm:mt-0 flex flex-col items-center">

          {/* MAIN COMING SOON BADGE ABOVE TITLE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4">
            <FaRocket className="text-xs" />
            <span>Coming Soon</span>
          </div>

          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-500/20 mb-3 sm:mb-4">
            <FaCrown className="text-yellow-400 text-2xl sm:text-3xl" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            GitTogether Premium
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Unlock premium features and support GitTogether.
          </p>

        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 sm:mt-10">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >

              <div>
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 sm:mb-5`}
                >
                  <FaCrown className="text-white text-lg sm:text-xl" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {plan.name}
                </h3>

                <div className="mt-3 sm:mt-4 flex items-end gap-2">
                  <span className="text-3xl sm:text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  Valid for {plan.duration}
                </p>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm sm:text-base text-gray-300"
                    >
                      <FaCheckCircle className="text-green-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disabled Action Button for both */}
              <button
                disabled
                className="mt-8 sm:mt-10 w-full rounded-xl bg-gray-700/50 border border-white/5 py-3 text-gray-400 font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>,
    document.body
  );
};

export default PremiumModal;