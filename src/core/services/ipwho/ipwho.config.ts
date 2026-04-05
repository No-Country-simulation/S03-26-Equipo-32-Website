import { IPWho } from '@ipwho/ipwho';

const ipwhoApiKey = import.meta.env.VITE_IP_WHO;
const ipwhoClient = new IPWho(ipwhoApiKey);

export default ipwhoClient;
