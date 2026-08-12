import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.5 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.5 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offsetX = (clientX - centerX) * 0.3;
    const offsetY = (clientY - centerY) * 0.3;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
    >
      {href ? <a href={href}>{children}</a> : children}
    </motion.div>
  );
}
