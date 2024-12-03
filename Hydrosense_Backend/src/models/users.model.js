import zod from 'zod';

const User = zod.object({
    name: zod.string({
        message: 'Name is required',
    }),
    email: zod.string({
        message: 'Email is required',
    }).email(),
    password: zod.string({
        message: 'Password is required',
    }).min(8),
    position: zod.string({
        message: 'Position is required',
    }),
    company_ref: zod.number({
        message: 'Company reference is required',
    }),
});

export function validateUser(user) {
    const { error } = User.safeParse(user);
    if (error) {
        throw new Error(error.message);
    }
}

export function validateUserUpdate(user) {
    const { error } = User.partial().safeParse(user);
    if (error) {
        throw new Error(error.message);
    }
}