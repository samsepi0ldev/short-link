import type { GetOriginalLink } from '@/domain/usecases/get-original-link'

export abstract class GetOriginalLinkRepository {
  abstract findBySlug (input: GetOriginalLinkRepository.Input): Promise<GetOriginalLinkRepository.Output>
}

export namespace GetOriginalLinkRepository {
  export type Input = GetOriginalLink.Input
  export type Output = GetOriginalLink.Output
}
