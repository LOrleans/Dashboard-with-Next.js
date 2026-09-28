import proxy from "next-auth/middleware"

export default proxy

export const config = {
  matcher: ["/estoque/:path*"]
}