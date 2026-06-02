import { useState, useCallback, useMemo, useRef } from 'react';
import { useDependencies } from '../../context/DependenciesContext';

export function useOwnerLogic() {
  const { ownerRepository: ownerRepo } = useDependencies();

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isCheckingOwner, setIsCheckingOwner] = useState<boolean>(true);

  const isCheckingOwnerRef = useRef(false);

  const checkOwnerStatus = useCallback(async () => {
    if (isCheckingOwnerRef.current) return false;
    isCheckingOwnerRef.current = true;
    setIsCheckingOwner(true);
    try {
      const status = await ownerRepo.checkIsOwner();
      setIsOwner(status);
      return status;
    } catch (err) {
      console.error("useOwnerLogic: Failed to check owner status:", err);
      setIsOwner(false);
      return false;
    } finally {
      setIsCheckingOwner(false);
      isCheckingOwnerRef.current = false;
    }
  }, [ownerRepo]);

  const clearOwnerStatus = useCallback(() => {
    setIsOwner(false);
  }, []);

  return useMemo(() => ({
    isOwner,
    isCheckingOwner,
    checkOwnerStatus,
    clearOwnerStatus,
  }), [
    isOwner,
    isCheckingOwner,
    checkOwnerStatus,
    clearOwnerStatus,
  ]);
}
