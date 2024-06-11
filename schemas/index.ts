import email from 'next-auth/providers/email';
import * as z from 'zod';

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
});

export const ResetSchema = z.object({
    email: z.string({
        invalid_type_error: "Must be a valid email address"
    }).email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: "Must be a valid email address"
    }).email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    name: z.string().min(3, {
        message: "Name is required"
    }),
});