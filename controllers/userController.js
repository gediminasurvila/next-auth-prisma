import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}


export async function userLogin({email, password}) {

    const user = await prisma.user.findOne({
        where: { email }
    });

    if(!user) return false;
   
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);

    if(match) return user;
}


export async function userCreate(credentials) {
    
    const user = await prisma.user.findOne({
        where: { email: credentials.email }
    });

    if(user) { return false }

    if(credentials.password !== credentials.passwordConfirm) return false;

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

   
    const newUser = await prisma.user.create({
        data: {
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword
        }
    });
    
    return newUser;
}