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
//   DialogFooter,
// } from "@/src/components/ui/dialog"
// import { Alert, AlertDescription } from "@/src/components/ui/alert"
// import { AlertCircle, Plus, Trash2, Users } from "lucide-react"
// import { Employee, EmployeeData, getEmployees, addEmployee, deleteEmployee } from "@/lib/api"

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState<Employee[]>([])
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null)
//   const [addError, setAddError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     password: "",
//     username: "",
//     first_name: "",
//     last_name: "",
//     jshshir: "",
//   })

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

//   // xodimlar ro'yxatini olish (is_staff: false bo'lganlar)
//   const fetchEmployees = async () => {
//     setIsLoading(true)
//     setAddError(null)
//     try {
//       const data = await getEmployees()
//       // is_staff: true bo'lgan xodimlarni filtrlaymiz
//       const filteredData = data.filter(employee => !employee.is_staff)
//       setEmployees(filteredData)
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Yangi xodim qo'shish
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
//         ...(formData.jshshir && { jshshir: formData.jshshir }),
//       }

//       await addEmployee(processedData)
//       setIsAddModalOpen(false)
//       setFormData({ password: "", username: "", first_name: "", last_name: "", jshshir: "" })
//       await fetchEmployees()
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // xodimni o'chirish
//   const handleDeleteEmployee = async () => {
//     if (!deleteEmployeeId) return
//     setAddError(null)
//     setIsLoading(true)

//     try {
//       await deleteEmployee(deleteEmployeeId)
//       await fetchEmployees()
//       setIsDeleteModalOpen(false)
//       setDeleteEmployeeId(null)
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       setAddError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
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
//           <Users className="mr-2 h-6 w-6" /> xodimlar
//         </h2>
//         <Dialog open={isAddModalOpen} onOpenChange={(open) => {
//           setIsAddModalOpen(open)
//           if (!open) {
//             setFormData({ password: "", username: "", first_name: "", last_name: "", jshshir: "" })
//             setAddError(null)
//           }
//         }}>
//           <DialogTrigger asChild>
//             <Button className="bg-primary hover:bg-primary/90">
//               <Plus className="mr-2 h-4 w-4" /> Yangi xodim qo‘shish
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="bg-card/90 backdrop-blur-md">
//             <DialogHeader>
//               <DialogTitle>Yangi xodim qo‘shish</DialogTitle>
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
//                 <Label htmlFor="jshshir">JSHSHIR</Label>
//                 <Input
//                   id="jshshir"
//                   value={formData.jshshir}
//                   onChange={(e) => setFormData({ ...formData, jshshir: e.target.value })}
//                   placeholder="JSHSHIR ni kiriting"
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

//       {addError && !isAddModalOpen && !isDeleteModalOpen && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{addError}</AlertDescription>
//         </Alert>
//       )}

//       {employees.length === 0 ? (
//         <div className="text-center py-8">
//           <Users className="mx-auto h-12 w-12 text-gray-400" />
//           <p className="mt-2 text-gray-500">xodimlar mavjud emas</p>
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>Foydalanuvchi nomi</TableHead>
//               <TableHead>Ism</TableHead>
//               <TableHead>Familiya</TableHead>
//               <TableHead>JSHSHIR</TableHead>
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
//                 <TableCell>{employee.first_name || "N/A"}</TableCell>
//                 <TableCell>{employee.last_name || "N/A"}</TableCell>
//                 <TableCell>{employee.jshshir || "N/A"}</TableCell>
//                 <TableCell>{employee.is_active ? "Ha" : "Yo‘q"}</TableCell>
//                 <TableCell>{formatDateTime(employee.date_joined)}</TableCell>
                
//                 <TableCell>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setDeleteEmployeeId(employee.id)
//                       setIsDeleteModalOpen(true)
//                     }}
//                     className="hover:bg-red-600"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       <Dialog open={isDeleteModalOpen} onOpenChange={(open) => {
//         setIsDeleteModalOpen(open)
//         if (!open) {
//           setDeleteEmployeeId(null)
//         }
//       }}>
//         <DialogContent className="bg-card/90 backdrop-blur-md">
//           <DialogHeader>
//             <DialogTitle>xodimni o'chirishni tasdiqlash</DialogTitle>
//           </DialogHeader>
//           <p>Haqiqatdan ham ushbu xodimni o'chirmoqchimisiz?</p>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Bekor qilish
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleDeleteEmployee}
//               disabled={isLoading}
//             >
//               {isLoading ? "Yuklanmoqda..." : "O'chirish"}
//             </Button>
//           </DialogFooter>
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
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    first_name: "",
    last_name: "",
    jshshir: "",
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const fetchEmployees = async () => {
    setIsLoading(true)
    setAddError(null)
    try {
      const data = await getEmployees()
      const filteredData = data.filter(employee => !employee.is_staff)
      setEmployees(filteredData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

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
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
          <Users className="mr-2 h-5 sm:h-6 w-5 sm:w-6" /> Xodimlar
        </h2>
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
          setIsAddModalOpen(open)
          if (!open) {
            setFormData({ password: "", username: "", first_name: "", last_name: "", jshshir: "" })
            setAddError(null)
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Yangi xodim qo‘shish
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-lg rounded-lg">
            <DialogHeader>
              <DialogTitle>Yangi xodim qo‘shish</DialogTitle>
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
          <p className="mt-2 text-gray-500">Xodimlar mavjud emas</p>
        </div>
      ) : isMobile ? (
        <div className="space-y-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="p-4 bg-card/90 backdrop-blur-md border-border/50">
              <div className="space-y-2">
                <div><strong>ID:</strong> {employee.id}</div>
                <div><strong>Foydalanuvchi nomi:</strong> {employee.username}</div>
                <div><strong>Ism:</strong> {employee.first_name || "N/A"}</div>
                <div><strong>Familiya:</strong> {employee.last_name || "N/A"}</div>
                <div><strong>JSHSHIR:</strong> {employee.jshshir || "N/A"}</div>
                <div><strong>Faol:</strong> {employee.is_active ? "Ha" : "Yo‘q"}</div>
                <div><strong>Qo‘shilgan vaqti:</strong> {formatDateTime(employee.date_joined)}</div>
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDeleteEmployeeId(employee.id)
                      setIsDeleteModalOpen(true)
                    }}
                    className="hover:bg-red-600 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> O‘chirish
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
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
        </div>
      )}

      <Dialog open={isDeleteModalOpen} onOpenChange={(open) => {
        setIsDeleteModalOpen(open)
        if (!open) setDeleteEmployeeId(null)
      }}>
        <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle>Xodimni o'chirishni tasdiqlash</DialogTitle>
          </DialogHeader>
          <p>Haqiqatdan ham ushbu xodimni o'chirmoqchimisiz?</p>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEmployee}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Yuklanmoqda..." : "O'chirish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}