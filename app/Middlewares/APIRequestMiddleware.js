import appLogger from "../Configs/LoggerInstance.js"
import crypto from "crypto";

export const requestMiddleware = async (req, res, next) => {
    const start = process.hrtime.bigint();
    const requestId = crypto.randomUUID();
    const userAgent = req.headers['user-agent'];

    req.id = requestId;
    req.userAgent = userAgent;

    const originalSend = res.send.bind(res);
    let responseBody;

    res.send = (body) => {
        if (typeof body === 'object' && body !== null) {
            try {
                responseBody = body;
            } catch (e) {
                responseBody = '[Object failed to stringify]';
            }
        } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
            responseBody = JSON.parse(body);
        } else {
            responseBody = String(body);
        }

        return originalSend(body);
    };

    res.on("finish", () => {
        const responseId = crypto.randomUUID();
        res.responseId = responseId;

        const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
        appLogger.info(
            {
                requestId: req.id,
                responseId: responseId,
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                userAgent: req.headers["user-agent"],
                query: req.query,
                params: req.params,
                response: responseBody,
                responseTime: durationMs,
            },
            `HTTP ${req.method} ${req.originalUrl} → ${res.statusCode}`
        );
    });

    next();
}