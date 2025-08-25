import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

interface CountdownProps {
  countdownDate: string;
  homeUrl: string;
}

const Countdown: React.FC<CountdownProps> = ({ countdownDate, homeUrl }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(countdownDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setExpired(true);
        setTimeout(() => {
          window.location.href = homeUrl;
        }, 2000);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownDate, homeUrl]);

  return (
    <>
      <Head title="Countdown" />
      <div className="flex items-center justify-center min-h-screen bg-[#272046] text-white">
        <div className="countdown-container bg-[#cdd2f8] p-10 rounded-2xl shadow-xl max-w-2xl w-full text-center">
          <h1 className="text-2xl font-title font-bold text-[#272046] mb-8">
            Prêts à collaborer ?
          </h1>

          {!expired ? (
            <div className="countdown flex justify-center gap-6 flex-wrap">
              <div className="countdown-item bg-[#272046] px-6 py-8 rounded-lg min-w-[110px] shadow-inner">
                <div className="countdown-value text-4xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="countdown-label text-sm uppercase text-gray-300 mt-2">
                  Jours
                </div>
              </div>
              <div className="countdown-item bg-[#272046] px-6 py-8 rounded-lg min-w-[110px] shadow-inner">
                <div className="countdown-value text-4xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="countdown-label text-sm uppercase text-gray-300 mt-2">
                  Heures
                </div>
              </div>
              <div className="countdown-item bg-[#272046] px-6 py-8 rounded-lg min-w-[110px] shadow-inner">
                <div className="countdown-value text-4xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="countdown-label text-sm uppercase text-gray-300 mt-2">
                  Minutes
                </div>
              </div>
              <div className="countdown-item bg-[#272046] px-6 py-8 rounded-lg min-w-[110px] shadow-inner">
                <div className="countdown-value text-4xl font-bold text-white">
                  {timeLeft.seconds}
                </div>
                <div className="countdown-label text-sm uppercase text-gray-300 mt-2">
                  Secondes
                </div>
              </div>
            </div>
          ) : (
            <div className="expired-message mt-8 p-6 text-xl bg-[#272046] text-white rounded-lg">
              Merci pour votre patience, vivez maintenant l’expérience !
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Countdown;
