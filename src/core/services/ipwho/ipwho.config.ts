import { IPWho } from '@ipwho/ipwho';

const ipwhoApiKey = import.meta.env.VITE_IP_WHO;
const trimmedApiKey = ipwhoApiKey?.trim();

type IpwhoClient = Pick<IPWho, 'getMe' | 'getIp'>;

const fallbackClient: IpwhoClient = {
  getMe: async () => ({ success: false }),
  getIp: async () => ({ success: false }),
};

let ipwhoClient: IpwhoClient = fallbackClient;

if (trimmedApiKey) {
  try {
    ipwhoClient = new IPWho(trimmedApiKey);
  } catch {
    ipwhoClient = fallbackClient;
  }
}

export default ipwhoClient;
