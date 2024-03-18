export default interface Job {
  id: string,
  title: string,
  status: 'Running' | 'Completed' | 'Failed'
}
