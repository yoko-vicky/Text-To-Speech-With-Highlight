import React, { ChangeEvent } from 'react';
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
      rows={10}
    />
  );
};

export default TextareaField;
