import { useState, useCallback, useRef } from "react";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

export function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggle = useCallback(() => {
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Голосовой ввод не поддерживается в этом браузере");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, onTranscript]);

  return (
    <button
      onClick={toggle}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        listening
          ? "bg-destructive text-destructive-foreground animate-pulse"
          : "bg-secondary text-secondary-foreground"
      }`}
      aria-label={listening ? "Остановить запись" : "Голосовой поиск"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
}
