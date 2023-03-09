import React from 'react';
import { Typography } from '@deliveryhero/armor';

interface ITextProps {
  fontSize?: 'pageTitle' | 'sectionTitle' | 'subSectionTitle' | 'paragraph';
  content: string | number;
  margin?: string;
  className?: string;
}

export const Text: React.FC<ITextProps> = ({
  fontSize = 'paragraph',
  content,
  margin = '0',
  className
}) => {
  const font = {
    pageTitle: false,
    sectionTitle: false,
    subSectionTitle: false,
    label: false,
    paragraph: false
  };

  font[fontSize] = true;

  return (
    <Typography {...font} margin={margin} className={className}>
      {content}
    </Typography>
  );
};
