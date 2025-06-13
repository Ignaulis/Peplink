"use client";

import Lottie from "lottie-react";
import sandClock from "../../../public/lotties/sandclock.json";

export default function SandClock() {
  return (
    <Lottie autoplay loop animationData={sandClock} className="w-10 h-10" />
  );
}
