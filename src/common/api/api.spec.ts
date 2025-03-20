import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { API } from './index';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
  get: vi.fn(),
}));


vi.stubEnv('VITE_BASE_API_URL', 'https://api.example.com')

describe('API Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should make a GET request with correct URL and return response data', async () => {
    const mockedResponse = { data: 'mocked data' };
    (axios.get as Mock<typeof axios.get>).mockResolvedValueOnce(mockedResponse);

    const response = await API.get('/test-endpoint');
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/test-endpoint');
    expect(response).toEqual(mockedResponse);
  });

  it('should throw an error if the GET request fails', async () => {
    const mockedError = { response: { data: 'error data', status: 404 } };
    (axios.get as Mock<typeof axios.get>).mockRejectedValueOnce(mockedError);

    await expect(API.get('/test-endpoint')).rejects.toEqual(mockedError.response);
  });

  it('should handle requests with query parameters', async () => {
    const mockedResponse = { data: 'mocked data' };
    (axios.get as Mock<typeof axios.get>).mockResolvedValueOnce(mockedResponse);

    const response = await API.get('/test-endpoint?param=value');
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/test-endpoint?param=value');
    expect(response).toEqual(mockedResponse);
  });

  it('should handle empty endpoint', async () => {
    const mockedResponse = { data: 'mocked data' };
    (axios.get as Mock<typeof axios.get>).mockResolvedValueOnce(mockedResponse);

    const response = await API.get('');
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com');
    expect(response).toEqual(mockedResponse);
  });
});

