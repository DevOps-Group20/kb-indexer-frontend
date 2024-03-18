export default interface Job {
  title: string,
  status: 'Running' | 'Completed' | 'Failed'
}
