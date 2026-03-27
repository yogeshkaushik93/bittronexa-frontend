import { useState } from "react";
import { service1, service2, service3, check } from "../assets";
import { brainwaveServicesIcons } from "../constants";
import Heading from "../components/Heading";
import Generating from "../components/Generating";
import Section from "../components/Section";
import { curve } from "../assets";
import {
  Gradient,
  PhotoChatMessage,
  VideoBar,
  VideoChatMessage,
} from "../components/design/ServiceRelatedComponents";

const Services = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Section id="how-to-use">
      <div className="max-w-screen-xl mx-auto">
        <Heading
          title={
            <>
              Smart Arbitrage Trading for{" "}
              <span className="inline-block relative font-semibold">
                Everyone
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </>
          }
          text="Bittronexa simplifies earnings through automated arbitrage trading, structured income streams, and a powerful leadership model."
        />

        <div className="relative">
          {/* Service 1 */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[66rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Arbitrage Trading Engine"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4 text-5xl">Automated Arbitrage Engine</h4>
              <p className="body-2 mb-[3rem] text-2xl">
                Our system scans multiple markets to capture price differences and execute trades automatically.
              </p>
              <ul className="body-2">
                {[
                  "Live market price tracking",
                  "Automated buy & sell execution",
                  "System-driven profit calculation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center py-4 border-t border-n-6"
                  >
                    <img
                      src={check}
                      alt="check"
                      className="pointer-events-none w-16 select-none"
                    />
                    <p className="ml-4 text-xl">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Service 2 & 3 */}
          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            {/* Service 2 */}
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={service2}
                  alt="Income System"
                  className="h-full w-full object-cover pointer-events-none select-none"
                  width={630}
                  height={750}
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">8-Stream Income System</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Earn through Trading Profit, Level Income, Matching Income, Club Income, Rewards, and IB income.
                </p>
              </div>

              <PhotoChatMessage />
            </div>

            {/* Service 3 */}
            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Real-Time Performance Dashboard</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Monitor trades, income, team performance, and leadership rank growth from one dashboard.
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((icon, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-center rounded-2xl ${
                        i === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          i === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img
                          src={icon}
                          width={24}
                          height={24}
                          alt={`icon-${i}`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={service3}
                  className={`w-full h-full object-cover ${
                    isPlaying && "animate-pulse"
                  } pointer-events-none select-none`}
                  width={520}
                  height={400}
                  alt="Dashboard View"
                />

                <VideoChatMessage isPlaying={isPlaying} />
                <VideoBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
