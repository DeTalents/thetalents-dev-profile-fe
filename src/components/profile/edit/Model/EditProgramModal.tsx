import { DropdownInput } from '@/components/inputs/dropdown';
import { andelaOptions, nonAndelaOptions } from '@/utils/enum';
import formatProgramName from '@/utils/formatProgramName';
import { ProgramInfoFormData } from '@/utils/types';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../input';

interface EditProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ProgramInfoFormData;
}

const EditProgramModal = ({
  isOpen,
  onClose,
  defaultValues,
}: EditProgramModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProgramInfoFormData>({
    defaultValues,
  });

  const isAndelanValue = watch('isAndelan');
  const nonAndelaProgramValue = watch('nonAndelaProgram');

  useEffect(() => {
    if (isAndelanValue !== 'NONE') {
      reset({
        ...watch(),
        nonAndelaProgram: undefined,
        nonAndelaProgramYear: undefined,
      });
    }
  }, [isAndelanValue, reset, watch]);

  const handleFormSubmit = (data: ProgramInfoFormData) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal
      title="Edit Program Information"
      open={isOpen}
      onCancel={onClose}
      okText="Save Changes"
      cancelText="Cancel"
      onOk={handleSubmit(handleFormSubmit)}
      width={600}
      destroyOnClose
    >
      <form className="flex flex-col gap-6 py-4">
        <DropdownInput
          label="Have you been in Andela"
          options={andelaOptions}
          register={register}
          name="isAndelan"
          errors={errors}
          placeholder="Select andela program"
        />

        {isAndelanValue === 'NONE' && (
          <>
            <DropdownInput
              label="If no Andela, have been through"
              options={nonAndelaOptions}
              register={register}
              name="nonAndelaProgram"
              errors={errors}
              placeholder="Select program"
            />

            {nonAndelaProgramValue && nonAndelaProgramValue !== 'NONE' && (
              <Input
                label={`Which year did you attend "${formatProgramName(
                  nonAndelaProgramValue
                )}"?`}
                register={register}
                name="nonAndelaProgramYear"
                errors={errors}
                placeholder="2016-2029"
                type="number"
                min="2016"
                max="2029"
              />
            )}
          </>
        )}
      </form>
    </Modal>
  );
};

export default EditProgramModal;
