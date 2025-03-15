import React, { useMemo } from 'react';

interface UserDescriptionProps {
  description: string;
  wordsPerParagraph?: number;
  className?: string;
  paragraphClassName?: string;
}

const UserDescription: React.FC<UserDescriptionProps> = ({
  description,
  wordsPerParagraph = 25,
  className = '',
  paragraphClassName = '',
}) => {
  const formattedParagraphs = useMemo(() => {
    const cleanedText = description
      .replace(/([,.!?;:])\s*/g, '$1 ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleanedText.split(' ');

    const paragraphs: string[] = [];
    for (let i = 0; i < words.length; i += wordsPerParagraph) {
      const paragraph = words.slice(i, i + wordsPerParagraph).join(' ');
      paragraphs.push(paragraph);
    }

    return paragraphs;
  }, [description, wordsPerParagraph]);

  return (
    <div className={`space-y-4 ${className}`}>
      {formattedParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`text-gray-700 leading-relaxed ${paragraphClassName}`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default UserDescription;
