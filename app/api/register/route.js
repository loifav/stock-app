import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import User from "@/models/user";

import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  const { name, email, password, phone } = body || {};

  // validate required fields
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message:
          "Missing required fields: name, email and password are required",
      },
      { status: 400 }
    );
  }

  try {
    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // create user
    const created = await User.create({
      name,
      phone,
      email,
      password: hashed,
    });

    // return created user without password
    const safeUser = { ...(created._doc ?? created) };
    if (safeUser.password !== undefined) delete safeUser.password;

    return NextResponse.json(
      { message: "register successfully", user: safeUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: error, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
