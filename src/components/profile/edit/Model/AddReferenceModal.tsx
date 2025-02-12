import {
  useAddReferenceMutation,
  useUpdateReferenceMutation,
} from '@/features/api/referenceApi';
import { Modal, message } from 'antd';
import { Mail, PhoneIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../input';

interface ReferenceFormData {
  name: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

interface ReferenceItem extends ReferenceFormData {
  id: string;
}

interface AddReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ReferenceItem | null;
}

const AddReferenceModal = ({
  isOpen,
  onClose,
  initialData,
}: AddReferenceModalProps) => {
  const [addReference, { isLoading: isAdding }] = useAddReferenceMutation();
  const [updateReference, { isLoading: isUpdating }] =
    useUpdateReferenceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReferenceFormData>({
    defaultValues: {
      name: '',
      relationship: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        name: initialData.name,
        relationship: initialData.relationship,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
      });
    } else if (isOpen) {
      reset({
        name: '',
        relationship: '',
        email: '',
        phoneNumber: '',
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data: ReferenceFormData) => {
    try {
      if (initialData) {
        await updateReference({
          referenceId: initialData.id,
          data,
        }).unwrap();
        message.success('Reference updated successfully');
      } else {
        await addReference(data).unwrap();
        message.success('Reference added successfully');
      }
      reset();
      onClose();
    } catch (error) {
      message.error('Failed to submit reference');
      console.error('Failed to submit reference:', error);
    }
  };

  return (
    <Modal
      title={initialData ? 'Edit Reference' : 'Add New Reference'}
      open={isOpen}
      onCancel={() => {
        reset();
        onClose();
      }}
      okText={initialData ? 'Update Reference' : 'Add Reference'}
      cancelText="Cancel"
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isAdding || isUpdating}
      maskClosable={false}
      width={700}
      destroyOnClose
    >
      <form className="flex flex-col gap-6 py-4">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Name"
            register={register}
            name="name"
            errors={errors}
            placeholder="Reference name"
            icon={<UserIcon className="text-zinc-500" size={18} />}
          />

          <Input
            label="Relationship"
            register={register}
            name="relationship"
            errors={errors}
            placeholder="Your relationship"
            icon={<UsersIcon className="text-zinc-500" size={18} />}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Email"
            register={register}
            name="email"
            errors={errors}
            type="email"
            placeholder="Email address"
            icon={<Mail className="text-zinc-500" size={18} />}
          />

          <Input
            label="Phone Number"
            register={register}
            name="phoneNumber"
            errors={errors}
            type="tel"
            placeholder="Phone number"
            icon={<PhoneIcon className="text-zinc-500" size={18} />}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddReferenceModal;
