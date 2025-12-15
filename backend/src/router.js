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

router.post("/user/login", user.authenticationCheck, verifyPassword);
router.post("/makePassword", hashPassword);
router.put(
  "/adminUser/:id",
  verifyToken,
  verifyAdminRole,
  checkId,
  hashPassword,
  user.modifyUser
);

router.get("/users", user.browse);
router.get("/user/:id", verifyToken, user.read);
router.put(
  "/adminUser/user/:id",
  verifyToken,
  verifyAdminRole,
  user.modifyUser
);
router.put("/user/:id", verifyToken, hashPassword, checkId, user.modifyUser);

router.delete(
  "/adminUser/user/:id",
  verifyToken,
  verifyAdminRole,
  user.destroyUser
);

router.get("/faq", verifyToken, faq.browse);
router.post("/faq", verifyToken, faq.add);
router.delete("/faq/:id", verifyToken, faq.destroy);

module.exports = router;
