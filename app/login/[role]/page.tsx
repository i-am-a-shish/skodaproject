"use client"

import { useParams } from "next/navigation"
import { CredentialForm } from "@/components/credential-forms"

export default function LoginPage() {
  const params = useParams()
  const role = params.role as "employee" | "lead" | "hod"

  return <CredentialForm role={role} />
}
