import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            return NextResponse.json({ error: "DATABASE_URL not set", env: Object.keys(process.env).filter(k => k.includes("DATABASE")) }, { status: 500 });
        }
        await prisma.$connect();
        return NextResponse.json({ ok: true, dbUrl: dbUrl.substring(0, 30) + "..." });
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
    }
}
