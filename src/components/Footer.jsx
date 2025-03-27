import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>🎥 NetflixPicker &copy; {new Date().getFullYear()} - All Rights Reserved</p>
      <p>Made with ❤️ by the giraffes</p>
    </footer>
  );
}
