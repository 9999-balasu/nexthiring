"use client";

import { useRef, useState, useEffect } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: JitsiMeetOptions) => JitsiMeetAPI;
  }
}

interface JitsiMeetOptions {
  roomName: string;
  width: string;
  height: string;
  parentNode: HTMLDivElement | null;
  userInfo: {
    displayName: string;
  };
}

interface JitsiMeetAPI {
  dispose: () => void;
}

interface VideoInterviewProps {
  roomId: string;
}

export default function VideoInterview({ roomId }: VideoInterviewProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const jitsiAPI = useRef<JitsiMeetAPI | null>(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  useEffect(() => {
    const loadJitsiScript = () => {
      if (typeof window !== "undefined" && !window.JitsiMeetExternalAPI) {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => setJitsiLoaded(true);
        script.onerror = () => console.error("Failed to load Jitsi API");
        document.body.appendChild(script);
      } else {
        setJitsiLoaded(true);
      }
    };

    loadJitsiScript();
  }, []);

  const startMeeting = () => {
    if (jitsiLoaded && window.JitsiMeetExternalAPI && jitsiContainerRef.current) {
      const domain = "meet.jit.si";
      const options: JitsiMeetOptions = {
        roomName: roomId,
        width: "100%",
        height: "500px",
        parentNode: jitsiContainerRef.current,
        userInfo: { displayName: "Candidate" },
      };

      jitsiAPI.current = new window.JitsiMeetExternalAPI(domain, options);
      setMeetingStarted(true);
    } else {
      console.error("Jitsi API is still loading or not available");
    }
  };

  const endMeeting = () => {
    if (jitsiAPI.current) {
      jitsiAPI.current.dispose();
      jitsiContainerRef.current!.innerHTML = ""; // Clear meeting
      setMeetingStarted(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Live Video Interview</h2>

      {!meetingStarted ? (
        <button
          onClick={startMeeting}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          disabled={!jitsiLoaded}
        >
          {jitsiLoaded ? "Join Meeting" : "Loading..."}
        </button>
      ) : (
        <button
          onClick={endMeeting}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          End Meeting
        </button>
      )}

      <div ref={jitsiContainerRef} className="mt-4 border border-gray-500 rounded-lg shadow-lg h-[500px]"></div>
    </div>
  );
}
