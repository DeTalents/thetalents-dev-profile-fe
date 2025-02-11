export type AndelaProgram = 'ANDELA_2020' | 'ATLP_STACKUP' | 'NONE';
export type NonAndelaProgram =
  | 'AMALITECH'
  | 'THE_GYM'
  | 'AWESOMITY'
  | 'SOLVIT_AFRICA'
  | 'NONE';

export interface ProgramInfoFormData {
  isAndelan: AndelaProgram;
  nonAndelaProgram?: NonAndelaProgram;
  nonAndelaProgramYear?: string;
}

export type BasicDetails = {
  firstName: string;
  secondName: string;
  phone: string;
  yearsOfExperience: string;
  summary: string;
  email: string;
  isVerified: boolean;
};

export type UpdateBasicDetails = Omit<BasicDetails, 'email' | 'isVerified'>;
