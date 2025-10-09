// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "@/src/components/ui/card"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/src/components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/src/components/ui/dialog"
// import { Alert, AlertDescription } from "@/src/components/ui/alert"
// import { AlertCircle, Plus, Edit, Trash2, Users } from "lucide-react"
// import { Employee, EmployeeData, getEmployees, addEmployee, updateEmployee, deleteEmployee } from "@/lib/api"

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState<Employee[]>([])
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [addError, setAddError] = useState<string | null>(null)
//   const [editError, setEditError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     password: "",
//     username: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//   })
//   const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null)

//   // Sana-vaqtni formatlash: kun.oy.yil 00:00 soat
//   const formatDateTime = (dateTime: string): string => {
//     if (!dateTime) return "N/A"
//     try {
//       const date = new Date(dateTime)
//       const day = String(date.getDate()).padStart(2, "0")
//       const month = String(date.getMonth() + 1).padStart(2, "0")
//       const year = date.getFullYear()
//       const hours = String(date.getHours()).padStart(2, "0")
//       const minutes = String(date.getMinutes()).padStart(2, "0")
//       return `${day}.${month}.${year} ${hours}:${minutes}`
//     } catch {
//       return "N/A"
//     }
//   }

//   // Hodimlar ro'yxatini olish (is_staff: false bo'lganlar)
//   const fetchEmployees = async () => {
//     setIsLoading(true)
//     setAddError(null)
//     setEditError(null)
//     try {
//       const data = await getEmployees()
//       // is_staff: true bo'lgan hodimlarni filtrlaymiz
//       const filteredData = data.filter(employee => !employee.is_staff)
//       setEmployees(filteredData)
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Yangi hodim qo'shish
//   const handleAddEmployee = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setAddError(null)
//     setIsLoading(true)

//     try {
//       const processedData: EmployeeData = {
//         password: formData.password,
//         username: formData.username,
//         ...(formData.first_name && { first_name: formData.first_name }),
//         ...(formData.last_name && { last_name: formData.last_name }),
//         ...(formData.email && { email: formData.email }),
//       }

//       await addEmployee(processedData)
//       setIsAddModalOpen(false)
//       setFormData({ password: "", username: "", first_name: "", last_name: "", email: "" })
//       await fetchEmployees()
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Hodimni tahrirlash
//   const handleEditEmployee = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!editEmployeeId) return
//     setEditError(null)
//     setIsLoading(true)

//     try {
//       const processedData: Partial<EmployeeData> = {
//         ...(formData.password && { password: formData.password }),
//         ...(formData.username && { username: formData.username }),
//         ...(formData.first_name && { first_name: formData.first_name }),
//         ...(formData.last_name && { last_name: formData.last_name }),
//         ...(formData.email && { email: formData.email }),
//       }

//       await updateEmployee(editEmployeeId, processedData)
//       setIsEditModalOpen(false)
//       setFormData({ password: "", username: "", first_name: "", last_name: "", email: "" })
//       setEditEmployeeId(null)
//       await fetchEmployees()
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setEditError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Hodimni o'chirish
//   const handleDeleteEmployee = async (id: number) => {
//     setAddError(null)
//     setEditError(null)
//     setIsLoading(true)

//     try {
//       await deleteEmployee(id)
//       await fetchEmployees()
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Modal uchun ma'lumotlarni to'ldirish (tahrirlash uchun)
//   const openEditModal = (employee: Employee) => {
//     setFormData({
//       password: "", // Parol bo'sh bo'ladi
//       username: employee.username,
//       first_name: employee.first_name || "",
//       last_name: employee.last_name || "",
//       email: employee.email || "",
//     })
//     setEditEmployeeId(employee.id)
//     setEditError(null)
//     setIsEditModalOpen(true)
//   }

//   useEffect(() => {
//     fetchEmployees()
//   }, [])

//   if (isLoading && employees.length === 0) {
//     return (
//       <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
//         <p>Yuklanmoqda...</p>
//       </Card>
//     )
//   }

