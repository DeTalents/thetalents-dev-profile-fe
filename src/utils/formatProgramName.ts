// Add helper function to format program name
export const formatProgramName = (value: string) => {
  const names = {
    AMALITECH: 'Amalitech',
    THE_GYM: 'The Gym',
    AWESOMITY: 'Awesomity',
    SOLVIT_AFRICA: 'Solvit Africa',
  };
  return names[value as keyof typeof names] || value;
};

export const formatAndelaProgram = (value: string) => {
  const names = {
    ANDELA_2020: 'Attended Andela before 2020',
    ATLP_STACKUP: 'Andela Technical  Leadership  Program',
  };

  return names[value as keyof typeof names] || value;
};
