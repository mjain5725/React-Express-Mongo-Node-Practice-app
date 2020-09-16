const express = require('express');
const router = express.Router();

//CAN YOU USE BODY INSTEAD OF CHECK ACCORDING TO NEW DOCUMENTATION AS THEY WORK THE SAME NOW: {body, validationResult}
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//@route  POST api/users
//@desc   Register User
//@access Public
router.post(
  '/',
  [
    //CHECK CAN BE REPLACED BY BODY IT PROVIDES THE SAME FUNCTIONALITY: body('name', 'Name is Required').not().isEmpty()
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please Include a valid Email').isEmail(),
    check(
      'password',
      'Please enter the Password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // SEARCH DATABASE FOR THE USER BY IT'S EMAIL AND THEN STORE IN VARIABLE user.
      let user = await User.findOne({ email });

      // CHECK FOR USER IF ALREADY PRESENT
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //GET AVATAR USING GRAVATAR
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //SET UP USER
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //SALT FOR ENCRYPTION OF PASSWORD
      const salt = await bcrypt.genSalt(10);

      //HASING THE PASSWORD USING SALT OR ENCRYPTING THE PASS WORD
      user.password = await bcrypt.hash(password, salt);

      //SAVING THE USER AND USE AWAIT TO AVOID WRITING THEN.. WHICH EVER RETURNS PROMISE USE AWAIT IN FRONT
      await user.save();

      //JSON WEB TOKEN
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
