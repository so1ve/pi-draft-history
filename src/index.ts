import {
  CustomEditor,
  type ExtensionAPI,
} from "@earendil-works/pi-coding-agent";

function removeBrowsedHistoryEntry(editor: object): void {
  const historyIndex = Reflect.get(editor, "historyIndex");
  const history = Reflect.get(editor, "history");

  if (
    typeof historyIndex === "number" &&
    historyIndex >= 0 &&
    Array.isArray(history)
  ) {
    history.splice(historyIndex, 1);
  }
}

export default function draftHistory(pi: ExtensionAPI): void {
  pi.on("session_start", (_event, ctx) => {
    const previous = ctx.ui.getEditorComponent();

    ctx.ui.setEditorComponent((tui, theme, keybindings) => {
      const editor =
        previous?.(tui, theme, keybindings) ??
        new CustomEditor(tui, theme, keybindings);
      const handleInput = editor.handleInput.bind(editor);

      editor.handleInput = (data: string): void => {
        if (keybindings.matches(data, "app.clear")) {
          const draft = editor.getExpandedText?.() ?? editor.getText();

          if (draft.trim()) {
            removeBrowsedHistoryEntry(editor);
            editor.addToHistory?.(draft);
          }
        }

        handleInput(data);
      };

      return editor;
    });
  });
}
