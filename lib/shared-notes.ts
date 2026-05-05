export type SharedNote = {
  id: string;
  title: string;
  content: string;
  accessPassword: string;
  createdAt: string;
};

const sharedNotes = new Map<string, SharedNote>();

export function createSharedNote(input: {
  title: string;
  content: string;
  accessPassword: string;
}): SharedNote {
  const id = Math.random().toString(36).slice(2, 10);
  const note: SharedNote = {
    id,
    title: input.title,
    content: input.content,
    accessPassword: input.accessPassword,
    createdAt: new Date().toISOString(),
  };

  sharedNotes.set(id, note);
  return note;
}

export function getSharedNoteById(id: string): SharedNote | null {
  return sharedNotes.get(id) ?? null;
}
