import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Review from "@/databases/review.model";

// route นี้ จะ handle request สำหรับ review section ของ productId นั้นๆ
// มีการ apply pagination , filter (recent , most rate , etc .. )
