// import NextAuth, { type NextAuthOptions, type Session } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//           }
//         )
//         const user = await res.json()
//         if (res.ok && user) return user
//         return null
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) token.user = user
//       if (account?.access_token) token.accessToken = account.access_token
//       return token
//     },
//     async session({ session, token }) {
//       session.user = token.user!   // ✅ type-safe now
//       session.user.accessToken = token.accessToken as string;
//       return session
//     },
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }
