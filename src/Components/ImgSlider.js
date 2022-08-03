import SimpleImageSlider from "react-simple-image-slider";
import React from "react";
import { debounce } from "../Utils/Sorting";

export default function CustomImageSlider({ images }) {
  const [options, setOptions] = React.useState({ width: 0, height: 0 });
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [updateDimensions] = React.useState(() => debounce(() => setOptions({
    width: window.innerWidth,
    height: window.innerHeight - 115
  })));

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOptions({
        width: window.innerWidth,
        height: window.innerHeight - 115
      })
    }
  }, []);

  if (typeof document !== "undefined") {
    window.addEventListener('resize', updateDimensions);
  }

  const onlyImageUrl = images.map(img => img.url);
  const slideCompleted = (e) => setSlideIndex(e - 1)

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      <div className="absolute z-0 top-0 left-0 right-0 bottom-0 w-screen h-auto">
        <SimpleImageSlider
          width={options.width}
          height={options.height}
          images={onlyImageUrl}
          showBullets={false}
          showNavs={true}
          autoPlay={true}
          slideDuration={3}
          loop={true}
          useGPURender={true}
          onStartSlide={slideCompleted}
        />
      </div>
      <div key={images[slideIndex]?.url} className="h-[85vh] overflow-hidden absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.35)] pointer-events-none">
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-white animate-fadeIn font-poppins flex justify-center items-center flex-col">
            <span className="text-4xl md:text-5xl lg:text-6xl uppercase mb-2">{images[slideIndex]?.heading}</span>
            <span className="text-md">{images[slideIndex]?.subheading}</span>
          </div>
        </div>
      </div>
    </div>

  )
}