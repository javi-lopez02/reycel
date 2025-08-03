import { Button, Form, Input, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheck, BiImage, BiLink } from "react-icons/bi";
import { MdAddAlert } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentMethodQuery } from "../../api/queries/paymentMethod";
import { toast } from "sonner";

interface PaymentsMethod {
  inputNumberCard: string;
  inputLabel: string;
  inputNumberPhone: string;
}

const PaymentsMethodForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);

    if (!url.trim()) {
      setPreviewUrl("");
      setLoadStatus("idle");
      setErrorMessage("");
      return;
    }

    if (!validateUrl(url)) {
      setLoadStatus("error");
      setErrorMessage("Please enter a valid URL");
      setPreviewUrl("");
      return;
    }

    // Check if URL looks like an image
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i;
    if (!imageExtensions.test(url)) {
      setLoadStatus("error");
      setErrorMessage("URL does not appear to be an image");
      setPreviewUrl("");
      return;
    }

    setIsLoading(true);
    setLoadStatus("idle");
    setErrorMessage("");
    setPreviewUrl(url);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setLoadStatus("success");
  };

  const handleImageError = () => {
    setIsLoading(false);
    setLoadStatus("error");
    setErrorMessage("Failed to load image. Please check the URL.");
    setPreviewUrl("");
  };

  const {
    createPaymentMethod,
    updatePaymentMethod,
    isCreating,
    isUpdating,
    paymentMethodById,
  } = usePaymentMethodQuery();

  const { data, isLoading: isLoadingPayment } = paymentMethodById(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentsMethod>();

  useEffect(() => {
    if (!isLoadingPayment && data) {
      reset({
        inputLabel: data.label,
        inputNumberCard: data.cardNumber,
        inputNumberPhone: data.phoneNumber,
      });
      setImageUrl(data.cardImage);
      setPreviewUrl(data.cardImage);
    }
  }, [isLoadingPayment, data, reset]);

  const onSubmit = handleSubmit((data) => {
    console.log(data.inputLabel);
    if (!id) {
      createPaymentMethod({
        cardImage: imageUrl,
        label: data.inputLabel,
        cardNumber: data.inputNumberCard,
        phoneNumber: data.inputNumberPhone,
      })
        .then(() => {
          toast.success("Metodo de pago creado exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear el metodo de pago");
        })
        .finally(() => {
          reset();
          navigate("/payments");
        });
    } else {
      updatePaymentMethod({
        id,
        cardImage: imageUrl,
        label: data.inputLabel,
        cardNumber: data.inputNumberCard,
        phoneNumber: data.inputNumberPhone,
      })
        .then(() => {
          toast.success("Metodo de pago actualizada exitosamente");
        })
        .catch(() => {
          toast.error("Error al actualizar el metodo de pago");
        })
        .finally(() => {
          reset();
          navigate("/payments");
        });
    }
  });

  return (
    <>
      <section className="flex items-end  space-x-2 gap-1 font-[sans-serif] pt-16 sm:px-16 px-4">
        <h1 className="text-2xl font-bold">Tarjetas Magnéticas</h1>
      </section>
      {!isLoadingPayment && (
        <section className="sm:px-16 px-4 pb-4">
          <Form onSubmit={onSubmit}>
            <div className="mx-auto">
              {/* Preview Section */}
              {!previewUrl && !isLoading && (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BiImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Image preview will appear here
                    </p>
                  </div>
                </div>
              )}
              {(previewUrl || isLoading) && (
                <div className="space-y-4 pt-3">
                  <h3 className="text-sm font-medium text-gray-700">Preview</h3>

                  <div className="relative bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-600">
                            Loading image...
                          </span>
                        </div>
                      </div>
                    )}

                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className="w-full h-64 object-cover"
                      />
                    )}

                    {!previewUrl && !isLoading && (
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <BiImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Image preview will appear here
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {loadStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <BiCheck className="w-5 h-5 text-green-500" />
                  <p className="text-sm font-medium text-green-800">
                    Image loaded successfully!
                  </p>
                </div>
              )}

              {loadStatus === "error" && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <MdAddAlert className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
            <Input
              name="image"
              className="min-w-1/5 pt-5"
              startContent={<BiLink className="h-5 w-5 text-gray-400" />}
              value={imageUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              label="URL de la imagen"
              variant="bordered"
              labelPlacement="outside"
            />
            <Input
              className="min-w-1/5 pt-5"
              placeholder="CASH"
              label="Tipo de tarjeta"
              variant="bordered"
              labelPlacement="outside"
              color={errors.inputLabel ? "danger" : "default"}
              errorMessage={errors.inputLabel?.message}
              isInvalid={Boolean(errors.inputLabel)}
              {...register("inputLabel", {
                required: "El tipo de tarjeta es requerido",
              })}
            />
            <Input
              className="min-w-1/5 pt-5"
              startContent={
                <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                  #
                </span>
              }
              placeholder="XXXX-XXXX-XXXX-XXXX"
              label="Numero de Tarjeta"
              variant="bordered"
              labelPlacement="outside"
              color={errors.inputNumberCard ? "danger" : "default"}
              errorMessage={errors.inputNumberCard?.message}
              isInvalid={Boolean(errors.inputNumberCard)}
              {...register("inputNumberCard", {
                valueAsNumber: true,
                required: "El numero de tarjeta es requerido",
              })}
            />
            <Input
              className="min-w-1/5 pt-5"
              startContent={
                <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                  +53
                </span>
              }
              placeholder="55555555"
              variant="bordered"
              label="Movil a Confirmar"
              labelPlacement="outside"
              color={errors.inputNumberPhone ? "danger" : "default"}
              errorMessage={errors.inputNumberPhone?.message}
              isInvalid={Boolean(errors.inputNumberPhone)}
              {...register("inputNumberPhone", {
                valueAsNumber: true,
                required: "El numero de tarjeta es requerido",
              })}
            />
            <div className="flex min-w-full justify-end mt-5 gap-3">
              <Button
                color="danger"
                variant="light"
                onPress={() => navigate("/payments")}
              >
                Cancelar
              </Button>

              <Button color="primary" type="submit">
                {(isCreating || isUpdating) && <Spinner color="default" />}
                {!isCreating && !isUpdating && <span>Guardar</span>}
              </Button>
            </div>
          </Form>
        </section>
      )}
    </>
  );
};

export default PaymentsMethodForm;
