import { userContainer } from '@/core/containers/user.container.ts';

export const HomePage = () => {
  return (
    <div>
      HomePage
      <button onClick={() => userContainer.login.execute()}>login</button>
    </div>
  );
};
