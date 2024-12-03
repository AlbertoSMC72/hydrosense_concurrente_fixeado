import zod from "zod";

const Engine = zod.object({
    name: zod.string({
        required_error: "Name is required",
    }),
    HP: zod.number({
        required_error: "HP is required",
    }),
    amperage: zod.number({
        required_error: "Amperge is required",
    }),
    voltage: zod.number({
        required_error: "Voltage is required",
    }),
    frequency: zod.number({
        required_error: "Frequency is required",
    }),
    RPM: zod.number({
        required_error: "RPM is required",
    }),
    company_ref: zod.number({
        required_error: "Company reference is required to create an engine",
    }),
});

export function validateEngine(data) {
    return Engine.safeParse(data);
}

export function validateEngineUpdate(data) {
    return Engine.partial().safeParse(data);
}