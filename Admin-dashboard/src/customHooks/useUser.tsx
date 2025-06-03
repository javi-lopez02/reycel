import { useEffect, useState } from "react";
import { User } from "../type";
import { getUsersRequest } from "../services/user";

function useUser() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getUsersRequest()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error ela cargar los usuarios"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { users, error, loading, setUsers };
}

export default useUser;
