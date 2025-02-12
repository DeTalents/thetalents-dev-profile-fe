import { Textarea } from '@/components/inputs/textarea';
import {
  useAddExperienceMutation,
  useUpdateExperienceMutation,
} from '@/features/api/experienceApi';
import { Modal } from 'antd';
import { BriefcaseIcon, Building2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../input';

interface ExperienceFormData {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface ExperienceItem extends ExperienceFormData {
  id: string;
}

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ExperienceItem | null;
}

const AddExperienceModal = ({
  isOpen,
  onClose,
  initialData,
}: AddExperienceModalProps) => {
  const [addExperience, { isLoading: isAdding }] = useAddExperienceMutation();
  const [updateExperience, { isLoading: isUpdating }] =
    useUpdateExperienceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExperienceFormData>({
    defaultValues: {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        company: initialData.company,
        role: initialData.role,
        startDate: initialData.startDate,
        endDate: initialData.endDate || '',
        description: initialData.description,
      });
    } else if (isOpen) {
      reset({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data: ExperienceFormData) => {
    try {
      if (initialData) {
        await updateExperience({
          experienceId: initialData.id,
          data,
        }).unwrap();
      } else {
        await addExperience(data).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to submit experience:', error);
    }
  };

  return (
    <Modal
      title={initialData ? 'Edit Experience' : 'Add New Experience'}
      open={isOpen}
      onCancel={onClose}
      okText={initialData ? 'Update Experience' : 'Add Experience'}
      cancelText="Cancel"
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isAdding || isUpdating}
      width={700}
      destroyOnClose
    >
      <form className="flex flex-col gap-6 py-4">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Company"
            register={register}
            name="company"
            errors={errors}
            placeholder="Company name"
            icon={<Building2 className="text-zinc-500" size={18} />}
          />

          <Input
            label="Role"
            register={register}
            name="role"
            errors={errors}
            placeholder="Your position"
            icon={<BriefcaseIcon className="text-zinc-500" size={18} />}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Start Date"
            register={register}
            name="startDate"
            errors={errors}
            type="date"
            placeholder="Start date"
          />

          <Input
            label="End Date"
            register={register}
            name="endDate"
            errors={errors}
            type="date"
            placeholder="End date or leave blank if current"
          />
        </div>

        <Textarea
          label="Description"
          register={register}
          name="description"
          errors={errors}
          placeholder="Describe your responsibilities and achievements..."
        />
      </form>
    </Modal>
  );
};

export default AddExperienceModal;
