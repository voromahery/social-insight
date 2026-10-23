import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const competitorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  profileUrl: z.string().url('Please enter a valid URL'),
  platform: z.string().min(1, 'Platform is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
})

export const contentBriefSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  audienceProblem: z.string().min(1, 'Audience problem is required'),
  coreTopic: z.string().min(1, 'Core topic is required'),
  suggestedAngle: z.string().optional(),
  contentFormat: z.string().min(1, 'Content format is required'),
  platform: z.string().min(1, 'Platform is required'),
  proposedTitle: z.string().optional(),
  outline: z.string().optional(),
  callToAction: z.string().optional(),
  monetizationPathway: z.string().optional(),
  notes: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type CompetitorInput = z.infer<typeof competitorSchema>
export type ContentBriefInput = z.infer<typeof contentBriefSchema>
