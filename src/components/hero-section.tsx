// "use client"

// import { Button } from "@/src/components/ui/button"
// import { Card } from "@/src/components/ui/card"
// import {  Scan, Smartphone, Info, ShirtIcon } from "lucide-react"

// import Image from "next/image"
// import Shuffle from "./react-bits/Shuffle"
// export function HeroSection() {



//   return (
//     <>
//       <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl float-animation"></div>
//           <div
//             className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl float-animation"
//             style={{ animationDelay: "2s" }}
//           ></div>
//           <div
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-2xl float-animation"
//             style={{ animationDelay: "4s" }}
//           ></div>
//         </div>

//         <div className="container mx-auto  relative z-10">
//           <div className="text-center mb-12 sm:mb-16">
           

//            <h1 className="text-xl sm:text-5xl md:text-5xl font-bold text-balance mb-4 sm:mb-6 text-glow leading-tight ">
//   Mahsulot ma'lumotlarini <br />
//    <span className="align-baseline">
//   <Shuffle
//     text="QR kod"
//     shuffleDirection="right"
//     duration={0.35}
//     animationMode="evenodd"
//     shuffleTimes={1}
//     ease="power3.out"
//     stagger={0.03}
//     threshold={0.1}
//     triggerOnce={true}
//     triggerOnHover={true}
//     respectReducedMotion={true}
//     colorFrom="#8DB3DA"
//     colorTo="#ffc073"
//     className="relative top-[15px] text-primary sm:text-5xl md:text-5xl font-bold"
//   />
// </span>


//    {""} orqali oling
// </h1>


//             <p className="text-base sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
//               Har bir mahsulotning to'liq ma'lumotlarini bir marta skanerlash orqali oling. Ishlab chiqaruvchilar uchun
//               professional platforma
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
//               <Button
//                 size="lg"
//                 className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto modern-card border-primary/30 hover:border-primary/60 light-trail  text-white bg-primary"
             
//               >
//                 <Scan className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300 text-white" />
//                 QR Kodni Skanerlash
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto modern-card border-primary/30 hover:border-primary/60 light-trail bg-transparent"
//               >
//                 <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
//                 Video Ko'rish
//               </Button>
//             </div>
//           </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
 
//   <Card className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation">
//     <div className="flex items-center gap-3 mb-3 sm:mb-4">
//       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//         <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
//       </div>
//       <div>
//         <h3 className="font-semibold text-foreground text-sm sm:text-base">Elektronika</h3>
//         <p className="text-xs sm:text-sm text-muted-foreground">Telefon, noutbuk, gadjetlar</p>
//       </div>
//     </div>
//     <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
//       Qurilmani QR orqali skan qiling va texnik xususiyatlari, kafolat muddati hamda original ishlab chiqaruvchini tekshiring
//     </p>
//     <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//   </Card>


//   <Card
//     className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation"
//     style={{ animationDelay: "1s" }}
//   >
//     <div className="flex items-center gap-3 mb-3 sm:mb-4">
//       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//         <Image src="/icons/healthy-drink.png" alt="Healthy Drink" width={64} height={64} className="h-5 w-5 sm:h-6 sm:w-6 text-accent group-hover:rotate-12 transition-transform duration-300" />
//       </div>
//       <div>
//         <h3 className="font-semibold text-foreground text-sm sm:text-base">Oziq-ovqat</h3>
//         <p className="text-xs sm:text-sm text-muted-foreground">Tarkib, ishlab chiqaruvchi</p>
//       </div>
//     </div>
//     <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
//       Mahsulotni skan qiling va uning tarkibi, yaroqlilik muddati, sertifikat va ishlab chiqaruvchi haqida batafsil ma’lumot oling
//     </p>
//     <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//   </Card>

 
//   <Card
//     className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation sm:col-span-2 lg:col-span-1"
//     style={{ animationDelay: "2s" }}
//   >
//     <div className="flex items-center gap-3 mb-3 sm:mb-4">
//       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//         <ShirtIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
        
//       </div>
//       <div>
//         <h3 className="font-semibold text-foreground text-sm sm:text-base">Kiyim</h3>
//         <p className="text-xs sm:text-sm text-muted-foreground">Material, o‘lcham</p>
//       </div>
//     </div>
//     <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
//       QR kod orqali kiyimning materiali, o‘lcham jadvallari va parvarish qilish yo‘riqnomalarini tekshirib, to‘g‘ri tanlov qiling
//     </p>
//     <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//   </Card>
// </div>

//         </div>
//       </section>

      
//     </>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Dialog, DialogContent } from "@/src/components/ui/dialog"
import { Scan, Smartphone, Info, ShirtIcon, Loader2, X } from "lucide-react"
import Shuffle from "./react-bits/Shuffle"

declare global {
  interface Window {
    Html5Qrcode: any
  }
}

