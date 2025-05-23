"use client"

import type React from "react"
import Image from "next/image"
import { Upload } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ThemeMode } from "@/app/page"
import { is } from "date-fns/locale"
import { AuthButtons } from "@/AuthButtons"
import type { LogoutOptions } from "@auth0/auth0-react"

interface ImageUploadProps {
  imageUrl: string | null
  onImageUpload: (url: string, file: File) => void
  themeMode: ThemeMode
  isAuthenticated: boolean
  loginWithRedirect: () => void
  logout: (options?: LogoutOptions) => Promise<void>
}

export function ImageUpload({ 
  imageUrl, onImageUpload, themeMode, isAuthenticated,
  loginWithRedirect, logout
 }: ImageUploadProps) {
  const isMorning = themeMode === "morning"
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onImageUpload(url, file)
    }
  }

  return (
    <Card
      className={`h-[500px] flex flex-col items-center justify-center p-6 relative shadow-xl border-none overflow-hidden transition-colors duration-300 ${
        isMorning ? "bg-gradient-to-r from-amber-50 to-orange-50" : "bg-gradient-to-r from-indigo-50 to-purple-50"
      }`}
    >
      {imageUrl ? (
        <div className="relative w-full h-full rounded-md overflow-hidden shadow-inner">
          <Image src={imageUrl || "/placeholder.svg"} alt="Uploaded image" fill className="object-contain" />
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center h-full w-full border-2 border-dashed rounded-lg transition-colors duration-300 ${
            isMorning ? "border-amber-300 image-upload-area-morning" : "border-indigo-300 image-upload-area"
          }`}
        >
          <Upload
            className={`h-16 w-16 mb-4 transition-colors duration-300 ${
              isMorning ? "text-amber-400" : "text-indigo-400"
            }`}
          />
          <p
            className={`mb-4 font-medium transition-colors duration-300 ${
              isMorning ? "text-amber-600" : "text-indigo-500"
            }`}
          >
            {isAuthenticated ? "Upload your image" : "Log in to upload an image"}
          </p>
        </div>
      )}
      <div className="absolute bottom-10">
        {isAuthenticated ? (<>
          <Label
          htmlFor="image-upload"
          className={`cursor-pointer px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${
            isMorning ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload Image
        </Label>
          <Input id="image-upload" type="file" accept="image/jpeg" className="hidden" onChange={handleImageUpload} /> </>) : 
        (<AuthButtons
          label="Log In To Upload"
          isMorning={isMorning}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logout={logout}
        />)}
      </div>
    </Card>
  )
}
