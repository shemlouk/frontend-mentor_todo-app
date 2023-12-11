export function FormCheckbox({
  name = "",
  checked = false,
}: {
  name?: string;
  checked?: boolean;
}) {
  return (
    <div class="relative flex">
      <input
        type="checkbox"
        {...{ name, checked }}
        class="checked:to-brightMagenta checked:from-brightCyan peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-light-veryLightGrayishBlue checked:border-none checked:bg-gradient-to-br"
      />

      <span class="text-white pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100">
        <img src="/public/icon-check.svg" alt="check icon" />
      </span>
    </div>
  );
}
