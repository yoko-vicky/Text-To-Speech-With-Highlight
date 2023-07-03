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
  const [originInnerHtml, setOriginInnerHtml] = useState<string>('');
  const allContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!allContentsRef.current || !!originInnerHtml) return;

    setOriginInnerHtml(allContentsRef.current.innerHTML);
  }, [allContentsRef.current]);

  // useEffect(() => {
  //   if (!allContentsRef.current) return;
  //   const contentsToRead = allContentsRef.current.innerText;
  //   // console.log({ allContentsRef: contentsToRead });
  //   setText(contentsToRead);
  // }, [allContentsRef.current]);

  return (
    <div className={styles.container}>
      {originInnerHtml && allContentsRef.current && text && (
        <TextToSpeech
          text={allContentsRef.current.innerText}
          elements={allContentsRef.current}
          originInnerHtml={originInnerHtml}
        />
      )}

      <div>
        <h1>{smapleTitle1}</h1>
        <div ref={allContentsRef}>{parse(originText)}</div>
      </div>
    </div>
  );
};

export default HomeContent;
