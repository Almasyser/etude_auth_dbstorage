const express = require("express");
const router = express.Router();
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
  checkId,
} = require("./services/auth");
const user = require("./controllers/userControllers");
const faq = require("./controllers/faqControllers");
const upload = require("./controllers/upLoadControlers");

router.post  ("/user/login", user.authenticationCheck, verifyPassword);
router.post  ("/addUser", hashPassword, user.addUser);
router.post  ("/addUserPhoto", verifyToken, user.addUserPhoto);
router.get   ("/users", verifyToken, user.browse);
router.get   ("/user/:id", verifyToken, user.read);
router.put   ("/user/:id", verifyToken, hashPassword, checkId, user.modifyUser);
router.delete("/user/:id", verifyToken, verifyAdminRole, user.destroyUser);// verifyAdminRole,

router.get("/faq", verifyToken, faq.browse);
router.post("/faq", verifyToken, faq.add);
router.delete("/faq/:id", verifyToken, faq.destroy);

router.post("/addfile", upload.add);

module.exports = router;
