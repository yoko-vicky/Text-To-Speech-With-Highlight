import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './TextToSpeech.module.scss';

export const TextToSpeech = ({
  element,
  text,
}: {
  element: HTMLDivElement;
  text: string;
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  );
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState<number>(1);
  const [speed, setSpeed] = useState<number>(0.9);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const highlightBackground = (text: string) =>
    `<span style="background-color:pink;">${text}</span>`;

  const highlight = (text: string, from: number, to: number) => {
    let replacement = highlightBackground(text.slice(from, to));
    return text.substring(0, from) + replacement + text.substring(to);
  };

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else if (utterance) {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = speed;
      utterance.volume = volume;

      if (element && element.innerHTML) {
        utterance.addEventListener('boundary', (event) => {
          const { charIndex, charLength } = event;
          console.log({ event, charIndex, charLength });

          element.innerHTML = highlight(
            text,
            charIndex,
            charIndex + charLength,
          );
        });
      }
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices();
    const newVoice = voices.find((v) => v.name === event.target.value);
    setVoice(newVoice ? newVoice : null);
  };

  const handlePitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleSpeedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className={styles.textToSpeech}>
      <div className={styles.items}>
        <label className={styles.item}>
          <span className={styles.label}>Voice</span>
          <select
            value={voice?.name}
            onChange={handleVoiceChange}
            className={styles.select}
          >
            {window.speechSynthesis.getVoices().map((voice) => (
              <option
                key={voice.name}
                value={voice.name}
                className={styles.option}
              >
                {voice.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.item}>
          <span className={styles.label}>Pitch</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
            className={styles.range}
          />
        </label>
        <label className={styles.item}>
          <span className={styles.label}>Speed</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
            className={styles.range}
          />
        </label>
        <label className={styles.item}>
          <span className={styles.label}>Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.range}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <button onClick={handlePlay} className={styles.button}>
          {isPaused ? 'Resume' : 'Play'}
        </button>
        <button onClick={handlePause} className={styles.button}>
          Pause
        </button>
        <button onClick={handleStop} className={styles.button}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