//   return (
//     <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold flex items-center">
//           <Users className="mr-2 h-6 w-6" /> Hodimlar
//         </h2>
//         <Dialog open={isAddModalOpen} onOpenChange={(open) => {
//           setIsAddModalOpen(open)
//           if (!open) {
//             setFormData({ password: "", username: "", first_name: "", last_name: "", email: "" })
//             setAddError(null)
//           }
//         }}>
//           <DialogTrigger asChild>
//             <Button className="bg-primary hover:bg-primary/90">
//               <Plus className="mr-2 h-4 w-4" /> Yangi hodim qo‘shish
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="bg-card/90 backdrop-blur-md">
//             <DialogHeader>
//               <DialogTitle>Yangi hodim qo‘shish</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleAddEmployee} className="space-y-4">
//               {addError && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{addError}</AlertDescription>
//                 </Alert>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="username">Foydalanuvchi nomi</Label>
//                 <Input
//                   id="username"
//                   value={formData.username}
//                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                   placeholder="Foydalanuvchi nomini kiriting"
//                   required
//                   className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Parol</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   placeholder="Parolni kiriting"
//                   required
//                   className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="first_name">Ism</Label>
//                 <Input
//                   id="first_name"
//                   value={formData.first_name}
//                   onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                   placeholder="Ismni kiriting"
//                   className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="last_name">Familiya</Label>
//                 <Input
//                   id="last_name"
//                   value={formData.last_name}
//                   onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                   placeholder="Familiyani kiriting"
//                   className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="Email manzilini kiriting"
//                   className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Yuklanmoqda..." : "Qo‘shish"}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {addError && !isAddModalOpen && !isEditModalOpen && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{addError}</AlertDescription>
//         </Alert>
//       )}

