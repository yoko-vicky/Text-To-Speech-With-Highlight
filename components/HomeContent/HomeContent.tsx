import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from './HomeContent.module.scss';
import { simpleText } from '@/utils';
import { TextareaField } from '../TextareaField';

const TextToSpeech = dynamic(
  () => import('@/components/TextToSpeech/TextToSpeech'),
  {
    ssr: false,
  },
);

const HomeContent = () => {
  const [text, setText] = useState<string>(simpleText);
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef) return;
    console.log({ current: contentRef.current });
    setElem(contentRef.current);
  }, [contentRef]);

  useEffect(() => {
    if (!contentRef) return;
    console.log({ childNode: contentRef.current?.children });
  }, [contentRef]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Text To Speech</h1>
      {elem && text && <TextToSpeech element={elem} text={text} />}
      <div ref={contentRef} className={styles.showText}>
        {text}
      </div>
      <TextareaField value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default HomeContent;
