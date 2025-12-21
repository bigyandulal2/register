// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Protect /user routes
//   if (pathname.startsWith("/user")) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/"; // redirect to login
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/user/:path*"], // includes /user and subpaths
// };
