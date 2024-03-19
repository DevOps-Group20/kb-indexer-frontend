import { ToastProgrammatic as Toast } from 'buefy'

type ToastColorType = 'is-dark' | 'is-success' | 'is-info' | 'is-warning' | 'is-danger';
type ToastPosition = 'is-top' | 'is-bottom';

export const displayToast = (message: string, type?: ToastColorType, position?: ToastPosition) => Toast.open({
  message: message,
  type: type ?? 'is-dark',
  position: position ??'is-bottom'
})
