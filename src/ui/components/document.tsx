export function Document({ children }: { children: Html.Children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/public/favicon-32x32.png" />
        <title>Todo App</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
        />
        <link rel="stylesheet" href="/public/styles.css" />
        <script src="/public/unocss-config.js" />
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" />
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js" />
        <script src="https://unpkg.com/htmx.org@1.9.9" />
        <script src="https://unpkg.com/hyperscript.org@0.9.12" />
        <script src="/public/htmx-config.js" />
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" />
      </head>
      {children}
    </html>
  );
}
