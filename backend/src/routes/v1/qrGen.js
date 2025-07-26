import express from "express";
import upiController from "../../controller/upi.js";
import upiAccountController from "../../controller/upiAccount.js";
import vcardController from "../../controller/vcard.js";
import urlController from "../../controller/url.js";
import uniqueController from "../../controller/unique.js";

const router = express.Router();

router.get('/upi', upiController);
router.get('/upiaccount', upiAccountController);
router.get('/vcard', vcardController);
router.get('/url', urlController);
router.get('/unique', uniqueController);

export default router;
