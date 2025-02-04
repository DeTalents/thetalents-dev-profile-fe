import { z } from 'zod';

const PROGRAM_OPTIONS = ['ANDELA_2020', 'ATLP_STACKUP', 'NONE'] as const;

const createProfileSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    isAndelan: z.enum(PROGRAM_OPTIONS, {
      errorMap: () => ({ message: 'Please select a program' }),
    }),
    nonAndelaProgram: z.string().optional(),
    programYear: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isAndelan === 'NONE') {
      if (!data.nonAndelaProgram) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Program name is required when not an Andela alumni',
          path: ['nonAndelaProgram'],
        });
      }

      if (!data.programYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Program year is required',
          path: ['programYear'],
        });
      } else {
        const year = parseInt(data.programYear);
        if (year < 2016 || year > 2029) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Year must be between 2016 and 2029',
            path: ['programYear'],
          });
        }
      }
    }
  });

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;
export default createProfileSchema;
