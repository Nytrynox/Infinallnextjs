interface PromptMarqueeProps {
  onPromptClick: (prompt: string) => void;
}

export function PromptMarquee({ onPromptClick }: PromptMarqueeProps) {
  const prompts1 = [
    "Build a SaaS dashboard with real-time analytics",
    "Design a poster for fashion brand launch campaign",
    "Create an e-commerce platform like Shopify but simpler",
    "Generate a marketing video script for tech product",
    "Design a social media app for creative professionals",
    "Create Instagram carousel content for product launch",
    "Build a project management tool with Kanban boards",
    "Design promotional banners for Black Friday sale"
  ];

  const prompts2 = [
    "Generate a food delivery app with restaurant listings",
    "Create YouTube thumbnail designs for tech channel",
    "Build a booking system for hotels and travel",
    "Design a poster for music festival event",
    "Create an AI-powered productivity assistant",
    "Generate video ads for social media marketing",
    "Design a fitness tracking app with workout plans",
    "Create infographics explaining blockchain technology",
    "Build a real-time chat application with WebSocket",
    "Design email newsletter templates for e-commerce"
  ];

  return (
    <div className="relative w-full space-y-4 py-4">
      {/* First Row - Scroll Left */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="flex gap-4 animate-marquee-left will-change-transform">
          {[...prompts1, ...prompts1, ...prompts1, ...prompts1, ...prompts1, ...prompts1].map((prompt, index) => (
            <button
              key={`row1-${index}`}
              onClick={() => onPromptClick(prompt)}
              className="flex-shrink-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl px-6 py-3 text-[#C5D0DA] whitespace-nowrap hover:bg-white/[0.04] hover:text-[#00C2FF] transition-all duration-300 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Second Row - Scroll Right */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="flex gap-4 animate-marquee-right will-change-transform">
          {[...prompts2, ...prompts2, ...prompts2, ...prompts2, ...prompts2, ...prompts2].map((prompt, index) => (
            <button
              key={`row2-${index}`}
              onClick={() => onPromptClick(prompt)}
              className="flex-shrink-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl px-6 py-3 text-[#C5D0DA] whitespace-nowrap hover:bg-white/[0.04] hover:text-[#00C2FF] transition-all duration-300 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}