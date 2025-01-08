"use client"

import * as React from "react"
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

  const toast = ({ ...props }: Omit<ToasterToast, "id">) => {
    const id = genId()
    const newToast = { ...props, id }
    setToasts((prevToasts) => [...prevToasts, newToast])
    return newToast
  }

  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) => 
      prevToasts.filter((toast) => toast.id !== toastId)
    )
  }

  return {
    toast,
    dismiss,
    toasts,
  }
} 