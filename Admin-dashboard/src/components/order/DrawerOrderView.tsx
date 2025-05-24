import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Spinner,
  Form,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import NewOrderView from "./NewOrderView";
import { useEffect, useState } from "react";
import { OrderItem } from "../../type";
import {
  confirmOrderRequest,
  getOrderItemsRequest,
  updateOrderItemRequest,
} from "../../services/order";
import { toast } from "sonner";
import { BiLogoShopify, BiTransferAlt } from "react-icons/bi";
import usePaymentMethod from "../../customHooks/usePaymentMethod";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string | undefined;
  orderId: string | undefined;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function DrawerOrderView({
  userId,
  orderId,
  totalAmount,
  setTotalAmount,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState<Array<string> | null>(null);
  const [items, setItems] = useState<OrderItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { paymentMethod } = usePaymentMethod();
  const [selectedMethod, setSelectedMethod] = useState<string | null>("CASH");
  const [selectedId, setSelectedId] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMethod === "CASH" || selectedMethod === "") {
      setDisable(true);
    } else setDisable(false);
  }, [selectedMethod]);

  useEffect(() => {
    setLoading(true);
    getOrderItemsRequest(orderId)
      .then((res) => {
        setTotalAmount(res.data.data.totalAmount);
        setItems(res.data.data.orderItems);
        setCount(res.data.data._count.orderItems);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar los productos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId, totalAmount, setTotalAmount]);

  const handleQuantity = (value: string, id: string, price: number) => {
    try {
      updateOrderItemRequest(id, Number(value), price).then((res) => {
        setTotalAmount(res.data.data.totalAmount);
      });
    } catch (error) {
      console.log(error);
      setErrors(["Error al incrementar el producto"]);
    }
  };

  const handleMethodChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(value.target.value);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const transactionIdInput = data["transactionId"] as string;

    if (!selectedId || selectedId === "") {
      toast.error("No se ha seleccionado un metodo de pago");
      return;
    }

    if (!transactionIdInput || transactionIdInput === "") {
      confirmOrderRequest({
        orderID: orderId,
        amount: totalAmount,
        paymentMethod: selectedId,
        userId: userId,
      })
        .then((res) => {
          toast.success("Orden Confirmada");
          setTotalAmount(res.data.data.totalAmount);
          setItems(res.data.data.orderItems);
          setCount(res.data.data._count.orderItems);
          onClose();
          navigate("/order");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al confirmar la orden");
        });
    } else {
      confirmOrderRequest({
        orderID: orderId,
        amount: totalAmount,
        paymentMethod: selectedId,
        transactionID: transactionIdInput,
        userId: userId,
      })
        .then((res) => {
          toast.success("Orden Confirmada");
          setTotalAmount(res.data.data.totalAmount);
          setItems(res.data.data.orderItems);
          setCount(res.data.data._count.orderItems);
          onClose();
          navigate("/order");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al confirmar la orden");
        });
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="p-2 mr-3 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <BiLogoShopify size={28}></BiLogoShopify>
      </button>
      <Drawer
        isOpen={isOpen}
        size="5xl"
        placement="left"
        backdrop="transparent"
        hideCloseButton
        onClose={onClose}
      >
        <DrawerContent className="dark:bg-gray-800 fixed bg-white top-14 lg:mt-1">
          {(onClose) => (
            <>
              <DrawerHeader>
                <h3 className="w-full text-center text-xl font-bold text-gray-800">
                  Nueva Orden
                </h3>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex md:grid flex-col md:grid-cols-2 gap-8">
                  <Form
                    className="md:fixed md:w-1/3 flex w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex gap-2 min-w-full">
                      <Input
                        endContent={
                          <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                            USD
                          </span>
                        }
                        name="Precio"
                        label="Precio"
                        variant="bordered"
                        labelPlacement="outside"
                        defaultValue={String(totalAmount)}
                      />
                    </div>
                    {paymentMethod && (
                      <div className="flex gap-2 min-w-full">
                        <Select
                          name="Metodo"
                          variant="bordered"
                          label="Metodo"
                          placeholder="Seleccione el Metodo del Pago"
                          labelPlacement="outside"
                          onChange={handleMethodChange}
                        >
                          {paymentMethod.map((method) => (
                            <SelectItem
                              key={method.id}
                              onClick={() => {
                                setSelectedId(method.id);
                              }}
                            >
                              {method.paymentOptions}
                            </SelectItem>
                          ))}
                        </Select>
                        <Input
                          endContent={
                            <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                              <BiTransferAlt />
                            </span>
                          }
                          name="transactionId"
                          label="ID Transferencia"
                          placeholder="ID Transferencia"
                          variant="bordered"
                          labelPlacement="outside"
                          isDisabled={disable}
                        />
                      </div>
                    )}
                    <div className="flex min-w-full justify-end mt-5 gap-3">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button color="primary" type="submit" onPress={onClose}>
                        Agregar
                      </Button>
                    </div>
                  </Form>
                  <div className="bg-gray-50 p-4 min-h-full w-full rounded-lg md:col-start-2">
                    <div className="flex w-full justify-center">
                      <ul className="text-gray-800 text-sm divide-x flex gap-4 mt-4">
                        <li className="flex flex-wrap gap-4 py-3">
                          Cantidad de productos{" "}
                          <span className="ml-auto font-bold">{count}</span>
                        </li>
                        <li className="flex flex-wrap gap-4 py-3 font-bold pl-4">
                          Total <span className="ml-auto">${totalAmount}</span>
                        </li>
                      </ul>
                    </div>

                    {loading && (
                      <div className="min-w-full min-h-full flex items-center justify-center">
                        <Spinner></Spinner>
                      </div>
                    )}

                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 gap-2 md:max-h-full overflow-auto  scrollbar-default">
                      {items &&
                        !loading &&
                        items.map((item) => (
                          <NewOrderView
                            id={item.id}
                            key={item.id}
                            image={item.product.imagen}
                            name={item.product.name}
                            price={item.price}
                            inventaryCount={item.product.inventaryCount}
                            quantity={item.quantity}
                            setOrder={setItems}
                            setTotalAmount={setTotalAmount}
                            setCount={setCount}
                            setError={setErrors}
                            handleQuantity={handleQuantity}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
      {errors && toast.error("Error al incrementar el producto")}
    </>
  );
}
