import config from "../config/config.js";

export const postReport = async (report) => {
    try {
        await config.execute("INSERT INTO report set ?", [report]);
        return { status: 200, message: "Report created" };
    } catch (error) {
        throw { status: 500, message: "Internal Server Error", error };
    }
};
