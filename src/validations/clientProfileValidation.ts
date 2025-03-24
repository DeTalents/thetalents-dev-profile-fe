import { z } from 'zod';

const clientProfileSchema = z.object({
  clientName: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required'),
});

export type ClientProfileFormData = z.infer<typeof clientProfileSchema>;

export default clientProfileSchema;
