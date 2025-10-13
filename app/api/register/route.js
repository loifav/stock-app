import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import User from "@/models/user";

import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  const { name, email, password, phone } = body;

  console.log({ name, email, password, phone });

  try {
    const user = await new User({
      name,
      phone,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
    console.log("User created successfully", user);
    return NextResponse.json({ msg: "register successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { err: error, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
