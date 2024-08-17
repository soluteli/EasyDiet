import { Outlet } from '@modern-js/runtime/router';
import 'uno.css';
import '@unocss/reset/tailwind.css';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
