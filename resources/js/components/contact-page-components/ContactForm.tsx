import React, { useState } from "react"
import { useForm, usePage } from "@inertiajs/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react";

const ContactForm: React.FC = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_subject: "",
    contact_message: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const { flash } = usePage().props as { flash?: { success?: string } }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route("contacts.storing"), {
      onSuccess: () => {
        reset()
        setSuccessMessage("Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.")
        setShowSuccessModal(true)
      },
      preserveScroll: true,
      preserveState: true,
    })
  }
  return (
    <section className="w-full px-4 py-16 bg-white rounded-xl shadow-md">
      <div className="max-w-6xl mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-title text-black font-light">Contact Us</h2>
          <p className="text-gray-600 max-w-lg m-auto mt-4 text-lg">
            We’re here to help! Whether you have questions, feedback, or need support, our team is ready to assist you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Left Side - Contact Info */}
          <div className="lg:w-1/2 space-y-8 flex flex-col justify-between">
            <div>
              <h3 className="text-4xl text-black font-serif font-light mb-6">Get in touch</h3>

              <div className="mb-4">
                <p className="text-gray-500 font-medium">Email:</p>
                <p className="text-lg text-black">contact@cocollab.ma</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 font-medium">Phone:</p>
                <p className="text-lg text-black">(123) 1221 2323</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 font-medium">Address:</p>
                <p className="text-lg text-black">
                  123 Innovation Avenue, Suite 456<br />
                  Tech District, San Francisco, CA 94107<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-1/2 h-full flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-between">
              {flash?.success && (
                  <div className="bg-green-100 border border-green-400 text-black px-4 py-3 rounded relative mb-4">
                  {flash.success}
                  </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="contact_name"
                  value={data.contact_name}
                  onChange={(e) => setData("contact_name", e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full sm:w-1/2 px-4 text-black py-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-cocollab)]"
                />
                {errors.contact_name && <p className="text-red-500 text-sm">{errors.contact_name}</p>}

                <input
                  type="tel"
                  name="contact_phone"
                  value={data.contact_phone}
                  maxLength={10}
                  onChange={(e) => setData("contact_phone", e.target.value.replace(/\D/g, ""))}
                  placeholder="Your phone number"
                  className="w-full sm:w-1/2 text-black px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-cocollab)]"
                />
                {errors.contact_phone && <p className="text-red-500 text-sm">{errors.contact_phone}</p>}
              </div>

              <input
                type="email"
                name="contact_email"
                value={data.contact_email}
                onChange={(e) => setData("contact_email", e.target.value.toLowerCase())}
                required
                placeholder="Your email "
                className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-cocollab)]"
              />
              {errors.contact_email && <p className="text-red-500 text-sm">{errors.contact_email}</p>}

              <input
                type="text"
                name="contact_subject"
                value={data.contact_subject}
                onChange={(e) => setData("contact_subject", e.target.value)}
                placeholder="The subject"
                className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-cocollab)]"
              />
              {errors.contact_subject && <p className="text-red-500 text-sm">{errors.contact_subject}</p>}

              <textarea
                name="contact_message"
                value={data.contact_message}
                onChange={(e) => setData("contact_message", e.target.value)}
                rows={6}
                required
                placeholder="Write something...."
                className="w-full px-4 py-4 border text-black border-gray-300 placeholder-gray-400 rounded-lg resize-none h-40 focus:outline-none focus:ring-2 focus:ring-[var(--color-cocollab)]"
              >
                {errors.contact_message && <p className="text-red-500 text-sm">{errors.contact_message}</p>}
              </textarea>

              <button
                type="submit"
                className="w-full flex flex-row  items-center justify-center gap-2 bg-[var(--color-cocollab)] hover:opacity-90 text-white py-2 cursor-pointer rounded-lg text-md font-semibold"
                style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
                disabled={processing}
              >
                <Send  className="w-5 h-5"/>
                {processing ? "Sending..." : "Send Message"}
              </button>
            </form>
            {/* ✅ Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
              <DialogContent className=" bg-[var(--color-cocollab)] text-center">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl font-bold">Message Envoyé !</DialogTitle>
                </DialogHeader>
                <p className="text-white text-lg">{successMessage}</p>
                <DialogFooter className="flex justify-center">
                  <Button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-white font-semibold text-[var(--color-cocollab)] cursor-pointer border border-white hover:bg-[var(--color-cocollab)] hover:text-white"
                  >
                    Terminer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
