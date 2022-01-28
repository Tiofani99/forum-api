const CreatedThread = require('../CreatedThread')

describe('CreatedThread', () => {
  it('Should throw error when not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      title: 'thread_title',
    }

    // Assert
    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when not meet correct data type', () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      title: 123,
      owner: 'thread_bodyf0e0eb7e-9b43-49bb-af85-9aa28f79ad96',
    }

    // Assert
    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create CreatedThread correctly', async () => {
    // Arrange
    const payload = {
      id: 'c4e0d658-ca3a-4c29-b70e-5f1aa918ef7c',
      title: 'thread_title',
      owner: 'f0e0eb7e-9b43-49bb-af85-9aa28f79ad96',
    }

    // Action
    const createdThread = new CreatedThread(payload)

    // Assert
    expect(createdThread.id).toEqual(payload.id)
    expect(createdThread.title).toEqual(payload.title)
    expect(createdThread.owner).toEqual(payload.owner)
  })
})
