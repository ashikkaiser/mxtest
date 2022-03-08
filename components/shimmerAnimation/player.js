import React, { useRef } from "react";

export default function Player({width, height, src}) {
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoplay
          
          loop
          mode="normal"
          src={src}
          style={{ width: width, height: height,}}
        ></lottie-player>
  );
}