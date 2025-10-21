import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from "@/models/category";

export async function GET() {
  await dbConnect();

  try {
    const category = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const { name } = body;

  console.log("category name: ", name);
  try {
    const newCategory = await Category.create({ name });
    console.log("newCategory: ", newCategory);
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
