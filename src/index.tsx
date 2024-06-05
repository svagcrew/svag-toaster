import type React from 'react'
import type { ToasterProps, ToastOptions } from 'react-hot-toast'
import { toast as toastNative, Toaster as ToasterNative } from 'react-hot-toast'

type SvagToastProps = {
  type?: 'positive' | 'negative' | 'info' | 'neutral' | 'warning'
  position?: ToasterProps['position']
  duration?: ToastOptions['duration'] | false
  message: React.ReactNode
}

export const createToasterThings = ({
  defaultPosition = 'top-center',
  defaultDuration = 5_000,
}: {
  defaultPosition?: ToasterProps['position']
  defaultDuration?: ToastOptions['duration'] | false
} = {}) => {
  const Toaster = () => {
    return (
      <ToasterNative
        position={defaultPosition}
        toastOptions={{
          duration: defaultDuration || Infinity,
          position: defaultPosition,
        }}
      />
    )
  }

  const toast = ({
    type = 'neutral',
    position = defaultPosition,
    duration = defaultDuration || Infinity,
    message,
  }: SvagToastProps) => {
    return toastNative.custom(
      <div>
        {type}: {message}
      </div>,
      {
        position,
        duration: duration || Infinity,
      }
    )
  }
  Object.assign(toast, toastNative)

  return {
    Toaster,
    toast: toast as typeof toast & typeof toastNative,
  }
}
