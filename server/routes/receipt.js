import express from "express";
import multer from "multer";
import { analyzeReceipt } from "../services/receiptService.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        console.log("Receipt endpoint called");
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                error: "No image uploaded.",
            });
        }

        // Temporary test response
        const result = await analyzeReceipt(req.file.buffer);

return res.json(result);

        // Later we'll restore:
        // const result = await analyzeReceipt(req.file.buffer);
        // return res.json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to analyze receipt.",
        });
    }
});

export default router;