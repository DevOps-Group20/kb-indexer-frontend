interface Source {
  uuid: string,
  name: string,
  command: string
}
export default interface Indexer {
    name: string,
    sources: Source[]
}
