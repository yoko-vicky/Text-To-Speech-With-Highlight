import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import styles from './HomeContent.module.scss';
import parse from 'html-react-parser';
import { originText, originText2, simpleText, smapleTitle1 } from '@/utils';
import { TextareaField } from '../TextareaField';

const TextToSpeech = dynamic(
  () => import('@/components/TextToSpeech/TextToSpeech'),
  {
    ssr: false,
  },
);

const HomeContent = () => {
  const [text, setText] = useState<string>('');
  const allContentsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!allContentsRef.current) return;
    setText(allContentsRef.current?.innerText);
  }, [allContentsRef.current]);

  return (
    <div className={styles.container}>
      {/* {allContentsRef.current && text && (
        <TextToSpeech element={allContentsRef.current} text={text} />
      )} */}

      {/* <div ref={allContentsRef}>
        <h1>{smapleTitle1}</h1>
        {parse(originText)}
      </div> */}

      {allContentsRef.current && simpleText && (
        <TextToSpeech element={allContentsRef.current} text={text} />
      )}

      <div ref={allContentsRef}>{simpleText}</div>

      {/* <div>
        <TextareaField
          value={text}
          onChange={(e) => setText(e.target.value)}
          innerRef={textareaRef}
        />
        {textareaRef.current && text && (
          <TextToSpeech element={textareaRef.current} text={text} />
        )}
      </div> */}
    </div>
  );
};

export default HomeContent;
