import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        level: user.level,
        experience: user.experience,
        hitpoints: user.hitpoints,
        armor: user.armor,
        attack: user.attack,
        fortitude: user.fortitude,
        reflex: user.reflex,
        will: user.will,
        strength: user.strength,
        dexterity: user.dexterity,
        constitution: user.constitution,
        intelligence: user.intelligence,
        wisdom: user.wisdom,
        charisma: user.charisma
      });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      level: 0,
      experience: 0,
      hitpoints: 10,
      armor: 10,
      attack: 0,
      fortitude: 1,
      reflex: 1,
      will: 1,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        level: user.level,
        experience: user.experience,
        hitpoints: user.hitpoints,
        armor: user.armor,
        attack: user.attack,
        fortitude: user.fortitude,
        reflex: user.reflex,
        will: user.will,
        strength: user.strength,
        dexterity: user.dexterity,
        constitution: user.constitution,
        intelligence: user.intelligence,
        wisdom: user.wisdom,
        charisma: user.charisma
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'User logged out' });
});



// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.level = req.body.level || user.level;
        user.experience = req.body.experience || user.experience;
        user.hitpoints = req.body.hitpoints || user.hitpoints;
        user.armor = req.body.armor || user.armor;
        user.attack = req.body.attack || user.attack;
        user.fortitude = req.body.fortitude || user.fortitude;
        user.reflex = req.body.reflex || user.reflex;
        user.will = req.body.will || user.will;
        user.strength = req.body.strength || user.strength;
        user.dexterity = req.body.dexterity || user.dexterity;
        user.constitution = req.body.constitution || user.constitution;
        user.intelligence = req.body.intelligence || user.intelligence;
        user.wisdom = req.body.wisdom || user.wisdom;
        user.charisma = req.body.charisma || user.charisma;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            level: updatedUser.level,
            experience: updatedUser.experience,
            hitpoints: updatedUser.hitpoints,
            armor: updatedUser.armor,
            attack: updatedUser.attack,
            fortitude: updatedUser.fortitude,
            reflex: updatedUser.reflex,
            will: updatedUser.will,
            strength: updatedUser.strength,
            dexterity: updatedUser.dexterity,
            constitution: updatedUser.constitution,
            intelligence: updatedUser.intelligence,
            wisdom: updatedUser.wisdom,
            charisma: updatedUser.charisma
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      level: req.user.level,
      experience: req.user.experience,
      hitpoints: req.user.hitpoints,
      armor: req.user.armor,
      attack: req.user.attack,
      fortitude: req.user.fortitude,
      reflex: req.user.reflex,
      will: req.user.will,
      strength: req.user.strength,
      dexterity: req.user.dexterity,
      constitution: req.user.constitution,
      intelligence: req.user.intelligence,
      wisdom: req.user.wisdom,
      charisma: req.user.charisma
  };
  res.status(200).json(user);
});

// @desc Get user dungeon
// route GET /api/users/dungeon
// @access Private
const getUserDungeon = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    level: req.user.level,
    experience: req.user.experience,
    hitpoints: req.user.hitpoints,
    armor: req.user.armor,
    attack: req.user.attack,
    fortitude: req.user.fortitude,
    reflex: req.user.reflex,
    will: req.user.will,
    strength: req.user.strength,
    dexterity: req.user.dexterity,
    constitution: req.user.constitution,
    intelligence: req.user.intelligence,
    wisdom: req.user.wisdom,
    charisma: req.user.charisma
  };
  res.status(200).json(user);
});

export { authUser, 
    registerUser, 
    logoutUser, 
    updateUserProfile,
    getUserProfile, 
    getUserDungeon
};
