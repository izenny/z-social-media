const User = require("../Modals/Userschema");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const sendEmail = require("../Nodemailer/Nodemailer");
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


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id firstname lastname friendrequest");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// socket io new friend request
// exports.newFriendRequest = async (data) => {
//   try {

//     const { userId, friendId } = data;
//     console.log('userId in req',userId);
//     console.log('friendId in req',friendId);

//     const user = await User.findById(friendId);
//     if (!user) {
//       return { success: false, message: "User not found" };
//     }

//     if (!user.friendrequest.includes(userId)) {
//       user.friendrequest.push(userId);
//       await user.save();
//       console.log("Request sent");
//       return { success: true, message: "Friend request sent" };
//     } else {
//       const index = user.friendrequest.indexOf(userId);
//       user.friendrequest.splice(index, 1);
//       await user.save();
//       console.log("Request removed");
//       return { success: true, message: "Friend request removed" };
//     }
//   } catch (error) {
//     console.error("Error adding/removing friend request:", error);
//     return { success: false, message: "Failed to add/remove friend request" };
//   }
// };

exports.friendReqestsId = async (req, res) => {
  try {
    
    // const friendreqId = req.query.friendreqId;
    const friendreqId = req.body.FriendId;
    console.log("user idddd", friendreqId);
    
    const userId = req.params.userId;
    console.log("user fdidddd", userId);
    const user = await User.findById(friendreqId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!user.friendrequest.includes(userId)) {
      user.friendrequest.push(userId);
      user.save();
      console.log("request sent");
    } else {
      const index = user.friendrequest.indexOf(userId);
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
    user = await User.findById(req.params.userId)
      .select("firstname lastname friends posts friendrequest profilePic headerImage email")
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
//search user
exports.searchUsers = async (req, res) => {
  try {
    const searchText = req.params.searchText;
    console.log("search textt", searchText);
    const searchRegex = new RegExp(searchText, "i");

    const search = await User.find({
      $or: [{ firstname: searchRegex }, { lastname: searchRegex }],
    }).select("firstname lastname profilePic friendrequest friends");
    
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
    const friendreqId = req.body.requestId;
    console.log("User ID:", userId);
    console.log("Friend Request ID:", friendreqId);

    const user = await User.findById(userId);
    const fuser = await User.findById(friendreqId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(friendreqId)) {
      console.log("User is already a friend");
      return res.status(400).json({ message: "User is already a friend" });
    }

    user.friends.push(friendreqId);
    fuser.friends.push(userId);

    await user.save();
    await fuser.save();

    try {
      await User.findByIdAndUpdate(userId, { $pull: { friendrequest: friendreqId } });
      console.log("Friend request removed successfully");
    } catch (err) {
      console.error("Error removing friend request:", err);
      return res.status(500).json({ message: "Failed to remove friend request" });
    }

    console.log("Friend added successfully");
    res.json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Error adding new user:", err);
    return res.status(500).json({ message: err.message });
  }
};

// for forgot password

exports.forgotPassword = async (req, res)=>{
  const {email} = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = uuid.v4();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now()+3600000;
    await user.save();
    const resetLink =`http://localhost:3000/reset-password?email=${email}&token=${token}`;
    const emailData = {
      to: email,
      subject: 'Reset your password',
      text: `Click this link to reset your password: ${resetLink}`,
    };
    await sendEmail(emailData);
    res.status(200).json({ message: 'Password reset email sent' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
  
}
}
//reset password

exports.newPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the token from the frontend matches the token in the database
    if (req.body.Token !== user.resetPasswordToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Check if the token is expired
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Token expired" });
    }

    // Update the user's password in the database
    user.password = Crypto.AES.encrypt(
      req.body.NewPassword,
      process.env.Crypto_js).toString();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//update profile info
exports.updateProfileInfo = async (req, res) => {
  try {
    console.log('reqqqq updating data',req.body);
    const data = req.body
    const user = await User.findByIdAndUpdate(req.params.userId, { $set: data }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Updated user:', user);
    res.status(200).json({ data: user });
  } catch (err) {
    console.error('Error updating user info:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//update profile pic
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null,'../client/public/images/');
  },
  filename: function (req, file, cb) {
    // Save the filename to a variable for later use
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    // Pass the filename to the callback
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage
}).single('image')
exports.newProfilePic = async (req, res) => {
 
  try {
    
    upload(req, res, async (err) => {
      if (err) {
        // Handle Multer error
        return res.status(500).json({ message: 'Failed to upload image' });
      }

      // File uploaded successfully
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Update the user's profile picture in the database
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.profilePic = req.file.filename; 
      await user.save();
      console.log('upload image',req.params.userId);
      // Return success response
      return res.status(200).json({ message: 'Profile picture updated successfully' });
    });
  } catch (err) {
    // Handle other errors
    console.error('err in upload image',err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
//header pic
exports.newHeaderPic = async (req, res) => {
  console.log('upload image',req.params.userId);
  try {
    console.log('upload image',req.params.userId);
    upload(req, res, async (err) => {
      if (err) {
        // Handle Multer error
        return res.status(500).json({ message: 'Failed to upload image' });
      }

      // File uploaded successfully
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Update the user's profile picture in the database
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.headerImage = req.file.filename; 
      await user.save();
      console.log('upload image',req.params.userId);
      // Return success response
      return res.status(200).json({ message: 'Profile picture updated successfully' });
    });
  } catch (err) {
    // Handle other errors
    console.error('err in upload image',err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};