
const express= require('express');
const { generateToken } = require('../controller/auth.controller');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope:
      ['profile', 'email'] }
));

router.get( '/google/callback',
   passport.authenticate('google', { failureRedirect: '/login'}),
   function(req, res) {
   // Successful authentication redirect home.
   console.log(req.user);
   const token = generateToken(req.user);
   res.status(200).json({success: true, token});
   //    res.redirect('/');
})


module.exports = router;