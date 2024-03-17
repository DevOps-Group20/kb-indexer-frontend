import { ToastProgrammatic as Toast } from 'buefy'

export const defaultToast = (message: string) => Toast.open({
  message: 'Invalid Credentials',
  type: 'is-dark',
  position: 'is-bottom'
})
