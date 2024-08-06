import type React from 'react'
import type { ToasterProps, ToastOptions, ToastType } from 'react-hot-toast'
import { toast as toastNative, Toaster as ToasterNative } from 'react-hot-toast'

type SvagToastPropsType = 'positive' | 'negative' | 'info' | 'neutral' | 'warning'
type SvagToastProps = {
  type?: SvagToastPropsType
  position?: ToasterProps['position']
  duration?: ToastOptions['duration']
  message: React.ReactNode
  render?: () => React.ReactNode
}

export const createToasterThings = ({
  defaultPosition = 'top-right',
  defaultDuration = 5_000,
  defaultRender,
}: {
  defaultPosition?: ToasterProps['position']
  defaultDuration?: ToastOptions['duration']
  defaultRender?: SvagToastProps['render']
} = {}) => {
  const Toaster = () => {
    return (
      <ToasterNative
        position={defaultPosition}
        toastOptions={{
          duration: defaultDuration,
          position: defaultPosition,
        }}
      />
    )
  }

  const toast = ({
    type = 'neutral',
    position = defaultPosition,
    duration = defaultDuration,
    message,
    render = defaultRender,
  }: SvagToastProps) => {
    if (!message) {
      return undefined
    }
    if (render) {
      return toastNative.custom(
        <div>
          {type}: {message}
        </div>,
        {
          position,
          duration,
        }
      )
    } else {
      const nativeType = (
        {
          positive: 'success' as const,
          negative: 'error' as const,
          info: 'custom' as const,
          neutral: 'custom' as const,
          warning: 'error' as const,
        } satisfies Record<SvagToastPropsType, ToastType>
      )[type]

      return toastNative[nativeType](message as any, {
        position,
        duration,
      })
    }
  }
  Object.assign(toast, toastNative)

  return {
    Toaster,
    toast: toast as typeof toast & typeof toastNative,
  }
}
