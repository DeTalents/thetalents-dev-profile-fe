'use client';

import { Textarea } from '@/components/inputs/textarea';
import { useUpdateProfileMutation } from '@/features/api/profileApi';
import { UpdateBasicDetails } from '@/utils/types';
import { message, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { Input } from '../../input';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: UpdateBasicDetails;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  defaultValues,
}: EditProfileModalProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBasicDetails>({
    defaultValues,
  });

  const handleFormSubmit = async (data: UpdateBasicDetails) => {
    try {
      await updateProfile(data).unwrap();
      message.success('Profile updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to update profile');
      console.error('Update error:', error);
    }
  };

  return (
    <Modal
      title="Edit Profile Information"
      open={isOpen}
      onCancel={onClose}
      okText="Save Changes"
      cancelText="Cancel"
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isLoading}
      width={700}
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

        <div className="grid grid-cols-2 gap-6">
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
        </div>

        <Textarea
          label="Summary"
          register={register}
          name="summary"
          errors={errors}
          placeholder="Enter your summary"
          enableAI={true}
        />
      </form>
    </Modal>
  );
};

export default EditProfileModal;
