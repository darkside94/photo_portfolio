import { useRef, useState, useEffect } from "react";
// dynamically import all JPGs from the carousel folder
const images = (() => {
  // Vite glob - eager to get URLs at build time
  const modules = import.meta.glob("../assets/carousel/*.jpg", { eager: true }) as Record<string, { default: string }>;
  return Object.keys(modules).sort().map((k) => modules[k].default);
})();
import leftArrowSvg from "../assets/left-arrow.svg?raw";
import rightArrowSvg from "../assets/right-arrow.svg?raw";
import '../styles/Slider.css';

function Home() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderHeight, setSliderHeight] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateSliderHeight = () => {
      const sliderEl = sliderRef.current;
      if (!sliderEl) return;
      const mainEl = sliderEl.closest('main') as HTMLElement | null;
      if (mainEl) {
        // use clientHeight (excludes margins) so slides fit inside main
        setSliderHeight(mainEl.clientHeight);
      } else {
        // fallback to viewport height minus header (80px)
        setSliderHeight(window.innerHeight - 80);
      }
    };

    updateSliderHeight();
    window.addEventListener('resize', updateSliderHeight);
    return () => window.removeEventListener('resize', updateSliderHeight);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    // If images load later they change scrollWidth; listen for size changes
    let ro: ResizeObserver | null = null;
    try {
      const win = window as unknown as { ResizeObserver?: typeof ResizeObserver };
      if (typeof win.ResizeObserver === 'function') {
        ro = new ResizeObserver(update);
        ro.observe(el);
      }
    } catch {
      ro = null;
    }

    // Also listen for image load events inside the track (older browsers)
    const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach(img => img.addEventListener('load', update));

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      imgs.forEach(img => img.removeEventListener('load', update));
      if (ro) ro.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const distance = Math.round(el.clientWidth * 0.75) * dir; // scroll by ~75% of viewport of the track
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", alignItems: "stretch", height: "100%", width: "100%" }}>
      <div className="motto" style={{ color: "white", flex: "0 0 360px", boxSizing: 'border-box', paddingRight: '20px' }}>
        <h1>Vasylyna Nawrocka</h1>
        <p>
          Portrety studyjne tworzone z sercem, światłem i wizją, które zostają w
          pamięci
        </p>
      </div>

      <div
        className="slider"
        ref={sliderRef}
        style={{
          color: "white",
          position: "relative",
          flex: "1 1 auto",
          minWidth: 0,
          height: "100%"
        }}
      >
        {/* Track (scrollable) */}
        <div
          ref={trackRef}
          className="slider-track"
          style={{
            display: "flex",
            gap: "0",
            overflowX: "auto",
            padding: "0",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            alignItems: "stretch",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="slide-item"
              style={{
                flex: "0 0 auto",
                height: sliderHeight ? `${sliderHeight}px` : '100%', // fill slider/main height
                minWidth: "420px",
                overflow: "hidden",
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={src}
                alt={`slide-${i}`}
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        {/* Left icon button (always rendered, disabled when can't scroll left) */}
        <button
          aria-label="Scroll left"
          onClick={() => { if (canScrollLeft) scroll(-1); }}
          className={"icon-btn left" + (canScrollLeft ? "" : " disabled")}
          aria-disabled={!canScrollLeft}
        >
          <span className="icon-svg" dangerouslySetInnerHTML={{ __html: leftArrowSvg }} />
        </button>

        {/* Right icon button (always rendered, disabled when can't scroll right) */}
        <button
          aria-label="Scroll right"
          onClick={() => { if (canScrollRight) scroll(1); }}
          className={"icon-btn right" + (canScrollRight ? "" : " disabled")}
          aria-disabled={!canScrollRight}
        >
          <span className="icon-svg" dangerouslySetInnerHTML={{ __html: rightArrowSvg }} />
        </button>
      </div>
    </div>
  );
}

export default Home;
