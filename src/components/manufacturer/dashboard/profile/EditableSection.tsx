// "use client"

// import { useState } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Edit2, Save } from "lucide-react"

// interface EditableSectionProps {
//   title: string
//   fields: {
//     label: string
//     name: string
//     type: "text" | "select"
//     value: string
//     options?: string[]
//   }[]
//   onSave: (data: Record<string, string>) => void
// }

// export function EditableSection({ title, fields, onSave }: EditableSectionProps) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState<Record<string, string>>(
//     fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
//   )

//   const handleChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = () => {
//     onSave(formData)
//     setIsEditing(false)
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-semibold">{title}</h2>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setIsEditing(!isEditing)}
//           className="hover:bg-primary/10 transition-all duration-200"
//         >
//           {isEditing ? (
//             <>
//               <Save className="mr-2 h-4 w-4" />
//               Saqlash
//             </>
//           ) : (
//             <>
//               <Edit2 className="mr-2 h-4 w-4" />
//               Tahrirlash
//             </>
//           )}
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {fields.map((field) => (
//           <div key={field.name} className="space-y-2">
//             <Label htmlFor={field.name}>{field.label}</Label>
//             {isEditing ? (
//               field.type === "select" ? (
//                 <Select
//                   value={formData[field.name]}
//                   onValueChange={(value) => handleChange(field.name, value)}
//                 >
//                   <SelectTrigger className="border-primary/20 focus:ring-primary/50 transition-all duration-200">
//                     <SelectValue placeholder={`Select ${field.label}`} />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {field.options?.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {option}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               ) : (
//                 <Input
//                   id={field.name}
//                   value={formData[field.name]}
//                   onChange={(e) => handleChange(field.name, e.target.value)}
//                   className="border-primary/20 focus:ring-primary/50 transition-all duration-200"
//                 />
//               )
//             ) : (
//               <p className="text-sm text-foreground">{formData[field.name] || "N/A"}</p>
//             )}
//           </div>
//         ))}
//       </div>
//       {isEditing && (
//         <Button
//           className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
//           onClick={handleSubmit}
//         >
//           Saqlash
//         </Button>
//       )}
//     </div>
//   )
// }
