import { z } from "zod";

export const AuditEventActionSchema = z.enum([
  "member.invited",
  "member.removed",
  "role.changed",
  "billing.payment_method_added",
  "api_key.created",
  "api_key.revoked",
]);

export const AuditActorSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
});

export const AuditTargetSchema = z.object({
  type: z.string().min(1),
  id: z.string().min(1),
  label: z.string().min(1).optional(),
});

export const AuditEventDtoSchema = z.object({
  id: z.string().min(1),
  occurredAt: z.string().datetime({ offset: true }),
  actor: AuditActorSchema,
  action: AuditEventActionSchema,
  target: AuditTargetSchema.optional(),
  ip: z.string().min(1).optional(),
});

export const AuditEventsPageSchema = z.object({
  items: z.array(AuditEventDtoSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  size: z.number().int().positive(),
});
