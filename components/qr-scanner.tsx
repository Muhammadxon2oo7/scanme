"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Camera, Flashlight, FlashlightOff } from "lucide-react"
import { useRouter } from "next/navigation"

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
}

export function QRScanner({ isOpen, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [hasFlash, setHasFlash] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen])

  const startCamera = async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }

      setStream(mediaStream)

      // Check if device has flash
      const track = mediaStream.getVideoTracks()[0]
      const capabilities = track.getCapabilities()
      if (capabilities.torch) {
        setHasFlash(true)
      }

      setIsScanning(true)
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Kameraga kirish imkoni yo'q. Iltimos, brauzer sozlamalarida kameraga ruxsat bering.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
    setFlashOn(false)
  }

  const toggleFlash = async () => {
    if (stream && hasFlash) {
      const track = stream.getVideoTracks()[0]
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashOn }],
        })
        setFlashOn(!flashOn)
      } catch (err) {
        console.error("Flash toggle error:", err)
      }
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        // Simulate QR code detection
        setTimeout(() => {
          stopCamera()
          onClose()
          // Navigate to scan result with mock product ID
          router.push("/scan-result?qr=mock-product-1")
        }, 1000)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="relative h-full w-full">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between text-white">
            <h2 className="text-lg font-semibold">QR Kod Skanerlash</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Camera View */}
        <div className="relative h-full w-full overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-full p-4">
              <Card className="p-6 bg-card/90 backdrop-blur-sm text-center max-w-sm">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Kamera Xatosi</h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={startCamera} className="w-full">
                  Qayta Urinish
                </Button>
              </Card>
            </div>
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

              {/* Scanning Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Scanning Frame */}
                  <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
                    {/* Corner indicators */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>

                    {/* Scanning line */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse"></div>
                  </div>

                  <p className="text-white text-center mt-4 text-sm">QR kodni ramka ichiga joylashtiring</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center justify-center gap-4">
            {hasFlash && (
              <Button
                variant="outline"
                size="lg"
                onClick={toggleFlash}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {flashOn ? <FlashlightOff className="h-5 w-5" /> : <Flashlight className="h-5 w-5" />}
              </Button>
            )}

            <Button
              size="lg"
              onClick={captureImage}
              disabled={!isScanning}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full"
            >
              <Camera className="mr-2 h-5 w-5" />
              Skanerlash
            </Button>
          </div>

          <p className="text-white/70 text-center text-xs mt-3">QR kodni aniq ko'rish uchun kamerani yaqinlashtiring</p>
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
