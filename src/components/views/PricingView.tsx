import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';

interface PricingPageProps {
  onBackToHome: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise?: () => void;
  onNavigateToCommunity?: () => void;
}

export function PricingPage({ onBackToHome, onNavigateToPricing, onNavigateToAIAgents, onNavigateToEnterprise, onNavigateToCommunity }: PricingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 20,
      annualPrice: 16,
      description: 'Perfect for individuals and small projects',
      features: [
        '100 AI generations per month',
        'Basic templates',
        'Community support',
        'Export to code',
        'Standard processing speed'
      ],
      notIncluded: [
        'Priority support',
        'Custom AI training',
        'Team collaboration'
      ],
      popular: false,
      buttonText: 'Get Started'
    },
    {
      name: 'Professional',
      monthlyPrice: 50,
      annualPrice: 40,
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited AI generations',
        'Premium templates',
        'Priority support',
        'Export to code',
        'Fast processing speed',
        'Team collaboration (5 seats)',
        'Custom branding',
        'Advanced analytics'
      ],
      notIncluded: [],
      popular: true,
      buttonText: 'Get Started'
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited everything',
        'Custom AI training',
        'Dedicated account manager',
        'Priority support 24/7',
        'Export to code',
        'Ultra-fast processing',
        'Unlimited team seats',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment'
      ],
      notIncluded: [],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods through Razorpay including Credit Cards (Visa, Mastercard, American Express), Debit Cards, UPI, Net Banking, and popular digital wallets. All payments are processed securely with industry-standard encryption."
    },
    {
      question: "How does billing work for subscriptions?",
      answer: "Your subscription is billed automatically at the start of each billing cycle (monthly or annually). You'll receive an invoice via email after each successful payment. You can view all your invoices and payment history in your account dashboard."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle. When downgrading, the change will take effect at the start of your next billing cycle."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 14-day money-back guarantee for first-time subscribers. If you're not satisfied with Infinall, contact our support team within 14 days of your initial purchase for a full refund. Refunds are processed through Razorpay and typically take 5-7 business days to reflect in your account."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! We use Razorpay as our payment processor, which is PCI DSS Level 1 compliant - the highest level of payment security certification. Your payment information is encrypted and never stored on our servers."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Once canceled, you'll continue to have access to your plan features until the end of your current billing period. No further charges will be made after cancellation."
    }
  ];

  return (
    <>
      <Starfield />
      <div className="min-h-screen bg-transparent relative overflow-hidden z-10">
        <Navigation onNavigateToPricing={onNavigateToPricing} onNavigateToAIAgents={onNavigateToAIAgents} onNavigateToEnterprise={onNavigateToEnterprise} onNavigateToCommunity={onNavigateToCommunity} onLogoClick={onBackToHome} onNavigateToLogin={undefined} onNavigateToSignup={undefined} />

        {/* Back Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[#C5D0DA] hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-[#FFFFFF] text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 font-['Montserrat',sans-serif]">
              Simple, transparent pricing
            </h1>
            <p className="text-[#C5D0DA] text-lg md:text-xl leading-relaxed">
              Choose the perfect plan for your needs. All plans include access to our powerful AI agents.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <span className={`text-sm transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingPeriod === 'annual' ? 'bg-[#00C2FF]' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{
                  left: billingPeriod === 'annual' ? '30px' : '2px'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm transition-colors ${billingPeriod === 'annual' ? 'text-white' : 'text-white/60'}`}>
                Annual
              </span>
              <span className="text-xs bg-[#00C2FF]/20 text-[#00C2FF] px-2 py-1 rounded-full">
                Save 20%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-[#00C2FF] px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,194,255,0.4)]">
                      <span className="text-black font-bold text-xs uppercase tracking-wider">Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`relative bg-white/[0.02] backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
                  plan.popular 
                    ? 'border-[#00C2FF]/50 shadow-lg shadow-[#00C2FF]/10' 
                    : 'border-white/[0.08] hover:border-white/[0.15]'
                } p-8 h-full flex flex-col`}>
                  
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-xl text-white mb-2">{plan.name}</h3>
                    <p className="text-white/60 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.monthlyPrice !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl text-white">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                        </span>
                        <span className="text-white/60">/month</span>
                      </div>
                    ) : (
                      <div className="text-5xl text-white">Custom</div>
                    )}
                    {plan.monthlyPrice !== null && billingPeriod === 'annual' && (
                      <p className="text-white/60 text-sm mt-2">
                        Billed annually (${(plan.annualPrice || 0) * 12})
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-xl transition-all mb-8 group font-bold text-sm ${
                    plan.popular
                      ? 'bg-[#00C2FF] hover:bg-[#72D4FF] text-black shadow-lg shadow-[#00C2FF]/20 hover:shadow-[#00C2FF]/40'
                      : 'bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.1] hover:border-[#00C2FF]/30'
                  }`}>
                    {plan.buttonText}
                  </button>

                  {/* Features */}
                  <div className="space-y-3 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00C2FF]/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#00C2FF]" />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.length > 0 && plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.05] flex items-center justify-center mt-0.5">
                          <X className="w-3 h-3 text-white/30" />
                        </div>
                        <span className="text-white/40 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10 border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-6 py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4 font-['Montserrat',sans-serif]">
                Frequently asked questions
              </h2>
              <p className="text-[#C5D0DA] text-lg">
                Everything you need to know about pricing and billing
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-white pr-8">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        openFaqIndex === index ? 'text-[#00C2FF]' : 'text-white/60'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <div className="border-t border-white/[0.08] pt-4">
                            <p className="text-white/80 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-16"
            >
              <p className="text-[#C5D0DA] mb-6">
                Still have questions? Our support team is here to help.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#00C2FF]/50 rounded-lg transition-all text-white group">
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <FooterSection 
          onNavigateToPricing={onNavigateToPricing}
          onNavigateToEnterprise={onNavigateToEnterprise}
          onNavigateToAIAgents={onNavigateToAIAgents}
          onNavigateToCommunity={onNavigateToCommunity}
        />
      </div>
    </>
  );
}
