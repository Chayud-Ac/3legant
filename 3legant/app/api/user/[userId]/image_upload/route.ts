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

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to allow formData to handle it
  },
};

export async function POST(request: Request) {
  try {
    // Get the Form Data
    const formData = await request.formData();
    console.log(formData);
    const file = formData.get("image") as File | null; // Cast to File, which includes the `name` property

    if (!file) {
      return new NextResponse(JSON.stringify({ message: "No Image upload" }), {
        status: 400,
      });
    }

    await connectToDatabase();

    // Create a unique filename for the image
    const fileName = `${uuidv4()}${path.extname(file.name)}`;

    // Upload the image to Google Cloud Storage
    const blob = bucket.file(fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.type || "application/octet-stream",
      });

      blobStream.end(buffer, async () => {
        try {
          // The public URL of the image
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          // Save the image URL in MongoDB
          const id = formData.get("id") as string;
          await User.findByIdAndUpdate(id, { image: publicUrl });

          resolve(
            new NextResponse(JSON.stringify({ publicUrl }), {
              status: 200,
            })
          );
        } catch (dbError) {
          console.error("Database error:", dbError);
          reject(
            new NextResponse(
              JSON.stringify({ message: "Failed to save to database" }),
              { status: 500 }
            )
          );
        }
      });

      blobStream.on("error", (err) => {
        console.error("Blob stream error:", err);
        reject(
          new NextResponse(JSON.stringify({ message: "Upload failed" }), {
            status: 500,
          })
        );
      });
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
