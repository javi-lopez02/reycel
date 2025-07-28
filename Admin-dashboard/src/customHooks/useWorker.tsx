import { useEffect, useState } from "react";
import { Worker } from "../type";
import { getWorkersRequest } from "../api/services/workers";
import useWorkerQuery  from '../api/queries/workers'
import workers from "../api/queries/workers";

function useWorker() {
  const {workerQuery, deleteWorker} =  useWorkerQuery();

  useEffect(() => {
    const {data : workers, isLoading, error} = workerQuery()
    
  }, []);

  return { workers, error, isLoading, deleteWorker };
}

export default useWorker;
