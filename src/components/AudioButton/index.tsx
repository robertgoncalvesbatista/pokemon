import { useCallback, useRef, useState } from "react";

import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

interface AudioButtonProps {
  link: string;
  label: string;
}

function AudioButton({ link, label }: AudioButtonProps) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      // @ts-ignore
      audioRef.current.volume = 0.5;

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
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "white",
          cursor: "pointer",
          minHeight: "32px",
          fontWeight: 700,
          fontSize: "10pt",
        }}
        onClick={handlePlayPause}
      >
        {isPlaying ? <IoVolumeMute size={18} /> : <IoVolumeHigh size={18} />} {label}
      </button>
    </>
  );
}

export default AudioButton;
