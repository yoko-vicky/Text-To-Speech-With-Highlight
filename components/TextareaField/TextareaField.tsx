import React, { ChangeEvent, RefObject } from 'react';
import styles from './TextareaField.module.scss';

export const TextareaField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      rows={8}
    />
  );
};

export default TextareaField;
