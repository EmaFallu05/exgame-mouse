import {Context, Next} from "koa";
import joi from "joi";
import bcrypt from "bcryptjs";

const registrationSchema = joi.object({
  email: joi
    .string()
    .required()
    .email()
    .messages({
      'string.empty': 'Email è obbligatoria',
      'string.email': 'Email non valida',
      'any.required': 'Email è obbligatoria',
    }),
  password: joi
    .string()
    .required()
    .min(8)
    .pattern(/[!@#$%^&*(),.?":{}|<>]/)
    .messages({
      'string.empty': 'Password è obbligatoria',
      'string.min': 'Password deve essere almeno 8 caratteri',
      'string.pattern.base': 'Password deve contenere almeno un carattere speciale',
      'any.required': 'Password è obbligatoria',
    }),
}).unknown(true);

export const validateRegistration = async (ctx: Context, next: Next) => {
  try {
    await registrationSchema.validateAsync(ctx.request.body, { abortEarly: false });
    
    await next();
  } catch (error) {
    if (joi.isError(error)) {
      ctx.status = 400;
      ctx.body = {
        error: "Validazione fallita",
        details: error.details.map(detail => detail.message),
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Errore interno del server" };
    }
  }
};


export const hashPassword = async (ctx: Context, next: Next) => {
  try {
    const { password } = ctx.request.body as { password: string };
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    ctx.request.body = {
      ...ctx.request.body,
      password: hashedPassword,
    };
    
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Errore durante l'hashing della password" };
  }
};