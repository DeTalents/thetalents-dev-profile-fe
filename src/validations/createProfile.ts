import { z } from 'zod';

const PROGRAM_OPTIONS = ['ANDELA_2020', 'ATLP_STACKUP', 'NONE'] as const;

export const experienceSchema = z
  .object({
    company: z.string().min(1, 'Company name is required'),
    role: z.string().min(1, 'Role is required'),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Start date must be a valid date',
    }),
    endDate: z
      .string()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: 'End date must be a valid date',
      })
      .optional(),
    isCurrent: z.boolean().optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
  })
  .refine(
    (data) => {
      if (data.isCurrent) {
        return true;
      }
      return !!data.endDate;
    },
    {
      message: 'End date is required unless this is your current role',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      if (data.endDate && !data.isCurrent) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

const refenceSchema = z.object({
  name: z.string().min(1, 'Reference name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phoneNumber: z.string().optional(),
});

const createProfileSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    secondName: z.string().min(1, 'Last name is required'),
    mainTitle: z.string().min(1, 'Main title is required'),
    phone: z.string().min(10, 'Phone number is required'),
    isAndelan: z.enum(PROGRAM_OPTIONS, {
      errorMap: () => ({ message: 'Please select a program' }),
    }),
    nonAndelaProgram: z.string().optional(),
    nonAndelaProgramYear: z.string().optional(),
    summary: z.string().min(10, 'Summary is required'),
    yearsOfExperience: z.string().min(1, 'Years of experience is required'),
    skills: z.array(z.string().min(2)).min(1, 'Add at least one skill'),
    experience: z
      .array(experienceSchema)
      .min(1, 'At least one experience is required'),
    references: z
      .array(refenceSchema)
      .min(1, 'At least one reference is required'),
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

      if (!data.nonAndelaProgramYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Program year is required',
          path: ['nonAndelaProgramYear'],
        });
      } else {
        const year = parseInt(data.nonAndelaProgramYear);
        if (year < 2016 || year > 2029) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Year must be between 2016 and 2029',
            path: ['nonAndelaProgramYear'],
          });
        }
      }
    }
  });

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;

export default createProfileSchema;
