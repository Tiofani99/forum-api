const CreateThread = require('../CreateThread')

describe('CreateThread', () => {
  it('Should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'thread_title',
    }

    // Assert
    expect(() => new CreateThread(payload)).toThrowError('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('Should throw error when payload not meet correct data type', () => {
    // Arrange
    const payload = {
      title: 123,
      body: 'thread_body',
    }

    // Assert
    expect(() => new CreateThread(payload)).toThrowError('CREATE_THREAD.NOT_MEET_CORRECT_DATA_TYPE')
  })

  it('Should create CreateThread correctly', () => {
    // Arrange
    const payload = {
      title: 'thread_title',
      body: 'thread_body',
    }

    // Action
    const createThread = new CreateThread(payload)

    // Assert
    expect(createThread.title).toEqual(payload.title)
    expect(createThread.body).toEqual(payload.body)
  })
})
