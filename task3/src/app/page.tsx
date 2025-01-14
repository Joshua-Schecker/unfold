"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./globals.css";

export default function AnimatedPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isFullScreen = searchParams?.get("fullscreen") === "true";

  const handleExpand = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString() ?? "");
    newSearchParams.set("fullscreen", "true");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleShrink = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString() ?? "");
    newSearchParams.delete("fullscreen");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex h-full items-center flex-col">
      <h1>Header</h1>
      <motion.img
        src="/train-small.jpg"
        alt="Train"
        className="object-cover"
        animate={{
          height: isFullScreen ? "100vh" : "500px",
          zIndex: isFullScreen ? 1 : 2,
          position: isFullScreen ? "absolute" : "relative",
        }}
      />
      {!isFullScreen && (
        <div className="mt-5 text-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            in vestibulum lectus. Vivamus libero lorem, blandit a tellus sed,
            aliquet tincidunt velit.{" "}
          </p>
          <button
            onClick={handleExpand}
            className="mt-5 px-6 py-3 bg-white text-black border border-gray-300 rounded-lg cursor-pointer transition-all"
          >
            Expand Image
          </button>
        </div>
      )}
      {isFullScreen && (
        <button
          onClick={handleShrink}
          className="fixed top-5 left-5 px-6 py-3 bg-white text-black border border-gray-300 rounded-lg cursor-pointer z-10 shadow-lg"
        >
          Back
        </button>
      )}
    </div>
  );
}
