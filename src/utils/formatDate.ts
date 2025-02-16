interface DateFormatOptions {
  month: 'short';
  year: 'numeric';
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Present';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  } as DateFormatOptions);
};
