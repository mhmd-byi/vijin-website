"use server";

export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "message", string>>;
  values?: Record<string, string>;
};

const str = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (str(formData.get("website"), 200)) {
    return { status: "ok", message: "Thank you. We will get back to you shortly." };
  }

  const values = {
    name: str(formData.get("name"), 120),
    phone: str(formData.get("phone"), 20),
    email: str(formData.get("email"), 160),
    product: str(formData.get("product"), 120),
    message: str(formData.get("message"), 2000),
  };

  const errors: NonNullable<EnquiryState["errors"]> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!/^\+?[0-9][0-9\s-]{7,16}$/.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 5) errors.message = "Please tell us a little about your requirement.";

  if (Object.keys(errors).length) {
    return { status: "error", errors, values, message: "Please fix the highlighted fields." };
  }

  // TODO: real delivery (email / CRM / WhatsApp API) is not wired up yet. For now the enquiry is only logged on the server.
  console.log("[enquiry]", JSON.stringify(values));

  return { status: "ok", message: "Thank you. We have received your enquiry and will get back to you shortly." };
}
