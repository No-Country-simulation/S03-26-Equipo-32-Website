import { IPWho } from '@ipwho/ipwho';

const ipwhoApiKey = import.meta.env.VITE_IP_WHO;

type IpwhoClient = Pick<IPWho, 'getMe' | 'getIp'>;

const fallbackClient: IpwhoClient = {
  getMe: async () => ({ success: false }),
  getIp: async () => ({ success: false }),
};

let ipwhoClient: IpwhoClient = fallbackClient;

if (ipwhoApiKey && ipwhoApiKey.trim()) {
  try {
    ipwhoClient = new IPWho(ipwhoApiKey);
  } catch {
    ipwhoClient = fallbackClient;
  }
}

export default ipwhoClient;