//       {employees.length === 0 ? (
//         <div className="text-center py-8">
//           <Users className="mx-auto h-12 w-12 text-gray-400" />
//           <p className="mt-2 text-gray-500">Hodimlar mavjud emas</p>
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Foydalanuvchi nomi</TableHead>
//               <TableHead>Parol</TableHead>
//               <TableHead>Ism</TableHead>
//               <TableHead>Familiya</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Faol</TableHead>
//               <TableHead>Qo‘shilgan vaqti</TableHead>
//               <TableHead>Amallar</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.id}>
//                 <TableCell>{employee.id}</TableCell>
//                 <TableCell>{employee.username}</TableCell>
//                 <TableCell>{employee.password || "N/A"}</TableCell>
//                 <TableCell>{employee.first_name || "N/A"}</TableCell>
//                 <TableCell>{employee.last_name || "N/A"}</TableCell>
//                 <TableCell>{employee.email || "N/A"}</TableCell>
//                 <TableCell>{employee.is_active ? "Ha" : "Yo‘q"}</TableCell>
//                 <TableCell>{formatDateTime(employee.date_joined)}</TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => openEditModal(employee)}
//                       className="hover:bg-primary/10"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleDeleteEmployee(employee.id)}
//                       className="hover:bg-red-600"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       <Dialog open={isEditModalOpen} onOpenChange={(open) => {
//         setIsEditModalOpen(open)
//         if (!open) {
//           setFormData({ password: "", username: "", first_name: "", last_name: "", email: "" })
//           setEditEmployeeId(null)
//           setEditError(null)
//         }
//       }}>
//         <DialogContent className="bg-card/90 backdrop-blur-md">
//           <DialogHeader>
//             <DialogTitle>Hodimni tahrirlash</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleEditEmployee} className="space-y-4">
//             {editError && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{editError}</AlertDescription>
//               </Alert>
//             )}
//             <div className="space-y-2">
//               <Label htmlFor="username">Foydalanuvchi nomi</Label>
//               <Input
//                 id="username"
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 placeholder="Foydalanuvchi nomini kiriting"
//                 className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Yangi parol (ixtiyoriy)</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Yangi parolni kiriting"
//                 className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="first_name">Ism</Label>
//               <Input
//                 id="first_name"
//                 value={formData.first_name}
//                 onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                 placeholder="Ismni kiriting"
//                 className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="last_name">Familiya</Label>
//               <Input
//                 id="last_name"
//                 value={formData.last_name}
//                 onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                 placeholder="Familiyani kiriting"
//                 className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 placeholder="Email manzilini kiriting"
//                 className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Yuklanmoqda..." : "Saqlash"}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, Plus, Trash2, Users } from "lucide-react"
import { Employee, EmployeeData, getEmployees, addEmployee, deleteEmployee } from "@/lib/api"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null)
  const [addError, setAddError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    first_name: "",
    last_name: "",
    jshshir: "",
  })

  // Sana-vaqtni formatlash: kun.oy.yil 00:00 soat
  const formatDateTime = (dateTime: string): string => {
    if (!dateTime) return "N/A"
    try {
      const date = new Date(dateTime)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${day}.${month}.${year} ${hours}:${minutes}`
    } catch {
      return "N/A"
    }
  }

  // Hodimlar ro'yxatini olish (is_staff: false bo'lganlar)
  const fetchEmployees = async () => {
    setIsLoading(true)
    setAddError(null)
    try {
      const data = await getEmployees()
      // is_staff: true bo'lgan hodimlarni filtrlaymiz
      const filteredData = data.filter(employee => !employee.is_staff)
      setEmployees(filteredData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Yangi hodim qo'shish
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError(null)
    setIsLoading(true)

    try {
      const processedData: EmployeeData = {
        password: formData.password,
        username: formData.username,
        ...(formData.first_name && { first_name: formData.first_name }),
        ...(formData.last_name && { last_name: formData.last_name }),
        ...(formData.jshshir && { jshshir: formData.jshshir }),
      }

      await addEmployee(processedData)
      setIsAddModalOpen(false)
      setFormData({ password: "", username: "", first_name: "", last_name: "", jshshir: "" })
      await fetchEmployees()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Hodimni o'chirish
  const handleDeleteEmployee = async () => {
    if (!deleteEmployeeId) return
    setAddError(null)
    setIsLoading(true)

    try {
      await deleteEmployee(deleteEmployeeId)
      await fetchEmployees()
      setIsDeleteModalOpen(false)
      setDeleteEmployeeId(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  if (isLoading && employees.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <p>Yuklanmoqda...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Users className="mr-2 h-6 w-6" /> Hodimlar
        </h2>
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
          setIsAddModalOpen(open)
          if (!open) {
            setFormData({ password: "", username: "", first_name: "", last_name: "", jshshir: "" })
            setAddError(null)
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Yangi hodim qo‘shish
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/90 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Yangi hodim qo‘shish</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              {addError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{addError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Foydalanuvchi nomi</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Foydalanuvchi nomini kiriting"
                  required
                  className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Parolni kiriting"
                  required
                  className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="first_name">Ism</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="Ismni kiriting"
                  className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Familiya</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Familiyani kiriting"
                  className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jshshir">JSHSHIR</Label>
                <Input
                  id="jshshir"
                  value={formData.jshshir}
                  onChange={(e) => setFormData({ ...formData, jshshir: e.target.value })}
                  placeholder="JSHSHIR ni kiriting"
                  className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Yuklanmoqda..." : "Qo‘shish"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addError && !isAddModalOpen && !isDeleteModalOpen && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{addError}</AlertDescription>
        </Alert>
      )}

      {employees.length === 0 ? (
        <div className="text-center py-8">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500">Hodimlar mavjud emas</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Foydalanuvchi nomi</TableHead>
              <TableHead>Ism</TableHead>
              <TableHead>Familiya</TableHead>
              <TableHead>JSHSHIR</TableHead>
              <TableHead>Faol</TableHead>
              <TableHead>Qo‘shilgan vaqti</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.first_name || "N/A"}</TableCell>
                <TableCell>{employee.last_name || "N/A"}</TableCell>
                <TableCell>{employee.jshshir || "N/A"}</TableCell>
                <TableCell>{employee.is_active ? "Ha" : "Yo‘q"}</TableCell>
                <TableCell>{formatDateTime(employee.date_joined)}</TableCell>
                
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDeleteEmployeeId(employee.id)
                      setIsDeleteModalOpen(true)
                    }}
                    className="hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDeleteModalOpen} onOpenChange={(open) => {
        setIsDeleteModalOpen(open)
        if (!open) {
          setDeleteEmployeeId(null)
        }
      }}>
        <DialogContent className="bg-card/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Hodimni o'chirishni tasdiqlash</DialogTitle>
          </DialogHeader>
          <p>Haqiqatdan ham ushbu hodimni o'chirmoqchimisiz?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEmployee}
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "O'chirish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}