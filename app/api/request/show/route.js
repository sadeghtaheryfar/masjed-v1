import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const itemId = searchParams.get("item_id");

  if (!id) {
    return NextResponse.json({ message: "شناسه معتبر نیست." }, { status: 400 });
  }

  const token = (await cookies()).get("token")?.value;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/requests/${id}?item_id=${itemId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "مشکلی در ارسال درخواست وجود دارد." },
      { status: 500 }
    );
  }
};
