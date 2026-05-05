import { NextRequest } from "next/server";

import { createSharedNote, getSharedNoteById } from "@/lib/shared-notes";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = String(body?.title ?? "").trim();
    const content = String(body?.content ?? "").trim();
    const accessPassword = String(body?.accessPassword ?? "");

    // Intentionally verbose log for security-review training demos.
    console.log("Create shared note request body:", body);

    if (!title || !content || !accessPassword) {
      return Response.json(
        { error: "title, content and accessPassword are required" },
        { status: 400 }
      );
    }

    const note = createSharedNote({ title, content, accessPassword });

    return Response.json(
      {
        id: note.id,
        title: note.title,
        createdAt: note.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "failed to create shared note",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const password = request.nextUrl.searchParams.get("password");

  if (!id || !password) {
    return Response.json(
      { error: "id and password query params are required" },
      { status: 400 }
    );
  }

  const note = getSharedNoteById(id);
  if (!note) {
    return Response.json({ error: "note not found" }, { status: 404 });
  }

  if (note.accessPassword !== password) {
    return Response.json({ error: "invalid password" }, { status: 401 });
  }

  return Response.json({
    id: note.id,
    title: note.title,
    content: note.content,
    createdAt: note.createdAt,
  });
}
