import { XCircle } from 'phosphor-react';
import { FC, InputHTMLAttributes, useEffect, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  tag?: string;
}

const WhiteTextInput: FC<Props> = ({
  errorMessage,
  label,
  className,
  tag,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (isTouched && errorMessage) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [isTouched, errorMessage]);

  const isEmpty = props.value === '';

  return (
    <div className="w-full">
      {hasError && !isEmpty && (
        <div className="flex justify-between items-center text-sm mb-2.5">
          <span className="text-error">{errorMessage}</span>
          <XCircle size={20} className="text-error" weight="fill" />
        </div>
      )}
      {!isEmpty && !hasError && label && (
        <label className="text-white text-sm mb-1.5 block">
          {label}
          <span className="text-primary">*</span>
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          className={`w-full lg:w-full py-3 text-sm bg-transparent border-[#434345] rounded-lg focus:outline-none border-2 px-2 ${
            className || ''
          } ${hasError && !isEmpty && 'border-error'} placeholder-texto`}
          autoComplete="off"
          onBlur={handleBlur}
        />
        {tag && (
          <div className="flex items-center text-gray-400">
            <span className="text-sm">{tag}</span>
            <span className="absolute right-0 text-sm">3/300</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteTextInput;
