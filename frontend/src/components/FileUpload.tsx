'use client'

import { ChangeEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import api from '../services/api'

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: string;
}

export function FileUpload({ onFileUpload, accept = "image/*" }: FileUploadProps) {
  const [preview, setPreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
      setIsUploading(true)
      try {
        const formData = new FormData()
        formData.append('profile_picture', file)
        
        const response = await api.post('/upload-profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        
        const imageUrl = response.data.url
        setPreview(imageUrl)
        //onFileUpload(imageUrl) //This line is removed because the file is already uploaded using onFileUpload(file)
      } catch (error) {
        console.error('Error uploading file:', error)
        // Handle error (e.g., show a toast notification)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="picture" className="sr-only">Choose profile picture</Label>
          <Input
            id="picture"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="cursor-pointer"
            disabled={isUploading}
          />
        </div>
        <Button type="button" variant="outline" size="icon" disabled={isUploading}>
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      {preview && (
        <div className="relative aspect-square w-20 rounded-full overflow-hidden border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  )
}

