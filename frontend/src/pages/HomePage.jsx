import React from "react";
import Hero from "../components/common/Hero";
import SocialProof from "../components/common/SocialProof";
import Integration from "../components/common/Integration";
import Features from "../components/common/Features";
import UseCases from "../components/common/UseCases";
import FAQ from "../components/common/Faq";
import CTA from "../components/common/Cta";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <Integration />
      <Features />
      <UseCases />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default HomePage;
