import { userModel } from "../models/user.model";
import bcrypt from "bcryptjs"
import { passwordResetToken, tokenDataRetrieval, tokenGeneration } from "../helpers/token";
import { userSearch } from "../helpers/search";
import { deHashPassword, hashPassword } from "../helpers/hash.dehash";
import { usernameOrEmail } from "../helpers/username.email";
import { sendMail } from "../helpers/mail";
export class UserS {
  static async signup(body: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = body;
    try {
      const userMailExist = await userModel.findOne({ email });

      if (userMailExist) {
        return new Error("Email already exist");
      }
      const userUsernameExist = await userModel.findOne({ username });
      if (userUsernameExist) {
        return new Error("Username already Exist");
      }
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      const token = await tokenGeneration("4hrs", { username, email });

      const userData = {
        username,
        email,
        password: hashedPassword,
        img_url: "",
      };

      const addUser = new userModel(userData);
      const saveToDb = await addUser.save();
      return { userInfo: saveToDb, token };
    } catch (error: any) {
      return new Error(`${error.message}`);
    }
  }

  static async Signin(body: { username: string; password: string }) {
    const { username, password } = body;
    try {
      const findUser = await userSearch({ username });

      const { status, data } = findUser;

      if (!status) {
        return new Error("Invalid Login Crendentails");
      }
      const verifyPassword = await deHashPassword(password, `${data.password}`);
      if (!verifyPassword) {
        return new Error("Invalid Pasword");
      }
      const token = await tokenGeneration("4hrs", {
        username: data.username,
        email: data.email,
      });
      return token;
    } catch (error: any) {
      return new Error(`${error.message}`);
    }
  }

  static async ForgotPassword(data: string) {
    try {
      // check if email or username
      const checkIfEmailORUsername = await usernameOrEmail(data);
      // use that to determine what to search via username or email to have the user data
      const search = await userSearch(
        checkIfEmailORUsername === "username"
          ? { username: data }
          : { email: data }
      );
      if (!search.status) {
        return new Error(`Invalid ${checkIfEmailORUsername}`);
      }
      // the 4 digit token generated
      const passwordToken = await passwordResetToken();
      // Then we save the token and the user's email in a jwt token
      const jwtToken = await tokenGeneration("1hr", {
        email: search.data.email,
        passwordToken,
      });
      //   the we send the mail
      const sendMailToUser = await sendMail(
        `${search.data.email}`,
        `${passwordToken}`,
        `${jwtToken}`
      );
      if (sendMailToUser instanceof Error) {
        return new Error(`${sendMailToUser.message}`);
      }
      // Then return the user's email, username and a  jwt token that contains the 4 digit pin
      return {
        email: search.data.email,
        username: search.data.username,
        jwtToken,
      };
    } catch (error) {
      return new Error("An error occured");
    }
  }
  static async forgotPassword4DigitPinsVerification(data: {
    jwtToken: string;
    pin: number;
  }) {
    try {
      // we check the token data
      const checkTokenData = (await tokenDataRetrieval(data.jwtToken)) as {
        passwordToken: string;
        email: string;
      };
      if (checkTokenData instanceof Error) {
        return new Error(checkTokenData.message);
      }

      //verify it with the user's pin
      if (String(data.pin) !== checkTokenData.passwordToken) {
        return new Error("Invalid Reset Pin");
      }

      // Generate a token which is verified on the onload of the new password page at
      // the frontend
      const generateToken = await tokenGeneration("1hr", {
        verification: true,
        email: checkTokenData.email,
      });
      return generateToken;
    } catch (error: any) {
      return new Error(`${error.message}`);
    }
  }
  static async verifyNewPasswordToken(token:string) {
      try {
        const checkToken = (await tokenDataRetrieval(token)) as {
            verification: boolean;
          email:string;
        };
          if (checkToken instanceof Error) {
            return new Error("New Password attempt not allowed")
        }
        return checkToken
      } catch (error:any) {
 return new Error("An error occured");
       }
  }
  static async resetPassword(data:{email:string, password:string}) {
    try {
      if (data.password.length < 6) {
        return new Error("Password length must be up or greater than 6")
      }
      const hashedPassword = await hashPassword(`${data.password}`)
      const userData = await userSearch({ email: data.email })
      if (!userData.status) {
        return new Error("User doesn't exist")
      }

      userData.data.password = hashedPassword
      const updatePassword = await userModel.findOneAndUpdate({email:data.email}, userData.data)
      const userDataInfo = await userSearch({ email:data.email}) 
      return userDataInfo.data
    } catch (error) {
       return new Error("An error occured, resetting newPassword");
    }
  }
}