import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ''
);

const IMPROVEMENT_PROMPT = `Act as a professional career coach for software developers. Analyze the user's profile summary and improve it by following these steps:

1. Identify key elements to enhance:
   - Technical skills (programming languages, frameworks, tools)
   - Professional experience and achievements
   - Notable projects/contributions
   - Unique value proposition
   - Career objectives (if mentioned)

2. Ensure the improved version:
   - Maintains original intent while enhancing clarity
   - Uses active voice and power verbs ("developed", "architected", "optimized")
   - Highlights measurable achievements (performance improvements, cost savings)
   - Includes industry keywords for better discoverability
   - Keeps length under 150 words

3. Format requirements:
   - First sentence establishes main expertise
   - Middle sentences demonstrate experience and achievements
   - Final sentence shows passion/forward-looking statement
   - Avoid generic phrases like "team player" or "quick learner"

Provide only the revised summary without additional commentary. Offer 1-2 alternative phrasings if particularly weak sections are found. Maintain technical accuracy while improving readability.
Original summary: 
`;

interface TextareaProps<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'name'> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  enableAI?: boolean;
  onTextChange?: (value: string) => void;
}

export function Textarea<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  className,
  enableAI = false,
  onTextChange,
  ...props
}: TextareaProps<T>) {
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [originalText, setOriginalText] = useState<string>('');
  const [model, setModel] = useState<GenerativeModel | null>(null);
  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message;

  useEffect(() => {
    if (enableAI) {
      const initModel = async () => {
        try {
          const geminiModel = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro-latest',
          });
          setModel(geminiModel);
        } catch (err) {
          setError(`Failed to initialize AI model: ${err}`);
        }
      };
      initModel();
    }
  }, [enableAI]);

  const improveText = async () => {
    const textElement = document.getElementById(name) as HTMLTextAreaElement;
    const currentText = textElement?.value;

    if (!currentText?.trim()) {
      setError('Please enter some text to improve');
      return;
    }

    if (!model) {
      setError('AI model not initialized');
      return;
    }

    setOriginalText(currentText);
    setIsImproving(true);
    setError(null);

    try {
      const prompt = IMPROVEMENT_PROMPT + currentText + '"';
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const improved = response.text();

      if (improved) {
        setImprovedText(improved);
        if (onTextChange) {
          onTextChange(improved);
        }
        textElement.value = improved;
      } else {
        setError('Failed to improve text. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while improving the text');
      console.error(err);
    } finally {
      setIsImproving(false);
    }
  };

  const handleRevert = () => {
    const textElement = document.getElementById(name) as HTMLTextAreaElement;
    textElement.value = originalText;
    setImprovedText(null);
    if (onTextChange) {
      onTextChange(originalText);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-indigo-950 text-lg font-bold">
        {label}
      </label>
      <div className="relative w-full">
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          {...props}
          aria-invalid={hasError}
          className={twMerge(
            'w-full py-3 px-3 text-sm bg-transparent border-2 rounded-lg focus:outline-none transition resize-y min-h-[100px]',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-zinc-200 focus:border-indigo-500',
            className
          )}
        />
      </div>
      {(hasError || error) && (
        <p className="text-red-500 text-sm">
          {(errorMessage || error) as string}
        </p>
      )}
      {enableAI && (
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={improveText}
            disabled={isImproving || !model}
            className={twMerge(
              'px-4 py-2 rounded-lg text-white font-medium transition-all',
              isImproving || !model
                ? 'bg-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700',
              'flex items-center justify-center gap-2 min-w-[160px]'
            )}
          >
            {isImproving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Enhance with AI
              </>
            )}
          </button>
          {improvedText && (
            <button
              onClick={handleRevert}
              className="px-4 py-2 rounded-lg text-indigo-600 font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
