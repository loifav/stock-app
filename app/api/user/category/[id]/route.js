import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import category from "@/models/category";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();
  try {
    const { _id, ...updateBody } = body;
    const updatingCategory = await category.findByIdAndUpdate(
      context.params.id,
      updateBody,
      { new: true }
    );
    return NextResponse.json(updatingCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const deletingCategory = await category.findByIdAndDelete(
      context.params.id
    );
    return NextResponse.json(deletingCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
