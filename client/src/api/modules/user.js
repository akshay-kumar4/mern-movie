import privateClient from "../client/private";
import publicClient from "../client/public";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      console.log("Request Send");
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log("error");
      return { error };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return response;
    } catch (error) {
      console.log("error");
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return response;
    } catch (error) {
      console.log("error");
      return { error };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return response;
    } catch (error) {
      console.log("error");
      return { error };
    }
  },
};

export default userApi;
