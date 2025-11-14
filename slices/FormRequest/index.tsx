"use client";

import { FC, useState } from "react";

export type FormRequestProps = {
  slice: any;
};

const SimpleRichTextTitle: FC<{ field: any[] }> = ({ field }) => {
  if (!Array.isArray(field)) return null;
  const textBlock = field.find(
    (block) =>
      (block.type === "heading2" || block.type === "paragraph") && block.text,
  );
  if (textBlock) return <span>{textBlock.text}</span>;
  return null;
};

const FormRequest: FC<FormRequestProps> = ({ slice }) => {
  const primary = slice.primary || {};

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    description: "",
    requestType: "",
    attachments: null as File | null,
  });

  const [showToast, setShowToast] = useState(false);

  const requestOptions = Array.isArray(primary.request_type_options)
    ? primary.request_type_options
    : primary.request_type_options
    ? [primary.request_type_options]
    : [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "attachments") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, attachments: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setFormData({
      email: "",
      subject: "",
      description: "",
      requestType: "",
      attachments: null,
    });
  };

  const attachmentsLabel = primary.attachments_label || "Attachments";
  const attachmentsOptional = primary.attachments_optional || "(optional)";

  return (
    <section className="px-4 pb-16 bg-white text-black">
      {/* --- HEADER SECTION (Breadcrumb + Search bar) --- */}
      <div className="flex justify-between items-center mb-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 pl-4">
          {primary.little_text && (
            <span className="after:content-['>'] after:mx-2">
              {primary.little_text}
            </span>
          )}
          {primary.next_little_text && (
            <span className="font-medium text-black">
              {primary.next_little_text}
            </span>
          )}
        </div>

        {/* Search bar */}
        {primary.searchbar_placeholder && (
          <div className="relative w-1/3"> {/* reduced width from 1/2 to 1/3 */}
            <input
              type="text"
              placeholder={primary.searchbar_placeholder}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-9 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* --- CONTAINER (Title + Form) --- */}
      <div className="max-w-3xl mx-auto text-left">
        {/* Title */}
        {primary.title && (
          <h2 className="text-4xl font-semibold mb-10 mt-2 text-left text-black">
            {Array.isArray(primary.title)
              ? primary.title[0]?.text || ""
              : primary.title}
          </h2>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-black">
              {primary.email_label || "Your email address"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-black">
              {primary.subject_label || "Subject"}
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-black">
              {primary.description_label || "Description"}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            {primary.description_helper && (
              <p className="text-sm text-gray-600 mt-2">
                {primary.description_helper}
              </p>
            )}
          </div>

          {/* Request Type */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-black">
              {primary.request_type_label || "Request Type"}
            </label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">-</option>
              {requestOptions.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {primary.request_helper_text && (
              <p className="text-sm text-gray-600 mt-2">
                {primary.request_helper_text}
              </p>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-black">
              {attachmentsLabel}{" "}
              <span className="font-normal text-gray-500">
                {attachmentsOptional}
              </span>
            </label>
            <label
              htmlFor="attachments-file"
              className="relative flex justify-center items-center w-full h-32 px-6 py-4 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            >
              <span className="text-sm text-gray-600">
                {primary.file_upload_prompt || "Add file or drop files here"}
              </span>
              <input
                id="attachments-file"
                type="file"
                name="attachments"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold uppercase text-sm px-6 py-3 rounded-sm hover:bg-yellow-500 transition-colors"
          >
            {primary.submit_button_label || "Submit"}
          </button>
        </form>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg animate-slide-up z-50">
          Request has been submitted!
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes slide-up {
            0% { transform: translate(-50%, 100%); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }
          .animate-slide-up { animation: slide-up 0.5s ease-out; }
        `}
      </style>
    </section>
  );
};

export default FormRequest;
