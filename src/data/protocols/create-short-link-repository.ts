import { CreateShortLink } from '@/domain/usecases/create-short-link'

export abstract class CreateShortLinkRepository {
  abstract create (input: CreateShortLinkRepository.Input): Promise<CreateShortLinkRepository.Output>
}

export namespace CreateShortLinkRepository {
  export type Input = CreateShortLink.Input
  export type Output = CreateShortLink.Output
}
