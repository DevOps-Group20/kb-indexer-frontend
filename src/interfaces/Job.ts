export type JobStatus = 'Running' | 'Completed' | 'Failed'
export default interface Job {
  id: string,
  title: string,
  status: JobStatus,
  cronSchedule?: string
}
