function EmptyCollectionPlaceholder() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center">
      <p className="text-2xl font-bold text-foreground">
        No inspirations exist.
      </p>
      <p className="mt-2 text-muted-foreground">
        Capture a design or assign a tag to start building your library.
      </p>
    </div>
  );
}

export default EmptyCollectionPlaceholder;
