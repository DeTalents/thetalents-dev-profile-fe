import { Button, ButtonProps } from 'antd';
import { FC } from 'react';

const GlobalButton: FC<ButtonProps> = (props) => {
  const { type = 'primary' } = props;

  return <Button type={type} size="large" className="m-w-[168px]" {...props} />;
};

export default GlobalButton;
