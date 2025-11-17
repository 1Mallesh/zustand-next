"use client";

interface BannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  show?: boolean;
}

export default function Banner({
  title,
  subtitle,
  description,
  show,
}: BannerProps) {
  if (!show) return null;

  return (
    <section className="w-full py-14 sm:py-20 bg-gray-900 text-white animate-fadeIn">
      <div
        className="
          max-w-[1600px] 
          mx-auto 
          px-2 sm:px-4 lg:px-10 
          text-center
        "
      >
        <h1
          className="
            text-2xl sm:text-4xl md:text-6xl 
            font-bold 
            opacity-0 
            animate-slideDown
          "
        >
          {title}
        </h1>

        <p
          className="
            text-base sm:text-lg md:text-xl 
            mt-4 
            opacity-0 
            animate-fadeInSlow
          "
        >
          {subtitle}
        </p>

        <p
          className="
            mt-6 
            max-w-2xl 
            mx-auto 
            opacity-0 
            text-sm sm:text-base md:text-lg 
            animate-fadeInSlow2
          "
        >
          {description}
        </p>
      </div>
    </section>
  );
}
