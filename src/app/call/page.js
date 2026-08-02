import Image from "next/image";
import Button from "@/components/Button";

const callButtons = [
  { id: "microphone", icon: "/mail.svg", link: "mailto:email@example.com" },
  {
    id: "speaker",
    icon: "/google.svg",
    link: "google-mailto:email@example.com",
  },
  { id: "phone", icon: "/phone.svg", link: "tel:+1234567890" },
];
export function CallButtons() {}
return (
  <div className="flex gap-3">
    {callButtons.map((btn) => (
      <Button
        key={btn.id}
        type="button"
        variant="primary"
        className="w-fit rounded-full flex items-center px-3 py-3"
      >
        {btn.link ? (
          <a href={btn.link} target="_blank" rel="noopener noreferrer">
            <img src={btn.icon} className="w-5 h-5" />
          </a>
        ) : (
          <img src={btn.icon} className="w-5 h-5" />
        )}
      </Button>
    ))}
  </div>
);

export default function CallPage() {
  return (
    <section
      id="splashpage"
      className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 py-8 bg-black"
    >
      <Image
        fill
        priority
        src="/splash.png"
        alt="background"
        sizes="100vw"
        className="object-cover object-center pointer-events-none z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md md:max-w-xl text-center gap-4 sm:gap-6">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide text-center">
          Hotline Call
        </h4>
        <p className="text-white text-center text-sm md:text-base mt-2">
          Manage your personal profile, notification preferences, and app
          settings. Connected to live emergency calls. Your location is being
          securely monitored.
        </p>
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 my-2 aspect-square">
          <Image
            fill
            src="/logo-white.png"
            alt="logo"
            sizes="(max-width: 768px) 192px, (max-width: 1200px) 256px, 320px"
            className="object-contain pointer-events-none"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm">
          <h5 className="text-sm sm:text-base md:text-lg font-normal text-white">
            Quote
          </h5>
          <CallButtons />
        </div>
      </div>
    </section>
  );
}
