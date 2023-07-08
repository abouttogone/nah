import { NextResponse } from "next/server";

export function GET(req:Request,res:Response) {
   return NextResponse.json({ip:req.headers.get('x-forwarded-for')||'',Us:req.headers.get('user-agent')||''})
}