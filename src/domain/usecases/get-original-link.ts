import { Link } from '@/domain/entities/link'

export abstract class GetOriginalLink {
  abstract get (input: GetOriginalLink.Input): Promise<GetOriginalLink.Output>
}

export namespace GetOriginalLink {
  export type Input = {
    slug: string
  }
  export type Output = Link
}
