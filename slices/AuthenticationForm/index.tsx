"use client";

import { FC, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Content, type LinkField, type RichTextField } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type AuthenticationFormProps =
  SliceComponentProps<Content.AuthenticationFormSlice>;

const AuthenticationForm: FC<AuthenticationFormProps> = ({ slice }) => {
  const router = useRouter();
  type ExtraPrimaryFields = {
    alternate_text?: RichTextField;
    link?: LinkField;
  };
  const extendedPrimary = slice.primary as Content.AuthenticationFormSlice["primary"] &
    ExtraPrimaryFields;

  // Initialize form state only if fields exist
  const initialFormState: Record<string, string> = {};
  if (slice.primary.form_fields && slice.primary.form_fields.length > 0) {
    slice.primary.form_fields.forEach((field, index) => {
      const key = field.input_label ?? `field_${index}`;
      initialFormState[key] = "";
    });
  }

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  };

  const isFormValid =
    Object.keys(formData).length === 0
      ? true
      : Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setMessage("❌ Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Only submit if fields exist
      if (Object.keys(formData).length > 0) {
        const response = await fetch("https://fakestoreapi.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        setMessage(`✅ User created successfully! ID: ${data.id}`);
        setFormData(initialFormState);
        setTouchedFields({});
      } else {
        setMessage("✅ No fields to submit.");
      }

      router.push("/allproduct");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 p-4">
      <section className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading1: ({ children }) => <>{children}</>,
                heading2: ({ children }) => <>{children}</>,
                paragraph: ({ children }) => <>{children}</>,
              }}
            />
          </h1>
        </div>

        {/* Description */}
        {slice.primary.description && (
          <div className="text-gray-600 text-center text-base md:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <div>{children}</div>,
                heading2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
              }}
            />
          </div>
        )}

        {/* Form */}
        {slice.primary.form_fields && slice.primary.form_fields.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {slice.primary.form_fields.map((item, index) => {
              const key = item.input_label ?? `field_${index}`;
              const showError = touchedFields[key] && formData[key].trim() === "";

              return (
                <div key={index} className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-800">
                    {item.input_label}
                  </label>
                  <input
                    name={key}
                    type={item.input_type || "text"}
                    value={formData[key] ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={item.input_label ?? ""}
                    className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm ${
                      showError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError && (
                    <span className="text-red-500 text-sm mt-1">
                      This field is required
                    </span>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full py-3 px-6 font-bold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Submitting..." : slice.primary.button_label || "Submit"}
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-500 py-6 border-dashed border-2 border-gray-300 rounded-xl">
            No form fields available.
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`text-center font-medium mt-2 ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Alternate Text + Link */}
        {(extendedPrimary.alternate_text || extendedPrimary.link) && (
          <div className="text-center text-gray-600 mt-4 text-sm md:text-base">
            {extendedPrimary.alternate_text && (
              <span>
                <PrismicRichText
                  field={extendedPrimary.alternate_text}
                  components={{
                    paragraph: ({ children }) => <span>{children}</span>,
                  }}
                />
              </span>
            )}
            {extendedPrimary.link && (
              <PrismicNextLink
                field={extendedPrimary.link}
                className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline ml-1"
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AuthenticationForm;
