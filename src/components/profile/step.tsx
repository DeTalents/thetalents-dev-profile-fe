import { twMerge } from 'tailwind-merge';

type StepProps = {
  id: number;
  isLast?: boolean;
  currentStep: number;
};

export function Step({ id, isLast = false, currentStep }: StepProps) {
  const isActive = currentStep === id - 1;
  const isPast = currentStep > id - 1;
  const progressWidth = isActive ? 'w-1/2' : isPast ? 'w-full' : 'w-0';

  return (
    <>
      <div
        className={twMerge(
          'flex items-center justify-center text-sm md:text-base',
          'size-[28px] md:size-[34px] rounded-full bg-zinc-200',
          (isActive || isPast) &&
            'bg-indigo-600 text-white transition-colors duration-200'
        )}
      >
        {id}
      </div>

      {!isLast && (
        <div className="min-w-12 md:min-w-24 h-[4px] md:h-[6px] rounded-[40px] bg-zinc-200">
          <div
            className={twMerge(
              'h-full rounded-[40px] bg-indigo-600 transition-all duration-500',
              progressWidth
            )}
          />
        </div>
      )}
    </>
  );
}
