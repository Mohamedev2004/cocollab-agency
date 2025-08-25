import React, { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {


  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const { data, setData, post, processing, reset } = useForm({
    email: "",
  })

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route("newsletter.storing"), {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessMessage("Vous êtes bien abonné à notre contact. Merci pour votre confiance !")
        setShowSuccessModal(true)
        reset("email")
      },
    })
  }


  return (
    <footer className="bg-[var(--color-cocollab)] mx-3 py-14 mb-2 shadow-sm rounded-2xl text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-title mb-4">
          Stay Ahead with Collaborative <br />
          <span className="italic font-medium">Insights and Innovation</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 mt-4 max-w-xl mx-auto text-sm md:text-base">
          Join our contact to get exclusive updates on productivity, team collaboration tools, and the future of work.
        </p>

        {/* Form */}
        <form onSubmit={handleNewsletterSubmit} 
         className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value.toLowerCase())}
            required
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-900"
          />
          <button
              type="submit"
              disabled={processing}
              className="bg-[#f3f3f3] hover:opacity-85 px-6 py-3 cursor-pointer rounded-lg text-black font-semibold w-full sm:w-auto"
            >
              {processing ? "..." : "Subscribe"}
            </button>
        </form>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-16 pt-12 mx-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Logo & Slogan */}
          <div className="text-left">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold">Cocollab</h3>
            </div>
            <p className="text-sm text-gray-300">
              Empower your team with tools <br /> built for seamless collaboration.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-300 text-left w-full md:w-auto">
            <div>
              <h4 className="font-semibold mb-2 text-white">Platform</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Workspaces</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">Support</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">Legal</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className=" bg-[var(--color-cocollab)] text-center">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Merci pour votre abonnement!</DialogTitle>
          </DialogHeader>
          <p className="text-white text-left text-lg">{successMessage}</p>
          <DialogFooter className="flex justify-center">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-white cursor-pointer text-[var(--color-cocollab)] font-semibold border border-white hover:bg-[var(--color-cocollab)] hover:text-white"
            >
              Terminer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
