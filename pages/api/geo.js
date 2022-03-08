// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from "cookie";
const m = require('cloudflare-detect');

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;

export default async function handler(req, res) {
  const isCL = await m(req.headers.host)

  const client = new WebServiceClient('671237', 'j1fqY5hyCb63ucek');
  const countryRes = await client.country(isCL ? req.headers['cf-connecting-ip'] : req.headers['x-real-ip'])
 
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("countryCode", countryRes.country.isoCode, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).json({ country: countryRes.country.isoCode })
}
