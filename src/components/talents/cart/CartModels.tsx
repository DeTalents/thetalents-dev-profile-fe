import { Button, Form, Input, List, Modal, Tag, Tooltip } from 'antd';
import { CheckCircle, Plus } from 'lucide-react';
import { Cart, FormValues } from '../DeveloperProfile';

interface CartModalsProps {
  carts: Cart[];
  talentId: string;
  isLoadingCarts: boolean;
  isCreatingCart: boolean;
  loadingCartId: string | null;
  isCartModalVisible: boolean;
  isNewCartModalVisible: boolean;
  onCartModalClose: () => void;
  onNewCartModalClose: () => void;
  onSelectCart: (cartId: string) => void;
  onCreateNewCartModal: () => void;
  onCreateNewCart: (cartName: string) => void;
}

const CartModals = ({
  carts,
  talentId,
  isLoadingCarts,
  isCreatingCart,
  loadingCartId,
  isCartModalVisible,
  isNewCartModalVisible,
  onCartModalClose,
  onNewCartModalClose,
  onSelectCart,
  onCreateNewCartModal,
  onCreateNewCart,
}: CartModalsProps) => {
  const [form] = Form.useForm<FormValues>();

  const handleNewCartSubmit = async (values: FormValues) => {
    await onCreateNewCart(values.cartName);
    form.resetFields();
  };

  // Check if talent is already in a cart
  const isTalentInCart = (cart: Cart): boolean => {
    return cart.items?.some((item) => item.talentId === talentId) || false;
  };

  return (
    <>
      <Modal
        title="Select a Cart"
        open={isCartModalVisible}
        onCancel={onCartModalClose}
        footer={null}
      >
        <div className="py-4">
          <List
            dataSource={carts}
            loading={isLoadingCarts}
            renderItem={(cart: Cart) => {
              const isInCart = isTalentInCart(cart);
              return (
                <List.Item>
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{cart.name}</h3>
                        {isInCart && (
                          <Tooltip title="Developer already in this cart">
                            <Tag
                              color="success"
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Already Added</span>
                            </Tag>
                          </Tooltip>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {cart.items?.length || 0} talents
                      </p>
                    </div>
                    <Button
                      type="primary"
                      onClick={() => onSelectCart(cart.id)}
                      loading={loadingCartId === cart.id}
                      disabled={isInCart}
                    >
                      {isInCart ? 'Added' : 'Select'}
                    </Button>
                  </div>
                </List.Item>
              );
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button
              type="dashed"
              icon={<Plus className="w-4 h-4" />}
              onClick={onCreateNewCartModal}
            >
              Create New Cart
            </Button>
          </div>
        </div>
      </Modal>

      {/* New Cart Modal */}
      <Modal
        title="Create New Cart"
        open={isNewCartModalVisible}
        onCancel={() => {
          onNewCartModalClose();
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleNewCartSubmit} layout="vertical">
          <Form.Item
            name="cartName"
            label="Cart Name"
            rules={[
              { required: true, message: 'Please enter a name for your cart' },
            ]}
          >
            <Input placeholder="My Talent Pool" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  onNewCartModalClose();
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isCreatingCart}>
                Create Cart
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CartModals;
