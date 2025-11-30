"use client";

import { useRef, useState } from "react";
import { TriggerBtn } from "@/components/TriggerBtn";
import { Microphone, Bin, Voice } from "@/components/Icons";
import { useFlashCardStore } from "@/store/uploadFlashCardstore";

export default function AudioRecorder() {
  const {
    currentWord,
    status,
    startRecording,
    stopRecording,
    getWordAudio,
    clearAudio,
  } = useFlashCardStore();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Start recoring Audio
  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      recorder.stop();

      stream.getTracks().forEach((track) => track.stop());
      await stopRecording(blob);
    };

    recorder.start();

    startRecording();
  };

  // Stop recording Audio
  const handleStop = () => {
    mediaRecorderRef?.current?.stop();
  };

  // Delete recorded Audio
  const handleDeleteAudio = () => {
    const audioId = currentWord?.audioId;
    if (audioId) clearAudio(audioId);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayPause = async () => {
    if (!audioRef.current) {
      const file = await getWordAudio();
      if (!file) return;

      const url = URL.createObjectURL(file);
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {status === "idle" && (
        <div onClick={handleStart}>
          <TriggerBtn icon={Microphone} label="ضبط" />
        </div>
      )}

      {status === "recording" && (
        <div onClick={handleStop}>
          <TriggerBtn
            icon={() => (
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            )}
            label="در حال ضبط"
          />
        </div>
      )}

      {status === "recorded" && (
        <div className="flex flex-row-reverse gap-1">
          <div onClick={handleDeleteAudio}>
            <TriggerBtn icon={Bin} label="حذف صدا" />
          </div>
          <div onClick={handlePlayPause}>
            <TriggerBtn icon={Voice} label="پخش" />
          </div>
        </div>
      )}
    </div>
  );
}
