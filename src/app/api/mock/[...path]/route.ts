import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Mock API Route Handler
 * Intercepts requests to /api/mock/... and returns fake data from src/mocks/db.json
 */

const getDbData = () => {
  const dbPath = path.join(process.cwd(), "src/mocks/db.json");
  const dbData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(dbData);
};

const wrapResponse = (data: any) => {
  return {
    data: {
      data: data,
      result: "success",
      message: "Mock data returned successfully",
    },
    status: 200,
  };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const db = getDbData();
  const fullPath = pathSegments.join("/");

  console.log(`[Mock API] GET /${fullPath}`);

  // 1. Handle settings: /store/settings/group
  if (fullPath.includes("store/settings/group")) {
    return NextResponse.json(wrapResponse(db.settings));
  }

  // 2. Handle products list: /store/products
  if (fullPath === "store/products") {
    return NextResponse.json(wrapResponse(db.products));
  }

  // 3. Handle product by handle: /store/products/handle/:slug
  if (fullPath.startsWith("store/products/handle/")) {
    const slug = pathSegments[pathSegments.length - 1];
    const product = db.products.find((p: any) => p.handle === slug);
    if (product) {
      return NextResponse.json(wrapResponse(product));
    }
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  // 4. Handle blog list: /entries/data/list/content
  if (fullPath.includes("entries/data/list/content")) {
    return NextResponse.json({
      total_data: db.blogs.length,
      current_page: 1,
      total_pages: 1,
      contents: db.blogs.map((b: any) => ({
        id: Math.floor(Math.random() * 1000),
        name: b.title,
        slug: b.slug,
        created_at: b.created_at,
        content_data: [{ schema_slug: "thumbnail", value: b.thumbnail }]
      }))
    });
  }

  // 5. Handle blog detail: /entries/data/detail/:slug
  if (fullPath.includes("entries/data/detail/")) {
    const slug = pathSegments[pathSegments.length - 1];
    const blog = db.blogs.find((b: any) => b.slug === slug);
    if (blog) {
      return NextResponse.json({
        entry: {
          id: Math.floor(Math.random() * 1000),
          name: blog.title,
          slug: blog.slug,
          content_data: [
            { schema_slug: "content", value: blog.content },
            { schema_slug: "thumbnail", value: blog.thumbnail }
          ],
          created_at: blog.created_at
        }
      });
    }
    return NextResponse.json({ statusCode: 500, message: "Blog not found" }, { status: 500 });
  }

  // 6. Handle categories: /store/categories
  if (fullPath === "store/categories") {
    return NextResponse.json(wrapResponse(db.categories));
  }

  // 7. Handle collections: /store/collections
  if (fullPath === "store/collections") {
    return NextResponse.json(wrapResponse(db.collections));
  }

  // Default fallback for GET
  return NextResponse.json(wrapResponse({ message: "Mock endpoint matched", path: fullPath }));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const fullPath = pathSegments.join("/");

  console.log(`[Mock API] POST /${fullPath}`);

  // Always return success for POST to keep logic working
  return NextResponse.json(wrapResponse({
    success: true,
    message: `Mock POST success for ${fullPath}`,
    id: "mock_id_" + Math.random().toString(36).substr(2, 9)
  }));
}

// Support other methods as needed
export async function PUT(request: Request, { params }: { params: Promise<{ path: string[] }> }) { return NextResponse.json(wrapResponse({ success: true })); }
export async function DELETE(request: Request, { params }: { params: Promise<{ path: string[] }> }) { return NextResponse.json(wrapResponse({ success: true })); }
export async function PATCH(request: Request, { params }: { params: Promise<{ path: string[] }> }) { return NextResponse.json(wrapResponse({ success: true })); }
