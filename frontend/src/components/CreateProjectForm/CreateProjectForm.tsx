import { useState } from 'react';
import './CreateProjectForm.css'; 
import type { CreateProjectPayload } from '../../types';

interface CreateProjectFormProps {
  onCreateProject: (project: CreateProjectPayload) => Promise<void>;
}

const CreateProjectForm = ({ onCreateProject }: CreateProjectFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [membersInput, setMembersInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Название проекта не может быть пустым');
      return;
    }

    const members = membersInput
      .split(',')
      .map(member => member.trim())
      .filter(Boolean);

    try {
      await onCreateProject({
        name,
        description: description.trim() || undefined,
        members,
      });

      setName('');
      setDescription('');
      setMembersInput('');
    } catch (error) {
      alert('Не удалось создать проект. Попробуйте снова.');
    }
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
      <textarea
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Участники (через запятую)"
        value={membersInput}
        onChange={(e) => setMembersInput(e.target.value)}
      />
      <button type="submit">Создать проект</button>
    </form>
  );
};

export default CreateProjectForm;