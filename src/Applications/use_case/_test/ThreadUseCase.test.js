const ThreadUseCase = require('../ThreadUseCase')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const CreateThread = require('../../../Domains/threads/entities/CreateThread')
const CreatedThread = require('../../../Domains/threads/entities/CreatedThread')

jest.mock('../../../Domains/threads/entities/CreateThread', () => jest.fn().mockImplementation(() => ({
  title: 'thread_title',
  body: 'thread_body',
  owner: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
})))

describe('ThreadUseCase', () => {
  describe('A addThread function', () => {
    it('Should orchestrate addThread correctly', async () => {
      // Arrange
      const payload = {
        title: 'thread_title',
        body: 'thread_body',
      }
      const owner = 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c'
      const mockThreadRepository = new ThreadRepository()

      /** mocking needed funciton */
      mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(new CreatedThread({
          id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
          title: 'thread_title',
          owner: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        })))

      /** creating instance */
      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
      })

      // Action
      const createdThread = await threadUseCase.addThread(owner, payload)

      // Assert
      expect(CreateThread).toBeCalledTimes(1)
      expect(mockThreadRepository.addThread).toBeCalledWith({
        title: 'thread_title',
        body: 'thread_body',
        owner,
      })
      expect(createdThread).toStrictEqual(new CreatedThread({
        id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
        title: 'thread_title',
        owner: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      }))
    })
  })
})
