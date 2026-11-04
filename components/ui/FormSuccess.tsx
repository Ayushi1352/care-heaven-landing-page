import { Icon } from "@/components/ui/Icon";

type FormSuccessProps = {
  name: string;
  title: string;
  message: string;
  leaving: boolean;
  visibleFor: number;
  onClose: () => void;
  closeLabel: string;
  className?: string;
};

/** Thank-you card shown after a (dummy) form submission; fades out on its own */
export const FormSuccess = ({ name, title, message, leaving, visibleFor, onClose, closeLabel, className = "" }: FormSuccessProps) => {
  const heading = name ? title.replace("{name}", name) : title.replace(", {name}", "").replace("{name}", "");

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-main)] py-4 pl-4 pr-11 transition-[opacity,transform] ease-[ease] [@starting-style]:translate-y-2 [@starting-style]:opacity-0 ${
        // fades in when shown; fades out (duration = fadeFor in useDummySubmit) before it is removed
        leaving ? "-translate-y-1.5 opacity-0 duration-[400ms]" : "duration-[450ms]"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)]">
          <Icon name="LuCheck" className="size-[1.125rem]" />
        </span>
        <div>
          <p className="font-heading text-lg font-bold text-[var(--color-heading)]">{heading}</p>
          <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full text-[var(--color-heading)] transition-colors hover:bg-[var(--color-bg-alt)]"
      >
        <Icon name="LuX" className="size-4" />
      </button>
      {/* time left before the message closes itself */}
      <span
        className="absolute bottom-0 left-0 h-[0.1875rem] w-0 bg-[var(--color-primary-70)] transition-[width] ease-linear [@starting-style]:w-full"
        style={{ transitionDuration: `${visibleFor}ms` }}
        aria-hidden="true"
      />
    </div>
  );
};

/** small spinner for the submit button while the dummy request runs */
export const Spinner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
