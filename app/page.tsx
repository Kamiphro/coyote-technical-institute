import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Coyote Technology Institute Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#800000] sm:text-4xl md:text-5xl">Coyote Technology Institute</h1>
          <p className="text-xl font-medium text-[#D4AF37]">Empowering Enrollment, Simplified.</p>
        </div>

        <div className="mt-8 w-full max-w-md space-y-6 px-4">
          <Link href="/student-login" className="block w-full">
            <Button className="w-full bg-[#800000] py-6 text-lg font-semibold text-white hover:bg-[#600000]">
              Student Portal
            </Button>
          </Link>

          <Link href="/admin-login" className="block w-full">
            <Button
              variant="outline"
              className="w-full border-2 border-[#D4AF37] py-6 text-lg font-semibold text-[#800000] hover:bg-[#D4AF37]/10"
            >
              Admin Portal
            </Button>
          </Link>
        </div>

        <footer className="mt-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Coyote Technology Institute. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
