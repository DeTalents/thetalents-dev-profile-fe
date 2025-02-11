import { Textarea } from '@/components/inputs/textarea';
import { CreateProfileSchema } from '@/validations/createProfile';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { Input } from '../../input';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProfileSchema) => void;
  defaultValues: CreateProfileSchema;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: EditProfileModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfileSchema>({
    defaultValues,
  });

  const handleFormSubmit = (data: CreateProfileSchema) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal
      title="Edit Profile Information"
      open={isOpen}
      onCancel={onClose}
      okText="Save Changes"
      cancelText="Cancel"
      onOk={handleSubmit(handleFormSubmit)}
      width={600}
      destroyOnClose
    >
      <form className="flex flex-col gap-6 py-4">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="First Name"
            register={register}
            name="firstName"
            errors={errors}
            placeholder="Enter your first name"
          />

          <Input
            label="Second Name"
            register={register}
            name="secondName"
            errors={errors}
            placeholder="Enter your second name"
          />
        </div>

        <Input
          label="Phone"
          register={register}
          name="phone"
          errors={errors}
          placeholder="Enter your phone number"
        />

        <Input
          label="Years of Experience"
          register={register}
          name="yearsOfExperience"
          errors={errors}
          type="number"
          placeholder="Enter years of experience"
        />

        <Textarea
          label="Summary"
          register={register}
          name="summary"
          errors={errors}
          placeholder="Enter your summary"
        />
      </form>
    </Modal>
  );
};

export default EditProfileModal;
