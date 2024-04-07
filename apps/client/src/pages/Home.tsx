import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import * as styles from './Home.css';
import { useUsersQuery } from '../generated/hooks';
import clsx from 'clsx';

function App() {
  const { data } = useUsersQuery();

  return (
    <div className={styles.wrapper}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img className={styles.logo} src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img className={clsx(styles.logo, styles.react)} src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>all users: {JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
