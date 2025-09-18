import { useState } from 'react';
import './CreateProjectForm.css'; 

interface CreateProjectFormProps {
  onCreateProject: (projectName: string) => void;
}

const CreateProjectForm = ({ onCreateProject }: CreateProjectFormProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Название проекта не может быть пустым');
      return;
    }
    onCreateProject(name);
    setName('');
  };

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <h4>Создать новый проект</h4>
      <input
        type="text"
        placeholder="Название проекта"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Создать проект</button>
    </form>
  );
};

export default CreateProjectForm;