import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; dir?: "up" | "left" | "right"; delay?: number; as?: "div" | "section" };

export default function Reveal({ children, className = "", dir = "up", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const base = dir === "left" ? "reveal-left" : dir === "right" ? "reveal-right" : "reveal";
  const Tag = as as "div";
  return <Tag ref={ref} className={`${base} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
