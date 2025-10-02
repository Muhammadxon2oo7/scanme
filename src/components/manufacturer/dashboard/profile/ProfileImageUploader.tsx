"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Upload } from "lucide-react"

interface ProfileImageUploaderProps {
  onImageChange: (file: File | null, base64: string | null) => void
  currentImage?: string | null
  isEditing: boolean
}

export function ProfileImageUploader({ onImageChange, currentImage, isEditing }: ProfileImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || "/default-avatar.png")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setPreview(base64)
        onImageChange(file, base64)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex justify-center">
      {isEditing ? (
        <Avatar
          className="h-24 w-24 ring-2 ring-primary/20 cursor-pointer hover:bg-primary/20 transition-all duration-200"
          onClick={() => fileInputRef.current?.click()}
        >
          <AvatarImage src={preview || "/default-avatar.png"} alt="Profil rasmi" />
          <AvatarFallback className="bg-primary/20 text-primary">
            <Upload className="h-12 w-12" />
          </AvatarFallback>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Avatar>
      ) : (
        <Avatar className="h-24 w-24 ring-2 ring-primary/20">
          <AvatarImage src={preview || "/default-avatar.png"} alt="Profil rasmi" />
          <AvatarFallback className="bg-primary/20 text-primary">
            <Upload className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}