export class Link {
  id!: string
  slug!: string
  url!: string
  short_url!: string
  created_at!: Date

  constructor (props: Link) {
    Object.assign(this, props)
  }
}
