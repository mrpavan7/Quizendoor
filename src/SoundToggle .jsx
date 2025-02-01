import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SoundToggle = ({ isMuted, toggleSound }) => {
  return (
    <button
      onClick={toggleSound}
      className="bg-amber-700 hover:bg-amber-800 text-white p-3 cursor-pointer rounded-full
      transform transition-all duration-200 hover:scale-110 shadow-lg border-2 border-amber-900
      group"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
      <span
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 
        bg-amber-900 text-white px-3 py-1 rounded-lg text-sm font-medieval
        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        {isMuted ? "Summon Sounds" : "Silence Sounds"}
      </span>
    </button>
  );
};

export default SoundToggle;
