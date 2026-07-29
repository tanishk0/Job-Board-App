import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
  return NextResponse.redirect(new URL("/auth", request.url));
}

export async function POST(request: Request) {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
  return NextResponse.redirect(new URL("/auth", request.url));
}
