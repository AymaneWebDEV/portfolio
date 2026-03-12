export function Footer() {
  return (
    <footer className="w-full py-6 md:py-0 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <span className="font-semibold text-foreground">AymaneWebDEV</span>.
          The source code is available on <a href="https://github.com/AymaneWebDEV" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
