"use client"

import { Card } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { Star, BarChart3 } from "lucide-react"

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

interface ReviewStatsProps {
  reviews: Review[]
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  // Calculate statistics
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { rating, count, percentage }
  })

  const verifiedReviews = reviews.filter((review) => review.verified).length

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Baho Statistikasi
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating) ? "text-yellow-500 fill-current" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground">{totalReviews.toLocaleString()} sharhga asoslangan</p>
          <p className="text-sm text-muted-foreground mt-1">{verifiedReviews} tasdiqlangan xaridor</p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              </div>
              <div className="flex-1">
                <Progress value={percentage} className="h-2" />
              </div>
              <div className="w-12 text-right">
                <span className="text-sm text-muted-foreground">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(((ratingDistribution[0].count + ratingDistribution[1].count) / totalReviews) * 100)}%
          </div>
          <p className="text-sm text-muted-foreground">Ijobiy baho</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{verifiedReviews}</div>
          <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {reviews.reduce((sum, review) => sum + review.helpful, 0)}
          </div>
          <p className="text-sm text-muted-foreground">Foydali deb topilgan</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {averageRating >= 4.5 ? "A+" : averageRating >= 4 ? "A" : averageRating >= 3.5 ? "B+" : "B"}
          </div>
          <p className="text-sm text-muted-foreground">Umumiy baho</p>
        </div>
      </div>
    </Card>
  )
}
