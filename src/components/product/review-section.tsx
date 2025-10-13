"use client"

import { useState } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Send, User } from "lucide-react"
import { ReviewStats } from "@/src/components/product/review-stats"

interface ReviewSectionProps {
  productId: string
}

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  notHelpful: number
  verified: boolean
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)


  const reviews: Review[] = [
    {
      id: "1",
      userName: "Aziz M.",
      rating: 5,
      comment: "Ajoyib telefon! Kamera sifati va batareya hayoti juda yaxshi. Tavsiya qilaman.",
      date: "2025-01-18",
      helpful: 24,
      notHelpful: 2,
      verified: true,
    },
    {
      id: "2",
      userName: "Malika S.",
      rating: 4,
      comment: "Yaxshi mahsulot, lekin narxi biroz qimmat. Sifat esa zo'r.",
      date: "2025-01-15",
      helpful: 18,
      notHelpful: 1,
      verified: true,
    },
    {
      id: "3",
      userName: "Bobur K.",
      rating: 5,
      comment: "Kutganimdan ham yaxshi chiqdi. Tez ishlaydi va dizayni chiroyli.",
      date: "2025-01-12",
      helpful: 31,
      notHelpful: 0,
      verified: false,
    },
    {
      id: "4",
      userName: "Nilufar T.",
      rating: 4,
      comment: "Kamera juda yaxshi, lekin ba'zida sekinlashadi. Umuman olganda mamnunman.",
      date: "2025-01-10",
      helpful: 12,
      notHelpful: 3,
      verified: true,
    },
  ]

  const handleRatingClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleSubmitReview = async () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Iltimos, baho va sharh yozing!")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Review submitted:", newReview)
      setNewReview({ rating: 0, comment: "" })
      setShowReviewForm(false)
      alert("Sharhingiz muvaffaqiyatli yuborildi!")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHelpfulClick = (reviewId: string, type: "helpful" | "notHelpful") => {
    console.log(`Marked review ${reviewId} as ${type}`)
  }

  return (
    <div className="space-y-6">
      <ReviewStats reviews={reviews} />

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Sharh Yozish
          </h2>
          {!showReviewForm && (
            <Button onClick={() => setShowReviewForm(true)} className="scan-button">
              <MessageSquare className="mr-2 h-4 w-4" />
              Sharh Yozish
            </Button>
          )}
        </div>

        {showReviewForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Baho bering:</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= newReview.rating ? "text-yellow-500 fill-current" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
                {newReview.rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">{newReview.rating} yulduz</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sharhingiz:</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Mahsulot haqida fikringizni bildiring..."
                rows={4}
                className="bg-background/50"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Bekor Qilish
              </Button>
              <Button onClick={handleSubmitReview} disabled={isSubmitting} className="scan-button">
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Yuborilmoqda..." : "Sharh Yuborish"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-6">Foydalanuvchi Sharhlari</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{review.userName}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Tasdiqlangan xaridor
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-yellow-500 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{review.rating} yulduz</span>
                  </div>

                  <p className="text-muted-foreground">{review.comment}</p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpfulClick(review.id, "helpful")}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Foydali ({review.helpful})
                    </button>
                    <button
                      onClick={() => handleHelpfulClick(review.id, "notHelpful")}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Foydali emas ({review.notHelpful})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
