import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Логин: {user?.login}</p>
      <p>Роль: {user?.role === 'ROLE_ADMIN' ? 'Администратор' : 'Участник команды'}</p>
    </div>
  );
};

export default ProfilePage;
