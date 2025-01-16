import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookies from "../JWT/generateToken.js"

export const signup = async (req, res) => {
  const { fullname, password, email, confirmpass } = req.body
  try {
    if (password !== confirmpass) {
      return res.status(400).send({ error: "password do not match" })
    }
    const user = await User.findOne({
      email
    })
    if (user) {
      return res.status(400).json({ error: "user already registered" })
    }

    const hashedpass = await bcrypt.hash(password, 10)
    let newUser = await new User({
      fullname,
      email,
      password: hashedpass,
    })
    newUser.save()
    createTokenAndSaveCookies(newUser._id, res)
    res.status(201).json({
      message: "user created succesfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    })

  } catch (error) {
    console.log(error)
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
      console.log("ii am in login" , req.url)
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token and set as cookie
    createTokenAndSaveCookies(user._id, res);

    // Respond with success and user data
    res.status(200).json({
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt")
    res.status(201).json({ message: " user logged out succesfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error" })
  }
}

export const allUsers = async (req, res) => {
  try {
    const loggeduser = req.user._id

    // console.log(req.user)
    let users = await User.find({ _id: { $ne: loggeduser } }).select("-password");
    //  if(!users){
    //   return res.status(401).json({error:"no one user found"})
    //  }
    res.status(200).json( users )
  } catch (error) {
    console.log(error) 
    res.status(500).json({ error: "internal server error" })
  }
}

// console.log(12+12)