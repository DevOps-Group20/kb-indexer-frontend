import { ToastProgrammatic as Toast } from 'buefy'

export const defaultToast = (message: string) => Toast.open({
  message: message,
  type: 'is-dark',
  position: 'is-bottom'
})
