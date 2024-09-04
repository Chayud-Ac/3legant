import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import User from "@/databases/user.model";
import { connectToDatabase } from "@/lib/mongoose";

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your JSON key file
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

// Create a bucket instance
const bucket = storage.bucket("profile3legant");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null; // Cast to File, which includes the `name` property

    if (!file) {
      return NextResponse.json({ message: "No Image upload" }, { status: 400 });
    }

    await connectToDatabase();

    // Create a unique filename for the image
    const fileName = `${uuidv4()}${path.extname(file.name)}`;

    // Upload the image to Google Cloud Storage
    const blob = bucket.file(fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Wrap the file upload in a try-catch block
    try {
      await new Promise<void>((resolve, reject) => {
        const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: file.type || "application/octet-stream",
        });

        blobStream.on("finish", resolve);
        blobStream.on("error", reject);

        blobStream.end(buffer);
      });

      // The public URL of the image
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Save the image URL in MongoDB
      const id = formData.get("id") as string;
      await User.findByIdAndUpdate(id, { image: publicUrl });

      return NextResponse.json({ publicUrl }, { status: 200 });
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
