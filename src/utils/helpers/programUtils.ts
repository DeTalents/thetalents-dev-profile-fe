export const getProgramInfo = (
  isAndelan: string,
  nonAndelaProgram?: string,
  nonAndelaProgramYear?: string
) => {
  if (isAndelan === 'ANDELA_2020') {
    return {
      show: true,
      programName: 'Andela before 2020',
    };
  } else if (isAndelan === 'ATLP_STACKUP') {
    return {
      show: true,
      programName: 'ATLP/stackup',
    };
  } else if (isAndelan === 'NONE' && nonAndelaProgram) {
    return {
      show: true,
      programName: nonAndelaProgram,
      programYear: nonAndelaProgramYear,
    };
  }
  return { show: false };
};
