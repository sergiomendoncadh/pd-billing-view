import React from 'react';
import { Typography } from '@deliveryhero/armor';

interface ITextProps {
  fontSize?: 'large' | 'medium' | 'small';
  content: string | number;
  margin?: string;
  className?: string;
}

export const Text: React.FC<ITextProps> = ({ fontSize = 'medium', content, margin = '0', className }) => {
  const font = { pageTitle: false, sectionTitle: false, subSectionTitle: false };
  switch (fontSize) {
    case 'large':
      font.pageTitle = true;
      break;
    case 'medium':
      font.sectionTitle = true;
      break;
    case 'small':
      font.subSectionTitle = true;
      break;
    default:
      break;
  }
  return (
    <Typography {...font} margin={margin} className={className}>
      {content}
    </Typography>
  );
};
