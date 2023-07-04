import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import styles from './HomeContent.module.scss';
import parse from 'html-react-parser';
import { originText, originText2, smapleTitle1 } from '@/utils';

const TextToSpeech = dynamic(
  () => import('@/components/TextToSpeech/TextToSpeech'),
  {
    ssr: false,
  },
);

const HomeContent = () => {
  const [text, setText] = useState<string>('');
  const allContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!allContentsRef.current) return;
    setText(allContentsRef.current?.innerText);
  }, [allContentsRef.current]);

  return (
    <div className={styles.container}>
      {allContentsRef.current && text && (
        <TextToSpeech element={allContentsRef.current} text={text} />
      )}

      <div>
        <h1>{smapleTitle1}</h1>
        <div ref={allContentsRef}>{parse(originText)}</div>
      </div>
    </div>
  );
};

export default HomeContent;
