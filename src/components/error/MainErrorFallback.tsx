import { Button } from '@/components/ui';
import { RefreshCwIcon } from 'lucide-react';
export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-error"
      role="alert"
    >
      <h1 className="text-primary text-4xl mb-4">500 - Internal Server Error</h1>
      <h2 className="text-secondary">Ooops, something went wrong :( </h2>
      <Button

        className="mt-4 p-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        <Button.Icon icon={RefreshCwIcon} className="w-4 h-4" />
        Refresh
      </Button>
    </div>
  );
};

