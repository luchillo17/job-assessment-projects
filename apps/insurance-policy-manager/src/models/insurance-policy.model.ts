import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const insurancePolicySchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  policyId: z.string().min(4),
  type: z.string().min(3),
  holder: z.string().min(3),
  premium: z.number().min(0),
});

export type InsurancePolicy = z.infer<typeof insurancePolicySchema>;
