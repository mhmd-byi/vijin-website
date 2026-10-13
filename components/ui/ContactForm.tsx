"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact-us/actions";
import { products } from "@/lib/data";

const initial: EnquiryState = { status: "idle" };

const field =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-accent-ink focus:ring-2 focus:ring-accent/40";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line">
        <h3 className="font-display text-3xl text-brand">Thank you</h3>
        <p className="mt-3 text-ink-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line md:p-8">
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Name *
          <input name="name" defaultValue={v.name} autoComplete="name" required aria-invalid={!!e.name} aria-describedby={e.name ? "err-name" : undefined} className={field} />
          {e.name ? <span id="err-name" className="text-sm font-normal text-red-700">{e.name}</span> : null}
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Phone *
          <input name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" required aria-invalid={!!e.phone} aria-describedby={e.phone ? "err-phone" : undefined} className={field} />
          {e.phone ? <span id="err-phone" className="text-sm font-normal text-red-700">{e.phone}</span> : null}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input name="email" type="email" defaultValue={v.email} autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "err-email" : undefined} className={field} />
          {e.email ? <span id="err-email" className="text-sm font-normal text-red-700">{e.email}</span> : null}
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Product of interest
          <select name="product" defaultValue={v.product ?? ""} className={field}>
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.brand === "Enox" ? `Enox ${p.name}` : p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        Message *
        <textarea name="message" rows={5} defaultValue={v.message} required aria-invalid={!!e.message} aria-describedby={e.message ? "err-message" : undefined} className={field} />
        {e.message ? <span id="err-message" className="text-sm font-normal text-red-700">{e.message}</span> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-brand px-8 py-3.5 font-medium text-white transition hover:bg-brand-deep disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
