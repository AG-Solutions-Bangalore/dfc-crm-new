import React from "react";
import Header from "./Header";
import CompanyCard from "./CompanyCard";
import FeatureStrip from "./FeatureStrip";
import logisticsTruck from "../../assets/Companylogo/Sunset Highway LPG Transporter.png";

const AuthPageShell = ({ children }) => {
  const companyCards = [
    {
      iconType: "truck",
      title: "DELHI FREIGHT CARRIERS",
      subtitle: "Reliable Surface Transportation",
      theme: "orange",
    },
    {
      iconType: "boxes",
      title: "DIFCY LOGISTICS LTD",
      subtitle: "End-to-End Logistics Solutions",
      theme: "navy",
    },
    {
      iconType: "road",
      title: "AKASH ROADLINES PVT LTD",
      subtitle: "Pan India Road Transportation",
      theme: "orange",
    },
  ];

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f5f7fa] font-poppins text-slate-900"
      style={{
        backgroundImage: `url("${logisticsTruck}")`,
        backgroundSize: "cover",
        backgroundPosition: "99% center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="relative z-10 flex min-h-[690px] flex-col pb-[90px] lg:min-h-screen lg:w-[calc(100%-370px)] lg:pb-[90px]">
        <header className="px-6 pt-7 sm:px-10 sm:pt-9 lg:px-10 xl:px-12">
          <Header />
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 lg:px-10 lg:py-4 xl:px-12">
          <div className="mb-6 max-w-[620px]">
            <h1 className="font-montserrat text-3xl font-black uppercase leading-[1.03] tracking-tight text-[#0a1d3d] sm:text-4xl xl:text-[2.2rem]">
              <span className="block">Trusted</span>
              <span className="block text-[#f56616]">Logistics partner</span>
              <span className="block">for a stronger tomorrow</span>
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#243b59] sm:text-[10px]">
              <span>Transportation</span>
              <span className="text-[#f56616]">|</span>
              <span>Logistics</span>
              <span className="text-[#f56616]">|</span>
              <span>Roadlines</span>
              <span className="text-[#f56616]">|</span>
              <span>Supply chain</span>
            </div>
          </div>

          <div className="flex w-full max-w-[350px] flex-col gap-2">
            {companyCards.map((card) => (
              <CompanyCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-5 z-20 w-[70%] max-w-[900px]">
          <FeatureStrip className="w-full" />
        </div>
      </section>

      <section className="relative z-20 flex items-center justify-center bg-white px-5 py-10 sm:px-8 lg:absolute lg:bottom-[6.5vh] lg:right-4 lg:top-[6.5vh] lg:w-[360px] lg:bg-transparent lg:px-0 lg:py-0">
        <div className="w-full max-w-[360px]">
          {children}
          <p className="mt-5 text-center text-xs font-bold text-[#F56616]">
            Built for the road ahead
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthPageShell;
