import zod from "zod";

const Report = zod.object({
    tittle: zod.string({
        required_error: "Tittle is required",
    }),
    description: zod.string({
        required_error: "Description is required",
    }),
    date: zod.date({
        required_error: "Date is required",
    }),
    data: zod.any({
        required_error: "Data is required",
    }),
    engine_ref_rep: zod.number({
        required_error: "Engine reference is required to create a report",
    }),
});

export function validateReport(data) {
    return Report.safeParse(data);
}