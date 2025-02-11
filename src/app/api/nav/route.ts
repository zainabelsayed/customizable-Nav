import { NextResponse } from "next/server";
import fs, { writeFileSync } from "fs";
import path from "path";

const navFile = path.join(process.cwd(), "public", "nav.json");

export async function GET() {
  if (fs.existsSync(navFile)) {
    const data = JSON.parse(fs.readFileSync(navFile, "utf8"));
    return NextResponse.json(data);
  } else {
    return NextResponse.json([
      { id: 1, title: "Dashboard", target: "/" },
      {
        id: 2,
        title: "Job Applications",
        target: "/applications",
        children: [
          { id: 7, title: "John Doe", target: "/applications/john-doe" },
          { id: 10, title: "James Bond", target: "/applications/james-bond" },
          {
            id: 20,
            title: "Scarlett Johansson",
            target: "/applications/scarlett-johansson",
            visible: false,
          },
        ],
      },
      {
        id: 3,
        title: "Companies",
        target: "/companies",
        visible: false,
        children: [
          { id: 8, title: "Tanqeeb", target: "/companies/1" },
          { id: 9, title: "Daftra", target: "/companies/2" },
          { id: 11, title: "TBD", target: "/companies/14" },
        ],
      },
      {
        id: 4,
        title: "Qualifications",
        children: [
          { id: 14, title: "Q1", target: "/q1" },
          { id: 15, title: "Q2", target: "/q2" },
        ],
      },
      { id: 5, title: "About", target: "/about" },
      { id: 6, title: "Contact", target: "/contact" },
    ]);
  }
}

export async function POST(req: Request) {
  try {
    const items = await req.json();

    if (!Array.isArray(items)) {
      console.error("🚨 Invalid Data Type: Expected an array.");
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Define file path
    const filePath = path.join(process.cwd(), "public", "nav.json");

    // Safely write the file
    try {
      writeFileSync(filePath, JSON.stringify(items, null, 2));
    } catch (fileError) {
      console.error("🚨 File Write Error:", fileError);
      return NextResponse.json(
        { error: "Failed to write file" },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 }); // ✅ Success (No Content)
  } catch (error) {
    console.error("🚨 Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
