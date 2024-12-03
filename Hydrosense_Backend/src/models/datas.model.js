import zod, { date } from "zod";

const Data = zod.object({
    date: zod.date({
        required_error: "Date is required",
    }),
    data: zod.any({
        required_error: "Data is required",
    }),
    engine_ref_data: zod.number({
        required_error: "Engine reference is required to create a data",
    }),
});

export function validateData(data) {
    return Data.safeParse(data);
}