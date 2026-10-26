const express = require("express");

const {
  handleGenerateNewShortID,
  handleGetAllURL,
  handleRedirectURL,
  handleURLAnalytics,
  handleAllURLsAnalytics
} = require("../controllers/url.controller.js");

const router = express.Router();

router
    .route("/")
    .post(handleGenerateNewShortID)
    .get(handleGetAllURL);

    
router
    .route("/analytics")
    .get(handleAllURLsAnalytics);
    
router
    .route("/analytics/:id")
    .get(handleURLAnalytics);
    
router
    .route("/:id")
    .get(handleRedirectURL)


module.exports = router;
