import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { userLogin, userCreate } from '../../../controllers/userController';

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const providers = [

  Providers.Credentials({
    authorize: async (credentials) => {


      if(credentials.action === 'register') {

        const user = userCreate(credentials);
        if (user) { return Promise.resolve(user); } 
        else { return Promise.resolve(null); }

      } else {

        const user = userLogin(credentials);
        if (user) { return Promise.resolve(user); } 
        else { return Promise.resolve(null); }

      }

      
    }
  })

];


const options = {
  providers,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: { jwt: true },
  pages: {
   // signIn: '/signin',
 //   signOut: '/auth/signout',
    error: '/error', // Error code passed in query string as ?error=
  //  verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  }
};



const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;