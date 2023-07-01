import React from 'react';
import { TextareaField } from '@/components/TextareaField';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import styles from './HomeContent.module.scss';

const TextToSpeech = dynamic(
  () => import('@/components/TextToSpeech/TextToSpeech'),
  {
    ssr: false,
  },
);

const HomeContent = () => {
  const sampleText = 'Hello World! My name is Yoko Saka. Please call me Yoko.';
  const [text, setText] = useState<string>(sampleText);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <TextToSpeech text={text} />
      <TextareaField value={text} onChange={onChangeText} />
    </div>
  );
};

export default HomeContent;
