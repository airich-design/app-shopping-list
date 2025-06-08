import { createContext, useContext, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { RewardAnimation } from "./reward-animation";

interface RewardContextType {
  triggerAnimation: () => void;
}

const RewardAnimationContext = createContext<RewardContextType>({
  triggerAnimation: () => {},
});

export const useRewardAnimation = () => {
  const context = useContext(RewardAnimationContext);
  if (!context) {
    throw new Error(
      "useRewardAnimation must be used within a RewardAnimationProvider"
    );
  }
  return context.triggerAnimation;
};

interface RewardAnimationProviderProps {
  children: ReactNode;
}

export function RewardAnimationProvider({
  children,
}: RewardAnimationProviderProps) {
  const callbackRef = useRef<(() => void) | null>(null);

  const triggerAnimation = useCallback(() => {
    if (callbackRef.current) {
      callbackRef.current();
    }
  }, []);

  const handleTrigger = useCallback((cb: () => void) => {
    callbackRef.current = cb;
  }, []);

  return (
    <RewardAnimationContext.Provider value={{ triggerAnimation }}>
      {children}
      <RewardAnimation onTrigger={handleTrigger} />
    </RewardAnimationContext.Provider>
  );
}
