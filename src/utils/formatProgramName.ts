// Add helper function to format program name
const formatProgramName = (value: string) => {
  const names = {
    AMALITECH: 'Amalitech',
    THE_GYM: 'The Gym',
    AWESOMITY: 'Awesomity',
    SOLVIT_AFRICA: 'Solvit Africa',
  };
  return names[value as keyof typeof names] || value;
};

export default formatProgramName;
