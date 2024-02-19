const User = require("../Modals/Userschema");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
//create user
exports.createUser = async (req, res) => {
  const newUser = new User({
    firstname: req.body.Firstname,
    lastname: req.body.Lastname,
    email: req.body.Email,
    // dob : req.body.Dob,
    password: Crypto.AES.encrypt(
      req.body.Password,
      process.env.Crypto_js
    ).toString(),
  });
  try {
    console.log(newUser);
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//login and verify

exports.verifyLogin = async (req, res) => {
  try {
    const dataBaseData = await User.findOne({ email: req.body.Email });
    !dataBaseData &&
      res.status(401).json({ response: "please check ur email" });

    const hashedPassword = Crypto.AES.decrypt(
      dataBaseData.password,
      process.env.Crypto_js
    );
    console.log("hashed pasword", hashedPassword);
    const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);
    console.log("original passwod", originalPassword);

    const accessToken = jwt.sign(
      {
        id: dataBaseData._id,
      },
      process.env.jwt_sec,
      {
        expiresIn: "4h",
      }
    );

    const { password, ...others } = dataBaseData._doc;
    res.status(200).json({ ...others, accessToken });
    console.log("login succcess");
  } catch (err) {
    res.status(500).json(err);
    console.log("token err");
  }
};

// exports.getAllUsers = async (req, res) => {
//     try {
//       const users = await User.find();
//       res.json(users);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id firstname lastname friendrequest");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getUserById = async (req, res) => {
//     let user;
//     try {
//       user = await User.findById(req.params.id);
//       if (user == null) {
//         return res.status(404).json({ message: 'Cannot find user' });
//       }
//     } catch (err) {
//       return res.status(500).json({ message: err.message });
//     }

//     res.json(user);
//   };
exports.friendReqestsId = async (req, res) => {
  try {
    const friendreqId = req.query.friendreqId;
    console.log("user idddd", friendreqId);
    const userId = req.params.userId;
    console.log("user idddd", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!user.friendrequest.includes(friendreqId)) {
      user.friendrequest.push(friendreqId);
      user.save();
      console.log("request sent");
    } else {
      const index = user.friendrequest.indexOf(friendreqId);
      user.friendrequest.splice(index, 1);
      await user.save();
      console.log("req removed");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getUserById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id)
      .select("firstname lastname friends posts friendrequest")
      .populate("friends", "firstname lastname")
      .populate("posts")
      .populate("friendrequest", "firstname lastname");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  try {
    await User.deleteOne();
    res.json({ message: "Deleted user" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.searchUsers = async (req, res) => {
  try {
    const searchText = req.params.searchText;
    console.log("search textt", searchText);
    const searchRegex = new RegExp(searchText, "i");

    const search = await User.find({
      $or: [{ firstname: searchRegex }, { lastname: searchRegex }],
    });
    if (!search.length === 0) {
      return res.json({ message: "no users found" });
    }
    res.json(search);
  } catch (err) {
    console.error("Error searching users:", err);
    return res.status(500).json({ message: err.message });
  }
};
//to get friends
exports.getFriends = async(req, res)=>{
  try {
    const id = req.params.id;
    const friends = await User.findById(id)
      .select( 'friends' );
    res.json(friends)
  } catch (error) {
    console.error('Error searching friends:', error);
    return res.status(500).json({ message: err.message });
  }
}
//add new friend
exports.newFriend = async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendreqId = req.body.newFriendId;
    console.log(userId);
    console.log("frfwefuhgweaghfhgafhjhfA", friendreqId);
    const user = await User.findById(userId);
    const fuser = await User.findById(friendreqId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.includes(friendreqId)) {
      return res.status(400).json({ message: "User is already a friend" });
    }
    user.friends.push(friendreqId);
    fuser.friends.push(userId)
    // user.friendrequest = user.friendrequest.filter(
    //   (request) => request.toString() !== friendreqId
    // );

    await user.save();
    await fuser.save();
    res.json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Error adding new user:", err);
    return res.status(500).json({ message: err.message });
  }
};
