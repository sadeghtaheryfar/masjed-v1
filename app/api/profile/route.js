import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  const token = (await cookies()).get("token")?.value;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};
