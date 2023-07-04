import React, { ChangeEvent, RefObject } from 'react';
import styles from './TextareaField.module.scss';

export const TextareaField = ({
  value,
  onChange,
  innerRef,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  innerRef: RefObject<HTMLTextAreaElement>;
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      rows={10}
      ref={innerRef}
    />
  );
};

export default TextareaField;
