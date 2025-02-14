import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest){
const token = req.cookies.get("authToken")?.value;

const loginPath = new URL("/",req.url);
const homePage = new URL("/homePage",req.url);


if(!token && ["/homePage"].includes(req.nextUrl.pathname)){
  return NextResponse.redirect(loginPath);
}

if(token && req.nextUrl.pathname === "/"){
  return NextResponse.redirect(homePage);
}


  

return NextResponse.next();
}

export const config = {
  matcher : ["/homePage","/"],
  
}