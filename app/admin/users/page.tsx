"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserRole } from "@/lib/auth"
import { Trash2, UserPlus, Shield, AlertCircle } from "lucide-react"

export default function AdminUsersPage() {
  const { users, addUser, removeUser, updateUserRole, isOwner, currentUser } = useAuth()
  const [newEmail, setNewEmail] = useState("")
  const [newName, setNewName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newRole, setNewRole] = useState<UserRole>("moderator")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleAddUser = () => {
    if (!isOwner) {
      setErrorMessage("Only the owner can add new users")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    if (!newEmail || !newName || !newPassword) {
      setErrorMessage("Please fill in all required fields")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    const success = addUser(newEmail, newName, newRole, newPassword)
    if (success) {
      setSuccessMessage(`User ${newName} added successfully`)
      setNewEmail("")
      setNewName("")
      setNewPassword("")
      setConfirmPassword("")
      setNewRole("moderator")
    } else {
      setErrorMessage("User with this email already exists")
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  const handleRemoveUser = (email: string) => {
    if (!isOwner) {
      setErrorMessage("Only the owner can remove users")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    const success = removeUser(email)
    if (success) {
      setSuccessMessage("User removed successfully")
    } else {
      setErrorMessage("Cannot remove the owner account")
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  const handleUpdateRole = (email: string, role: UserRole) => {
    if (!isOwner) {
      setErrorMessage("Only the owner can change user roles")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    const success = updateUserRole(email, role)
    if (success) {
      setSuccessMessage("User role updated successfully")
    } else {
      setErrorMessage("Cannot change the owner's role")
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  // If not owner, show access denied message
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#1a1b26]">
        <AdminSidebar />
        <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">User Management</h1>

          <Card className="bg-[#252632]/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Only the owner (panda@gmail.com) can access the user management page. You are currently logged in as{" "}
                {currentUser?.name} ({currentUser?.email}).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1b26]">
      <AdminSidebar />
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">User Management</h1>

        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-md text-sm mb-6">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md text-sm mb-6">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Add New User</CardTitle>
              <CardDescription className="text-gray-300">
                Add moderators or admins to help manage the site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                  placeholder="Display Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                  placeholder="Password (min 6 characters)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#1a1b26] border-gray-700 text-white"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Role
                </Label>
                <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                  <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252632] border-gray-700">
                    <SelectItem value="moderator" className="text-white">
                      Moderator
                    </SelectItem>
                    <SelectItem value="admin" className="text-white">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddUser}
                className="bg-gradient-to-r from-[#9d7cff] to-[#7c4dff] hover:from-[#8a63ff] hover:to-[#6e3aff] w-full flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#252632]/80 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Manage Users</CardTitle>
              <CardDescription className="text-gray-300">View and manage existing users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.email}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#1a1b26] rounded-lg gap-4"
                  >
                    <div>
                      <h3 className="text-white font-medium">{user.name}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <p className="text-gray-400 text-xs mt-1">Role: {user.role}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-2 md:mt-0">
                      {user.role !== "owner" && (
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleUpdateRole(user.email, value as UserRole)}
                        >
                          <SelectTrigger className="bg-[#1a1b26] border-gray-700 text-white w-full md:w-32">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#252632] border-gray-700">
                            <SelectItem value="moderator" className="text-white">
                              Moderator
                            </SelectItem>
                            <SelectItem value="admin" className="text-white">
                              Admin
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}

                      {user.role === "owner" ? (
                        <Shield className="h-5 w-5 text-[#9d7cff]" title="Owner account cannot be removed" />
                      ) : (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveUser(user.email)}
                          title="Remove user"
                          className="w-full md:w-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
