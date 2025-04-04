import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import AddSkillsModal from './Model/AddSkillsModal';
import { SectionHeader } from './SectionHeader';

interface SkillsProps {
  skills: string[];
}

export const Skills = ({ skills }: SkillsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <SectionHeader title="Skills" canAdd onAdd={handleAdd} />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="group relative">
            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
            <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <TrashIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <AddSkillsModal
        isOpen={isModalOpen}
        onClose={handleClose}
        currentSkills={skills}
      />
    </div>
  );
};

export default Skills;
