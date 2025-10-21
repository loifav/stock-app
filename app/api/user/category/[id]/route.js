import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import category from "@/models/category";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();
  console.log("Updating category with data:", body);
  try {
    const { _id, ...updateBody } = body;
    const updatingCategory = await category.findByIdAndUpdate(
      context.params.id,
      updateBody,
      { new: true }
    );
    console.log("Updated category:", updatingCategory);
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
    console.log("Deleting category:", deletingCategory);
    return NextResponse.json(deletingCategory);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
