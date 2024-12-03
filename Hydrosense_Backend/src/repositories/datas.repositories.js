import config from "../config/config.js";

export const createData = async (data) => {
        try {
        await config.execute("INSERT INTO datas (`date`, `data`, `engine_ref_data`) VALUES (?, ?, ?)", [data.date , data.data, data.engine_ref_data]);
        return {status: 200, message: "Data created"};
    } catch (error) {
        throw error;
    }
}

export const obtenerDatosMotor = async (data) => {
    try {
        const [rows] = await config.execute("SELECT * FROM datas WHERE engine_ref_data = ?", [data.params.id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const obtenerDatosMotorByDate = async (data) => {
    try {
        const [rows] = await config.execute("SELECT * FROM datas WHERE engine_ref_data = ? WHERE date = ?", [data.params.id, data.body.date]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const obtenerDatosMotorLast = async (data) => {
    try {
        const [rows] = await config.execute("SELECT * FROM datas WHERE engine_ref_data = ? ORDER BY id_data DESC LIMIT 1", [data.params.id]);
        return rows;
    } catch (error) {
        throw error;
    }
}