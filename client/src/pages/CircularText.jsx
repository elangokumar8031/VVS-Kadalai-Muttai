import { useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import Vinayaga from "../assets/vinayaga.svg";

const getRotationTransition = (duration, from) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  repeat: Infinity
});

const CircularText = ({
  text,
  spinDuration = 20,
  size = 56,          // 👈 NAVBAR SAFE SIZE
  className = ""
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const inverseRotation = useTransform(rotation, v => -v);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: getRotationTransition(spinDuration, start)
    });
  }, [spinDuration, controls, rotation]);

  const radius = size / 2 - 6;
  const fontSize = size * 0.18;
  const vinayagaSize = size * 0.32;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="relative rounded-full text-[#6b1f0e] font-bold"
        style={{ width: size, height: size, rotate: rotation }}
        animate={controls}
      >
        {/* VINAYAGA */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ rotate: inverseRotation }}
        >
          <div
            className="rounded-full"
            style={{ width: vinayagaSize, height: vinayagaSize }}
          >
            <div
              className="w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700"
              style={{
                WebkitMaskImage: `url(${Vinayaga})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center"
              }}
            />
          </div>
        </motion.div>

        {/* TEXT */}
        {letters.map((letter, i) => {
          const angle = (360 / letters.length) * i;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px)`,
                transformOrigin: "0 0",
                fontSize
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CircularText;
