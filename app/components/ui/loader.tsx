"use client";

import Lottie from "lottie-react";
import loader from "../../../public/lotties/loader.json";

export default function Loader() {
  return <Lottie autoplay loop animationData={loader} className="w-20 h-20" />;
}
