import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "pdf",
    "custom-measurements-form.pdf"
  );

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="HS-Race-Gear-Custom-Measurements-Form.pdf"',
      "Content-Length": fileBuffer.length.toString(),
    },
  });
}
