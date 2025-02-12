import { SkillsInput } from '@/components/inputs/skillsinput';
import { useUpdateSkillsMutation } from '@/features/api/profileApi';
import { CreateProfileSchema } from '@/validations/createProfile';
import { Modal, message } from 'antd';
import { useForm } from 'react-hook-form';

interface AddSkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: string[];
}

const AddSkillsModal = ({
  isOpen,
  onClose,
  currentSkills,
}: AddSkillsModalProps) => {
  const [updateSkills, { isLoading }] = useUpdateSkillsMutation();

  const form = useForm<CreateProfileSchema>({
    defaultValues: {
      skills: currentSkills,
    },
  });

  const handleFormSubmit = async (data: CreateProfileSchema) => {
    try {
      await updateSkills(data).unwrap();
      console.log('+++', data.skills);
      message.success('Skills updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to update skills');
      console.error('Update error:', error);
    }
  };

  return (
    <Modal
      title="Add Skills"
      open={isOpen}
      onCancel={onClose}
      okText="Save Changes"
      cancelText="Cancel"
      onOk={form.handleSubmit(handleFormSubmit)}
      confirmLoading={isLoading}
      width={600}
      destroyOnClose
    >
      <form className="flex flex-col gap-6 py-4">
        <SkillsInput
          label="Add your skills"
          setValue={form.setValue}
          getValues={form.getValues}
          name="skills"
          errors={form.formState.errors}
          placeholder="Type a skill..."
        />
      </form>
    </Modal>
  );
};

export default AddSkillsModal;
