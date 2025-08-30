import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/gelDataFromToken";

connect();

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({
    _id: userId,
  }).select("-password");

  if (!user) {
    return NextResponse.json(
      { error: "User not found", success: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { data: user, success: true, message: "User found" },
    { status: 200 }
  );
}
