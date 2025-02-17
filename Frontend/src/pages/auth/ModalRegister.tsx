import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth.context";
import {
  Button,
  Checkbox,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { BiLock, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function ModalRegister({
  onClose,
  setIsRegister,
}: {
  onClose: () => void;
  setIsRegister: (value: boolean) => void;
}) {
  const [error, setError] = useState<Array<string>>([]);
  const { errors, signUp } = useAuth();

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    setError(errors);
  }, [errors]);

  const handleSubmit = async () => {
    if (!userNameRef.current?.value) {
      setError([...error, "User name is required"]);
      return;
    }
    if (!emailRef.current?.value) {
      setError([...error, "Emial name is required"]);
      return;
    }
    if (!passwordRef.current?.value) {
      setError([...error, "Password is required"]);
      return;
    }
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setError([...error, "Passwords do not match"]);
      return;
    }

    signUp({
      password: passwordRef.current?.value,
      username: emailRef.current.value,
      email: userNameRef.current.value,
    });
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="./logo.webp" alt="logo" />
          Reycel
        </div>
      </ModalHeader>
      <ModalBody>
        <h1 className="text-xl font-semibold leading-tight tracking-tight mb-3 text-gray-900 md:text-2xl dark:text-white">
          Crea tu cuenta
        </h1>
        {error.length > 0 &&
          error.map((err) => {
            return (
              <div
                className="bg-red-400 p-2 rounded-lg mx-auto w-4/5 flex items-center justify-center"
                key={err}
              >
                <h1 className="text-white font-bold">{err}</h1>
              </div>
            );
          })}

        <Input
          autoFocus
          ref={userNameRef}
          label="Email"
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Enter your Email"
          variant="bordered"
        />
        <Input
          ref={emailRef}
          label="User Name"
          endContent={
            <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Enter your User Name"
          variant="bordered"
        />
        <Input
          ref={passwordRef}
          endContent={
            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />

        <Input
          ref={passwordConfirmRef}
          endContent={
            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password Confirm"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Recordar
          </Checkbox>
        </div>
        <div className="flex items-center  text-sm font-light text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuentas?
          <div
            onClick={() => setIsRegister(false)}
            className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
          >
            Inicia sesión
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Cancelar
        </Button>
        <Button
          color="primary"
          onPress={() => {
            handleSubmit();
          }}
        >
          Registrar
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalRegister;
