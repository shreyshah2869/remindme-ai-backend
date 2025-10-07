import { successResponse } from "../Services/API/APIResponse.js"

export const defaultController = async (req, res) => {
    successResponse(res, 200, 'Remindme AI API V1.0.0', 'RESPONSE_SUCCESS', {});
}