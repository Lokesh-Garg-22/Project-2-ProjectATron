import { NextResponse } from "next/server";

export default function TryCatch<T>(next: (ele: T) => void) {
  return async (ele: T) => {
    try {
      return await next(ele);
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  };
}