export function HeroSection() {
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<any>(null)
  const qrReaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isScannerOpen) return

    const initializeScanner = () => {
      if (!qrReaderRef.current) {
        setError("Skaner elementi topilmadi. Iltimos, sahifani qayta yuklang.")
        setIsScanning(false)
        return
      }

      setIsScanning(true)
      setError(null)

      try {
        scannerRef.current = new window.Html5Qrcode("qr-reader")
        scannerRef.current
          .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText: string) => {
              setScanResult(decodedText)
              setIsScanning(false)
              stopScanner()
            },
            (errorMessage: string) => {
              if (errorMessage.includes("Permission denied")) {
                setError("Kamera ruxsati rad etildi. Iltimos, brauzer sozlamalarida kameraga ruxsat bering.")
                setIsScanning(false)
                stopScanner()
              }
            }
          )
          .catch((err: any) => {
            setError("Kamerani ishga tushirishda xato: " + err.message)
            setIsScanning(false)
          })
      } catch (err) {
        setError("Skaner yuklanmadi. Iltimos, sahifani qayta yuklang.")
        setIsScanning(false)
      }
    }

    const stopScanner = () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err: any) => console.error("Skaner to'xtatishda xato:", err))
        scannerRef.current = null
      }
    }

    // Ensure the DOM element is available before initializing
    const checkElement = setInterval(() => {
      if (qrReaderRef.current) {
        initializeScanner()
        clearInterval(checkElement)
      }
    }, 100)

    return () => {
      clearInterval(checkElement)
      stopScanner()
    }
  }, [isScannerOpen])

  const handleCloseScanner = () => {
    setIsScannerOpen(false)
    setScanResult(null)
    setError(null)
    setIsScanning(false)
  }

  return (
    <>
      <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-2xl float-animation"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-xl sm:text-5xl md:text-5xl font-bold text-balance mb-4 sm:mb-6 text-glow leading-tight">
              Mahsulot ma'lumotlarini <br />
              <span className="align-baseline">
                <Shuffle
                  text="QR kod"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                  colorFrom="#8DB3DA"
                  colorTo="#ffc073"
                  className="relative top-[15px] text-primary sm:text-5xl md:text-5xl font-bold"
                />
              </span>{" "}
              orqali oling
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Har bir mahsulotning to'liq ma'lumotlarini bir marta skanerlash orqali oling. Ishlab chiqaruvchilar uchun
              professional platforma
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto modern-card border-primary/30 hover:border-primary/60 light-trail text-white bg-primary"
                onClick={() => setIsScannerOpen(true)}
              >
                <Scan className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300 text-white" />
                QR Kodni Skanerlash
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto modern-card border-primary/30 hover:border-primary/60 light-trail bg-transparent"
              >
                <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Video Ko'rish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
            <Card className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Elektronika</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Telefon, noutbuk, gadjetlar</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Qurilmani QR orqali skan qiling va texnik xususiyatlari, kafolat muddati hamda original ishlab chiqaruvchini tekshiring
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Card>

            <Card
              className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/icons/healthy-drink.png"
                    alt="Healthy Drink"
                    width={64}
                    height={64}
                    className="h-5 w-5 sm:h-6 sm:w-6 text-accent group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Oziq-ovqat</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Tarkib, ishlab chiqaruvchi</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Mahsulotni skan qiling va uning tarkibi, yaroqlilik muddati, sertifikat va ishlab chiqaruvchi haqida batafsil ma’lumot oling
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Card>

            <Card
              className="modern-card p-4 sm:p-6 group hover:scale-105 transition-all duration-500 float-animation sm:col-span-2 lg:col-span-1"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShirtIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Kiyim</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Material, o‘lcham</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                QR kod orqali kiyimning materiali, o‘lcham jadvallari va parvarish qilish yo‘riqnomalarini tekshirib, to‘g‘ri tanlov qiling
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* QR Skaner Modal */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20">
          <div className="relative flex flex-col items-center p-6 space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-primary/10"
              onClick={handleCloseScanner}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">QR Kodni Skanerlash</h2>
            <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
              <div id="qr-reader" ref={qrReaderRef} className="w-full h-full"></div>
            </div>
            {error && (
              <div className="text-center text-red-500 bg-red-50/50 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}
            {scanResult && (
              <div className="text-center bg-green-50/50 p-4 rounded-lg w-full">
                <p className="text-green-600 font-medium">Skanerlangan natija:</p>
                <p className="text-sm text-muted-foreground break-all">{scanResult}</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent hover:border-primary/60"
                  onClick={() => window.open(scanResult, "_blank")}
                  disabled={!scanResult.startsWith("http")}
                >
                  Natijani ochish
                </Button>
              </div>
            )}
            {isScanning && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Skanerlash jarayonida...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}