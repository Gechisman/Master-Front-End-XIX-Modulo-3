
import './style.css';
import styles from './style.module.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('No se ha encontrado el elemento #app');
}

const heading = document.createElement('h1');

heading.textContent = 'Mi proyecto con Vite y TypeScript';
heading.className = styles.heading;

app.appendChild(heading);

const heading2 = document.createElement('h2');

heading2.textContent = 'Variable de entorno: ' + import.meta.env.VITE_KEY;
heading2.className = styles.heading;

heading.appendChild(heading2);

