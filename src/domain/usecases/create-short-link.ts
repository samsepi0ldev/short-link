import { Link } from '@/domain/entities/link'

export abstract class CreateShortLink {
  abstract create (input: CreateShortLink.Input): Promise<CreateShortLink.Output>
}

export namespace CreateShortLink {
  export type Input = {
    url: string
    slug: string
  }
  export type Output = Link
}
