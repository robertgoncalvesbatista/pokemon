import { useCallback, useRef, useState } from "react";

import { AiFillSound } from "react-icons/ai";

function AudioButton({ link, label }: { link: string; label: string }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // @ts-ignore
        audioRef.current.pause();
      } else {
        // @ts-ignore
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, []);

  const handleEnded = useCallback(() => {
    console.log("Audio has ended");
    setIsPlaying(false);
  }, []);

  return (
    <>
      <audio ref={audioRef} onEnded={handleEnded}>
        <source src={link} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <button
        style={{
          background: "none",
          border: "none",
          marginRight: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: "white",
        }}
        onClick={handlePlayPause}
      >
        <AiFillSound size={20} color="white" /> {label}
      </button>
    </>
  );
}

export default AudioButton;
